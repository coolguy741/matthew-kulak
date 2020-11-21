import React, { useMemo, useRef } from "react"

import * as THREE from "three"
import MouseSpeed from "mouse-speed"
import { useFrame, createPortal } from "react-three-fiber"
import { mainVert } from "../shaders/mainVert"
import { trailVert } from "../shaders/trailVert"
import { mainFrag } from "../shaders/mainFrag"
import { trailFrag } from "../shaders/trailFrag"
import { TorusKnot, Box, PerspectiveCamera } from "@react-three/drei"

const Trail = props => {
    const mat = useRef()

    const width = window.innerWidth
    const height = window.innerHeight

    let copyData = true
    let rtIndex = 0
    let speed = 0

    const pointer = new THREE.Vector2()

    var diff = new MouseSpeed()
    diff.init()

    const texture = useMemo(() => {
        new THREE.DataTexture(new Float32Array(width * height))
    }, [])

    const uniforms = useMemo(
        () => ({
            u_mouse: { value: new THREE.Vector2() },
            u_speed: {
                value: 0,
            },
            u_time: { value: 0.0 },
            u_resolution: { value: { x: width, y: height } },
            u_ratio: {
                value: window.innerWidth / window.innerHeight,
            },
            u_texture: {
                value: texture,
            },
        }),
        []
    )

    const createRT = useMemo(() => {
        return new THREE.WebGLRenderTarget(
            width,
            height,
            Object.assign({
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter,
                stencilBuffer: false,
                depthBuffer: false,
                depthWrite: false,
                depthTest: false,
            })
        )
    })

    const rt = [createRT, createRT]

    const updateRT = (renderer, scene, camera) => {
        const destIndex = rtIndex === 0 ? 1 : 0
        const old = rt[rtIndex]
        const dest = rt[destIndex]

        if (mat.current?.uniforms?.texture !== undefined) {
            mat.current.uniforms.texture.value = copyData
                ? texture
                : old.texture
        }

        const oldMainTarget = renderer.getRenderTarget()
        renderer.setRenderTarget(dest)
        renderer.render(scene, camera)
        renderer.setRenderTarget(oldMainTarget)

        rtIndex = destIndex
        copyData = false
    }

    const pointerMove = e => {
        pointer.set(e.x / window.innerWidth, 1 - e.y / window.innerHeight)

        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

        uniforms.u_mouse.value.x = pointer.x
        uniforms.u_mouse.value.y = pointer.y
    }

    useFrame((state, delta) => {
        // uniforms.u_mouse.value.lerp(pointer, 0.2)
        uniforms.u_speed.value = speed

        // updateRT(state.gl, state.scene, state.camera)

        const diffSpeed =
            Math.max(Math.abs(diff.speedX), Math.abs(diff.speedY)) * 0.05
        speed += Math.min(diffSpeed, 0.1)
        speed *= 0.95

        speed = Math.min(2, speed)
    })

    return (
        <mesh onPointerMove={pointerMove}>
            <planeBufferGeometry args={[width, height, 1, 1]} />
            <shaderMaterial
                ref={mat}
                uniforms={uniforms}
                vertexShader={trailVert}
                fragmentShader={trailFrag}
                onUpdate={self => (self.needsUpdate = true)}
            />
        </mesh>
    )
}

const Geometry = props => {
    const width = window.innerWidth
    const height = window.innerHeight

    const cam = useRef()

    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color("orange")
        const target = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBFormat,
            stencilBuffer: false,
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
            u_trail: {
                value: target.texture,
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

    return (
        <>
            {createPortal(<Trail />, scene)}
            <mesh>
                <planeBufferGeometry args={[width / height, 1, 0, 0]} />
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
