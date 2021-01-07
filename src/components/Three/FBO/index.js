import React, { useMemo, useRef } from "react"

import * as THREE from "three"
import MouseSpeed from "mouse-speed"
import { useFrame } from "react-three-fiber"
import { lavaFrag, lavaVert } from "../Shaders/Lava"
import { baseFrag } from "../Shaders/Base"
import { termFrag } from "../Shaders/Terminal"
import { solisFrag } from "../Shaders/Solis"
import { voidFrag } from "../Shaders/Portal"
import { darkFrag } from "../Shaders/Dark"
import matcap from "../../../assets/images/matcap/matcap.jpg"

const FBO = props => {
    const width = window.innerWidth
    const height = window.innerHeight

    const mat = useRef()

    let speed = 0

    const pointer = useMemo(() => {
        return new THREE.Vector3()
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

    const fragSwitch = param => {
        switch (param) {
            case "LIGHT":
                return baseFrag
            case "DARK":
                return darkFrag
            case "SOLIS":
                return voidFrag
            case "TERMINAL":
                return termFrag
            case "ACID":
                return lavaFrag
            default:
                return
        }
    }

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector3() },
            u_speed: {
                value: 0,
            },
            u_matcap: { value: new THREE.TextureLoader().load(matcap) },
            u_resolution: { value: { x: width, y: height } },
            u_ratio: {
                value: window.innerWidth / window.innerHeight,
            },
            u_n1: {
                value: 14815366,
            },
            u_n2: {
                value: 4096,
            },
            u_trail: {
                value: target.texture,
            },
            u_slider: {
                value: props.sliderPos,
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

        uniforms.u_resolution.value = { x: width, y: height }
        uniforms.u_ratio.value = width / height

        uniforms.u_mouse.value.lerp(pointer, 0.2)
        uniforms.u_speed.value = speed

        uniforms.u_slider.value = props.sliderPos

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
                vertexShader={lavaVert}
                fragmentShader={fragSwitch(props.theme)}
                onUpdate={self => (self.needsUpdate = true)}
            />
        </mesh>
    )
}

export default FBO
