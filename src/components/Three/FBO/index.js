import React, { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "react-three-fiber"
import { lavaFrag, lavaVert } from "../Shaders/Lava"
import { baseFrag } from "../Shaders/Base"
import { termFrag } from "../Shaders/Terminal"
import { voidFrag } from "../Shaders/Portal"
import { darkFrag } from "../Shaders/Dark"

const FBO = props => {
    // Refs
    const mat = useRef()

    // Get screen size
    const width = window.innerWidth
    const height = window.innerHeight
    const aspectRatio = width / height

    // Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0.0 },
            uResolution: { value: { x: width, y: height } },
            uRatio: {
                value: window.innerWidth / window.innerHeight,
            },
            uSlider: {
                value: props.sliderPos,
            },
        }),
        []
    )

    // Scene/target
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

    // Fragment shader switch statement
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

    // RAF
    useFrame((state, delta) => {
        uniforms.uTime.value += delta

        // Update resolution/aspect ratio
        uniforms.uResolution.value = { x: width, y: height }
        uniforms.uRatio.value = aspectRatio

        // Update slider uniform
        uniforms.uSlider.value = props.sliderPos

        // Render
        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    return (
        <mesh>
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
