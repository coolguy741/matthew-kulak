import React, { useRef } from "react"

import * as THREE from "three"
import { useFrame } from "react-three-fiber"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"

const Geometry = props => {
    const uniforms = {
        u_time: { value: 0.0 },
        u_mouse: { value: { x: 0.0, y: 0.0 } },
        u_resolution: { value: { x: 1280, y: 650 } },
    }

    // const onMouseMove = e => {
    //     uniforms.u_mouse.value.x = e.touches ? e.touches[0].clientX : e.clientX
    //     uniforms.u_mouse.value.y = e.touches ? e.touches[0].clientY : e.clientY
    // }

    // useFrame((_, delta) => {
    //     uniforms.u_time.value += delta
    // })

    return (
        <>
            <mesh>
                <planeGeometry args={[1280, 800]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertShader}
                    fragmentShader={fragShader}
                />
            </mesh>
        </>
    )
}

export default Geometry
