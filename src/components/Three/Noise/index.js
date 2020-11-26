import React, { useMemo, useRef } from "react"

import * as THREE from "three"
import MouseSpeed from "mouse-speed"
import { useFrame } from "react-three-fiber"
import { noiseVert } from "../Shaders/noiseVert"
import { noiseFrag } from "../Shaders/noiseFrag"

const Noise = props => {
    const width = window.innerWidth
    const height = window.innerHeight

    const mat = useRef()

    let speed = 0

    const pointer = useMemo(() => {
        return new THREE.Vector2()
    })

    var diff = new MouseSpeed()
    diff.init()

    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene()
        const target = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBFormat,
            stencilBuffer: false,
            depthBuffer: false,
            depthWrite: false,
            depthTest: false,
        })
        return [scene, target]
    }, [])

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_speed: {
                value: 0,
            },
            u_resolution: { value: { x: width, y: height } },
            u_ratio: {
                value: window.innerWidth / window.innerHeight,
            },
            u_trail: {
                value: target.texture,
            },
        }),
        []
    )

    const pointerMove = e => {
        pointer.set(e.x / window.innerWidth, 1 - e.y / window.innerHeight)

        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

        uniforms.u_mouse.value.x = pointer.x
        uniforms.u_mouse.value.y = pointer.y
    }

    useFrame((state, delta) => {
        uniforms.u_time.value += delta

        uniforms.u_mouse.value.lerp(pointer, 0.2)
        uniforms.u_speed.value = speed

        const diffSpeed = Math.max(diff.speedX, diff.speedY) * 0.05
        speed += Math.min(diffSpeed, 0.1)
        speed *= 0.95

        speed = Math.min(2, speed)

        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    return (
        <mesh onPointerMove={pointerMove}>
            <planeBufferGeometry args={[width, height, 1, 1]} />
            <shaderMaterial
                ref={mat}
                uniforms={uniforms}
                vertexShader={noiseVert}
                fragmentShader={noiseFrag}
                onUpdate={self => (self.needsUpdate = true)}
            />
        </mesh>
    )
}

export default Noise
