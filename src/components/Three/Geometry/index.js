import React, { useMemo } from "react"

import * as THREE from "three"
import { useFrame, createPortal } from "react-three-fiber"
import { mainVert } from "../shaders/mainVert"
import { mainFrag } from "../shaders/mainFrag"
import Noise from "../Noise"

const Geometry = props => {
    const width = window.innerWidth
    const height = window.innerHeight

    const pointer = useMemo(() => {
        return new THREE.Vector2()
    })

    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene()
        const target = new THREE.WebGLRenderTarget(width, height, {
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

    useFrame((state, delta) => {
        uniforms.u_time.value += delta
        uniforms.u_n2.value = props.isDarkMode ? 0 : 4357252
        uniforms.u_bw1.value = props.isDarkMode ? 1.0 : 0.125
        uniforms.u_bw2.value = props.isDarkMode ? 0.125 : 1.0

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
