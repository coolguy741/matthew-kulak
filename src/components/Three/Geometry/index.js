import React, { useMemo } from "react"

import * as THREE from "three"
import { useFrame, createPortal, useThree } from "react-three-fiber"
import { mainVert, mainFrag } from "../Shaders/Main"
import FBO from "../FBO"
import Panel from "../Panel"

const Geometry = props => {
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    const pointer = useMemo(() => {
        return new THREE.Vector2()
    })

    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene()
        const target = new THREE.WebGLMultisampleRenderTarget(width, height, {
            format: THREE.RGBFormat,
            stencilBuffer: false,
            depthBuffer: true,
            depthWrite: true,
            depthTest: true,
        })
        return [scene, target]
    }, [])

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_resolution: { value: { x: width, y: height } },
            u_ratio: {
                value: aspect,
            },
            u_noise: {
                value: target.texture,
            },
            u_mouse: { value: new THREE.Vector2() },
            u_speed: {
                value: 0,
            },
            u_n1: {
                value: 4096,
            },
            u_n2: {
                value: 0,
            },
            u_bw1: {
                value: 0.125,
            },
            u_bw2: {
                value: 1.0,
            },
            u_slider: {
                value: props.sliderPos,
            },
        }),
        []
    )

    const n1Switch = param => {
        switch (param) {
            case "TERMINAL":
                return 14815366
            case "LIGHT":
                return 17825809
            default:
                return 4096
        }
    }

    const n2Switch = param => {
        switch (param) {
            case "LIGHT":
                return 0
            case "DARK":
                return 0
            case "SOLIS":
                return 18157905
            case "TERMINAL":
                return 15018318
            case "ACID":
                return 4357252
            default:
                return
        }
    }

    const bw1Switch = param => {
        switch (param) {
            case "LIGHT":
                return 0.125
            case "DARK":
                return 0.6
            case "SOLIS":
                return 0.125
            case "TERMINAL":
                return 1.0
            case "ACID":
                return 0.99
            default:
                return
        }
    }

    const bw2Switch = param => {
        switch (param) {
            case "LIGHT":
                return 1.0
            case "DARK":
                return 0.125
            case "SOLIS":
                return 0.55
            case "TERMINAL":
                return 0.125
            case "ACID":
                return 0.125
            default:
                return
        }
    }

    const calculateUnitSize = () => {
        const fov = 75 // default camera value
        const cameraZ = 5 // default camera value

        const vFov = (fov * Math.PI) / 180

        const height = 2 * Math.tan(vFov / 2) * cameraZ
        const width = height * aspect

        return { width, height }
    }

    const camUnit = calculateUnitSize()

    const { clock } = useThree()

    if (!props.animating) clock.stop()
    if (props.animating) clock.start()

    useFrame((state, delta) => {
        uniforms.u_time.value += delta
        uniforms.u_n1.value = n1Switch(props.theme)
        uniforms.u_n2.value = n2Switch(props.theme)
        uniforms.u_bw1.value = bw1Switch(props.theme)
        uniforms.u_bw2.value = bw2Switch(props.theme)
        uniforms.u_resolution.value = { x: width, y: height }
        uniforms.u_ratio.value = width / height

        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    const pointerMove = e => {
        pointer.set(e.x / window.innerWidth, 1 - e.y / window.innerHeight)
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
        uniforms.u_mouse.value.x = pointer.x
        uniforms.u_mouse.value.y = pointer.y
    }

    return (
        <>
            {createPortal(
                <FBO theme={props.theme} sliderPos={props.sliderPos} />,
                scene
            )}
            <mesh onPointerMove={pointerMove}>
                <planeBufferGeometry
                    args={[camUnit.width, camUnit.height, 1, 1]}
                />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={mainVert}
                    fragmentShader={mainFrag}
                    onUpdate={self => (self.needsUpdate = true)}
                />
            </mesh>
            <Panel theme={props.theme} domEl={props.panelRef} />
        </>
    )
}

export default Geometry
