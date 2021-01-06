import React, { useMemo, useRef } from "react"
import { useFrame, createPortal } from "react-three-fiber"
import { frag, vert } from "../Shaders/Panel"
import * as THREE from "three"

const Panel = props => {
    const domEl = props.domEl

    const planeRef = useRef()

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const aspect = windowWidth / windowHeight

    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene()
        const target = new THREE.WebGLMultisampleRenderTarget(
            windowWidth,
            windowHeight,
            {
                format: THREE.RGBFormat,
                stencilBuffer: false,
                depthBuffer: true,
                depthWrite: true,
                depthTest: true,
            }
        )
        return [scene, target]
    }, [])

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: { value: { x: windowWidth, y: windowHeight } },
            u_ratio: {
                value: aspect,
            },
            u_texture: {
                value: target.texture,
            },
            u_bgcolor: {
                value: new THREE.Vector3(),
            },
            u_fgcolor: {
                value: new THREE.Vector3(),
            },
        }),
        []
    )

    const bgColorSwitch = param => {
        switch (param) {
            case "LIGHT":
                return [0.8, 0.8, 0.8]
            case "DARK":
                return [0.125, 0.125, 0.125]
            case "SOLIS":
                return [1, 0, 0.376]
            case "TERMINAL":
                return [0.124, 0.124, 0.124]
            case "ACID":
                return [0.56, 0, 1]
            default:
                return
        }
    }

    const fgColorSwitch = param => {
        switch (param) {
            case "LIGHT":
                return [0.125, 0.125, 0.125]
            case "DARK":
                return [0.725, 0.098, 0.098]
            case "SOLIS":
                return [0.78, 1, 0]
            case "TERMINAL":
                return [0.25, 0.752, 0.25]
            case "ACID":
                return [0.615, 1, 0]
            default:
                return
        }
    }

    const calculateUnitSize = zDistance => {
        const fov = 75 // default camera value
        const cameraZ = 5 // default camera value

        const vFov = (fov * Math.PI) / 180

        const height = 2 * Math.tan(vFov / 2) * (cameraZ - zDistance)
        const width = height * aspect

        return { width, height }
    }

    const camUnit = calculateUnitSize(0) // element's z-index === 0

    const getRenderSize = el => {
        const {
            left,
            right,
            top,
            bottom,
            width,
            height,
        } = el.getBoundingClientRect()

        const scaleX = width / windowWidth
        const scaleY = height / windowHeight

        return { scaleX, scaleY }
    }

    const updateRenderPosition = (el, scrollY) => {
        const {
            left,
            right,
            top,
            bottom,
            width,
            height,
        } = el.getBoundingClientRect()

        // Set origin to top left
        planeRef.current.position.x = -(camUnit.width / 2)
        planeRef.current.position.y = camUnit.height / 2

        // Set position
        planeRef.current.position.x +=
            (left / windowWidth) * camUnit.width +
            (camUnit.width * planeRef.current.scale.x) / 2
        planeRef.current.position.y -=
            ((top - scrollY) / windowHeight) * camUnit.height +
            (camUnit.height * planeRef.current.scale.y) / 2
    }

    const [bgR, bgG, bgB] = bgColorSwitch(props.theme)
    const [fgR, fgG, fgB] = fgColorSwitch(props.theme)

    useFrame((state, delta) => {
        const { scaleX, scaleY } = getRenderSize(domEl)

        planeRef.current.scale.x = scaleX
        planeRef.current.scale.y = scaleY

        updateRenderPosition(domEl, 0)

        uniforms.u_bgcolor.value.set(bgR, bgG, bgB)
        uniforms.u_fgcolor.value.set(fgR, fgG, fgB)

        uniforms.u_time.value += delta

        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    return (
        <mesh ref={planeRef}>
            <planeBufferGeometry args={[camUnit.width, camUnit.height, 1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vert}
                fragmentShader={frag}
                transparent={true}
            />
        </mesh>
    )
}

export default Panel
