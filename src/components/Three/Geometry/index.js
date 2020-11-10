import React, { useRef, useMemo } from "react"

import * as THREE from "three"
import { useFrame, useLoader, useThree } from "react-three-fiber"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"
import fence from "../../../assets/textures/fence.jpg"
import dispMap from "../../../assets/textures/disp2.png"

const Geometry = props => {
    const { gl, scene, camera } = useThree()
    const graf = useLoader(THREE.TextureLoader, fence)
    const disp = useLoader(THREE.TextureLoader, dispMap)

    const uniforms = {
        u_time: { value: 0.0 },
        u_mouse: { value: { x: 0.0, y: 0.0 } },
        u_resolution: { value: { x: 1280, y: 650 } },
        u_image: {
            value: graf,
        },
        u_disp: {
            value: disp,
        },
    }

    const pointerMove = e => {
        uniforms.u_mouse.value.x = e.clientX
        uniforms.u_mouse.value.y = e.clientY
        console.log(uniforms.u_mouse.value)
    }

    useFrame((_, delta) => {
        uniforms.u_time.value += delta
    })

    return (
        <>
            <mesh onPointerMove={pointerMove}>
                <planeGeometry args={[1500, 1000]} />
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
