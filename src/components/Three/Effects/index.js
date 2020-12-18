import React, { useRef, useEffect } from "react"
import { useThree, useFrame } from "react-three-fiber"
import { FXAAVert, FXAAFrag } from "../Shaders/FXAA"
import * as THREE from "three"

const Effects = props => {
    const composer = useRef()
    const { scene, gl, size, camera } = useThree()

    const width = window.innerWidth
    const height = window.innerHeight

    window.THREE = require("three")

    const uniforms = {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2(1 / width, 1 / height) },
    }

    useEffect(() => void composer.current.setSize(size.width, size.height), [
        size,
    ])

    useFrame(() => composer.current.render(), 1)

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            {props.fxaa && (
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
