import React, { useRef } from "react"

import * as THREE from "three"
import { useFrame, useLoader, useThree } from "react-three-fiber"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"
import fence from "../../../assets/textures/explosion.png"
import dispMap from "../../../assets/textures/fire.jpg"
import gnos from "../../../assets/textures/insta-story.mp4"

const Geometry = props => {
    const mesh = useRef()

    const { gl, scene, camera, raycaster } = useThree()
    const mouse = { x: 0.0, y: 0.0, z: 0.0 }

    const graf = useLoader(THREE.TextureLoader, fence)
    const disp = useLoader(THREE.TextureLoader, dispMap)

    const width = window.innerWidth
    const height = window.innerHeight

    const uniforms = {
        u_time: { value: 0.0 },
        u_mouse: { value: { x: 0.0, y: 0.0, z: 0.0 } },
        u_resolution: { value: { x: width, y: height } },
        u_image: {
            value: graf,
        },
        u_disp: {
            value: disp,
        },
        u_video: {
            value: gnos,
        },
    }

    useFrame(({ gl, scene, camera }, delta) => {
        uniforms.u_time.value += delta
    })

    const pointerMove = e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)

        uniforms.u_mouse.value = intersects[0].point
    }

    return (
        <>
            <mesh ref={mesh} onPointerMove={pointerMove}>
                <planeBufferGeometry args={[width, height, 1, 1]} />
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
