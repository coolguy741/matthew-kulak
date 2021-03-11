import React, { useMemo } from "react"
import * as THREE from "three"
import { useFrame, createPortal, useThree } from "react-three-fiber"
import { mainVert, mainFrag } from "../Shaders/Main"
import FBO from "../FBO"
import Panel from "../Panel"

const Geometry = ({ animating, theme, sliderPos, panelRef }) => {
    // Dimensions and aspect ratio
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    // Create pointer object
    const pointer = useMemo(() => {
        return new THREE.Vector2()
    })

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

    // Calculate camera unit size
    const calculateUnitSize = () => {
        const fov = 75 // default camera value
        const cameraZ = 5 // default camera value

        const vFov = (fov * Math.PI) / 180

        const height = 2 * Math.tan(vFov / 2) * cameraZ
        const width = height * aspect

        return { width, height }
    }

    const camUnit = calculateUnitSize()

    // Animation toggle
    const { clock } = useThree()

    if (!animating) clock.stop()
    if (animating) clock.start()

    useFrame((state, delta) => {
        uniforms.uTime.value += delta

        // Resolution and aspect ratio
        uniforms.uResolution.value = { x: width, y: height }
        uniforms.uRatio.value = width / height

        // Render to FBO
        state.gl.setRenderTarget(target)
        state.gl.render(scene, state.camera)
        state.gl.setRenderTarget(null)
    })

    const pointerMove = e => {
        pointer.set(e.x / window.innerWidth, 1 - e.y / window.innerHeight)
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
        uniforms.uMouse.value.x = pointer.x
        uniforms.uMouse.value.y = pointer.y
    }

    return (
        <>
            {createPortal(<FBO theme={theme} sliderPos={sliderPos} />, scene)}
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
            <Panel theme={theme} domEl={panelRef} />
        </>
    )
}

export default Geometry
