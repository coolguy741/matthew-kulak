import React, { useRef, useMemo } from "react"

import * as THREE from "three"
import { useGLTF } from "@react-three/drei/useGLTF"
import { mainVert } from "../shaders/mainVert"
import { mainFrag } from "../shaders/mainFrag"

export default function Model(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF("/frmr.glb")

    const width = window.innerWidth
    const height = window.innerHeight

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_texture: {
                value: new THREE.DataTexture(new Float32Array(width * height)),
            },
        }),
        []
    )

    return (
        <group ref={group} {...props}>
            <mesh
                geometry={nodes.Curve002.geometry}
                position={[0, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[300, 300, 300]}
            >
                <meshPhongMaterial />
            </mesh>
        </group>
    )
}

useGLTF.preload("/frmr.glb")
