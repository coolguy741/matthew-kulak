import React, { useMemo, useRef } from "react"
import { useFrame } from "react-three-fiber"
import { frag, vert } from "../Shaders/HUD"
import * as THREE from "three"

const HUD = ({ theme, domEl, sliderPos }) => {
    // Refs
    const planeRef = useRef()

    // Get screen size/aspect ratio
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const aspect = windowWidth / windowHeight

    // Scene/target
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

    // Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0.0 },
            uResolution: { value: { x: windowWidth, y: windowHeight } },
            uRatio: {
                value: aspect,
            },
            uBgColor: {
                value: new THREE.Vector3(),
            },
            uFgColor: {
                value: new THREE.Vector3(),
            },
            uTexture: {
                value: target.texture,
            },
            uSlider: {
                value: sliderPos,
            },
        }),
        []
    )

    // Theme colour switches
    const bgColorSwitch = param => {
        switch (param) {
            case "LIGHT":
                return [0.8, 0.8, 0.8]
            case "DARK":
                return [0.125, 0.125, 0.125]
            case "SOLIS":
                return [0.149, 0.149, 0.149]
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
                return [0.117, 0.117, 0.117]
            case "TERMINAL":
                return [0.25, 0.752, 0.25]
            case "ACID":
                return [0.615, 1, 0]
            default:
                return
        }
    }

    const [bgR, bgG, bgB] = bgColorSwitch(theme)
    const [fgR, fgG, fgB] = fgColorSwitch(theme)

    // Calculate camera unit size
    const calculateUnitSize = zDistance => {
        const fov = 75 // default camera value
        const cameraZ = 5 // default camera value

        const vFov = (fov * Math.PI) / 180

        const height = 2 * Math.tan(vFov / 2) * (cameraZ - zDistance)
        const width = height * aspect

        return { width, height }
    }

    const camUnit = calculateUnitSize(0) // element's z-index === 0

    // Get render size
    const getRenderSize = el => {
        const { width, height } = el.getBoundingClientRect()

        const scaleX = width / windowWidth
        const scaleY = height / windowHeight

        return { scaleX, scaleY }
    }

    // Update panel render position
    const updateRenderPosition = (el, scrollY) => {
        const { left, top } = el.getBoundingClientRect()

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

    // RAF
    useFrame((state, delta) => {
        // Scale panel
        const { scaleX, scaleY } = getRenderSize(domEl)
        planeRef.current.scale.x = scaleX
        planeRef.current.scale.y = scaleY

        // Update position
        updateRenderPosition(domEl, 0)

        // Update uniform color values
        uniforms.uBgColor.value.set(bgR, bgG, bgB)
        uniforms.uFgColor.value.set(fgR, fgG, fgB)

        // Update slider uniform
        uniforms.uSlider.value = sliderPos

        // Delta
        uniforms.uTime.value += delta

        // Render
        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    return (
        <>
            <mesh ref={planeRef}>
                <planeBufferGeometry
                    args={[camUnit.width, camUnit.height, 1, 1]}
                />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vert}
                    fragmentShader={frag}
                    transparent={true}
                />
            </mesh>
        </>
    )
}

export default HUD
