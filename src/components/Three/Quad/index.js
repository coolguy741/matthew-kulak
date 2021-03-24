import React, { useMemo } from "react"
import * as THREE from "three"
import { useFrame, createPortal, useThree } from "react-three-fiber"
import { mainVert, mainFrag } from "../Shaders/Main"
import { lavaFrag } from "../Shaders/Lava"
import { baseFrag } from "../Shaders/Base"
import { termFrag } from "../Shaders/Terminal"
import { voidFrag } from "../Shaders/Portal"
import { darkFrag } from "../Shaders/Dark"
import FBO from "../FBO"
import HUD from "../HUD"

const Quad = ({ animating, theme, sliderPos, hudRef, mouseX, mouseY }) => {
    // Dimensions and aspect ratio
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    // Scene and render target for FBO
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

    // Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0.0 },
            uResolution: { value: { x: width, y: height } },
            uRatio: {
                value: aspect,
            },
            uMouse: { value: new THREE.Vector2() },
            uSlider: {
                value: sliderPos,
            },
            uTexture: {
                value: target.texture,
            },
        }),
        []
    )

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

    // Calculate camera unit size
    const calculateUnitSize = () => {
        const fov = 75 // default camera value
        const cameraZ = 5 // default camera value

        const vFov = (fov * Math.PI) / 180

        const unitHeight = 2 * Math.tan(vFov / 2) * cameraZ
        const unitWidth = height * aspect

        return { unitWidth, unitHeight }
    }

    const camUnit = calculateUnitSize()

    // Animation toggle
    const { clock } = useThree()

    if (!animating) clock.stop()
    if (animating) clock.start()

    // Normalize pointer values
    mouseX = mouseX / width
    mouseY = 1 - mouseY / height

    mouseX = mouseX * 2 - 1
    mouseY = mouseY * 2 - 1

    // RAF
    useFrame((state, delta) => {
        uniforms.uTime.value += delta

        // Resolution and aspect ratio
        uniforms.uResolution.value = { x: width, y: height }
        uniforms.uRatio.value = width / height

        // Update mouse positon
        uniforms.uMouse.value.x = mouseX
        uniforms.uMouse.value.y = mouseY

        // Update slider uniform
        uniforms.uSlider.value = sliderPos

        // Render to FBO
        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    return (
        <>
            {createPortal(<FBO theme={theme} sliderPos={sliderPos} />, scene)}
            <mesh>
                <planeBufferGeometry
                    args={[camUnit.unitWidth, camUnit.unitHeight, 1, 1]}
                />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={mainVert}
                    fragmentShader={fragSwitch(theme)}
                    onUpdate={self => (self.needsUpdate = true)}
                />
            </mesh>
            <HUD theme={theme} domEl={hudRef} sliderPos={sliderPos} />
        </>
    )
}

export default Quad
