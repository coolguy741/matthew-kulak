import React, { useRef, useEffect } from "react"
import { useThree, useFrame, extend } from "react-three-fiber"
import { FXAAVert, FXAAFrag } from "../Shaders/FXAA"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import * as THREE from "three"

extend({ EffectComposer, RenderPass, ShaderPass })

const Effects = ({ fxaa }) => {
    // Set refs and renderer vars
    const composer = useRef()
    const { scene, gl, size, camera } = useThree()

    // Get screen size
    const width = window.innerWidth
    const height = window.innerHeight

    // Uniforms
    const uniforms = {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2(1 / width, 1 / height) },
    }

    // Resize effects renderer
    useEffect(() => void composer.current.setSize(size.width, size.height), [
        size,
    ])

    // RAF
    useFrame(() => composer.current.render(), 1)

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            {fxaa && (
                <shaderPass
                    attachArray="passes"
                    args={[
                        {
                            uniforms: uniforms,
                            vertexShader: FXAAVert,
                            fragmentShader: FXAAFrag,
                        },
                    ]}
                    material-uniforms-resolution-value={[
                        1 / size.width,
                        1 / size.height,
                    ]}
                    renderToScreen
                />
            )}
        </effectComposer>
    )
}

export default Effects
