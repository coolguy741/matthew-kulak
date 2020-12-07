import React, { useRef, useEffect } from "react"
import { extend, useThree, useFrame } from "react-three-fiber"
import * as THREE from "three"
import fxaa from "three-shader-fxaa"

const Effects = () => {
    const composer = useRef()
    const { scene, gl, size, camera } = useThree()

    window.THREE = require("three")

    useEffect(() => void composer.current.setSize(size.width, size.height), [
        size,
    ])

    useFrame(() => composer.current.render(), 1)

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <shaderPass
                attachArray="passes"
                args={[fxaa()]}
                material-uniforms-resolution-value={[
                    1 / size.width,
                    1 / size.height,
                ]}
                renderToScreen
            />
        </effectComposer>
    )
}

export default Effects
