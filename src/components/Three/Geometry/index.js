import React, { useMemo } from "react"

import * as THREE from "three"
import { useFrame, createPortal } from "react-three-fiber"
import { mainVert } from "../Shaders/mainVert"
import { mainFrag } from "../Shaders/mainFrag"
import Noise from "../Noise"

const Geometry = props => {
    const width = window.innerWidth
    const height = window.innerHeight

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
                value: window.innerWidth / window.innerHeight,
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
        }),
        []
    )

    const n1Switch = param => {
        switch (param) {
            case "TERMINAL":
                return 14815366
            default:
                return 4096
        }
    }

    const n2Switch = param => {
        switch (param) {
            case "LIGHT":
                return 4357252
            case "DARK":
                return 0
            case "GREY":
                return 18157905
            case "TERMINAL":
                return 15018318
            case "ACID":
                return 15237130
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
            case "GREY":
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
            case "GREY":
                return 0.45
            case "TERMINAL":
                return 0.125
            case "ACID":
                return 0.125
            default:
                return
        }
    }

    useFrame((state, delta) => {
        uniforms.u_time.value += delta
        uniforms.u_n1.value = n1Switch(props.theme)
        uniforms.u_n2.value = n2Switch(props.theme)
        uniforms.u_bw1.value = bw1Switch(props.theme)
        uniforms.u_bw2.value = bw2Switch(props.theme)

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
            {createPortal(<Noise />, scene)}
            <mesh onPointerMove={pointerMove}>
                <planeBufferGeometry args={[width / height, 1, 1, 1]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={mainVert}
                    fragmentShader={mainFrag}
                    onUpdate={self => (self.needsUpdate = true)}
                />
            </mesh>
        </>
    )
}

export default Geometry
