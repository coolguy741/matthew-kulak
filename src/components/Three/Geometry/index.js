import React, { useRef, useMemo } from "react"

import * as THREE from "three"
import { useFrame, useLoader } from "react-three-fiber"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"
import wall from "../../../assets/textures/wall.jpg"
import fence from "../../../assets/textures/fence.jpg"
import { noise } from "../Noise"

const Geometry = props => {
    const texture = useLoader(THREE.TextureLoader, fence)

    const uniforms = {
        u_time: { value: 0.0 },
        u_mouse: { value: { x: 0.0, y: 0.0 } },
        u_resolution: { value: { x: 1280, y: 650 } },
        u_texture: {
            value: texture,
        },
    }

    const onPointerMove = e => {
        uniforms.u_mouse.value.x = e.touches ? e.touches[0].clientX : e.clientX
        uniforms.u_mouse.value.y = e.touches ? e.touches[0].clientY : e.clientY
    }

    useFrame((_, delta) => {
        uniforms.u_time.value += delta
    })

    return (
        <>
            <mesh onPointerMove={onPointerMove}>
                <planeGeometry args={[3000, 2000]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertShader}
                    fragmentShader={fragShader}
                    // wireframe={true}
                />
            </mesh>
        </>
    )
}

export default Geometry
