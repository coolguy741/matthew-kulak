import React, { useMemo, useRef } from "react"

import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import MouseSpeed from "mouse-speed"
import { useFrame, useLoader, useThree, createPortal } from "react-three-fiber"
import { mainVert } from "../shaders/mainVert"
import { mainFrag } from "../shaders/mainFrag"
import fence from "../../../assets/textures/fence.jpg"
import dispMap from "../../../assets/textures/fire.jpg"
import { draco } from "@react-three/drei"
import FRMR from "../FRMR"

// export const Trail = () => {
//     const width = window.innerWidth
//     const height = window.innerHeight

//     const mouse = { x: 0.0, y: 0.0, z: 0.0 }

//     const uniforms = useMemo(
//         () => ({
//             u_time: { value: 0.0 },
//             u_mouse: { value: new THREE.Vector2() },
//             u_resolution: { value: { x: width, y: height } },
//             u_speed: {
//                 value: 0,
//             },
//             u_ratio: {
//                 value: window.innerWidth / window.innerHeight,
//             },
//         }),
//         []
//     )

//     const pointerMove = e => {
//         mouse.x = (e.clientX / window.innerWidth) * 2 - 1
//         mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

//         uniforms.u_mouse.value.x = mouse.x
//         uniforms.u_mouse.value.y = mouse.y

//         // uniforms.u_mouse.value.lerp(uniforms.u_mouse.value, 0.2)
//     }

//     var speed = new MouseSpeed()

//     var onCalcSpeed = function () {
//         var speedX = speed.speedX
//         var speedY = speed.speedY
//         uniforms.u_speed.value = Math.max(Math.abs(speedX), Math.abs(speedY))
//     }

//     speed.init(onCalcSpeed)

//     return (
//         <mesh onPointerMove={pointerMove}>
//             <planeBufferGeometry args={[width, height, 1, 1]} />
//             <shaderMaterial
//                 uniforms={uniforms}
//                 vertexShader={trailVert}
//                 fragmentShader={trailFrag}
//                 onUpdate={self => (self.needsUpdate = true)}
//             />
//         </mesh>
//     )
// }

const Geometry = props => {
    const graf = useLoader(THREE.TextureLoader, fence)
    const disp = useLoader(THREE.TextureLoader, dispMap)

    const width = window.innerWidth
    const height = window.innerHeight

    const pointer = new THREE.Vector2()
    let speed = 0

    const obj = useRef()

    const uniforms = useMemo(
        () => ({
            u_mouse: { value: new THREE.Vector2() },
            u_speed: {
                value: 0,
            },
            u_time: { value: 0.0 },
            u_resolution: { value: { x: width, y: height } },
            u_ratio: {
                value: window.innerWidth / window.innerHeight,
            },
            u_texture: {
                value: new THREE.DataTexture(new Float32Array(width * height)),
            },
            u_image: {
                value: graf,
            },
            u_disp: {
                value: disp,
            },
            u_n1: {
                value: 4096,
            },
            u_n2: {
                value: 0,
            },
            u_bw1: {
                value: 0.125,
            },
            u_bw2: {
                value: 1.0,
            },
        }),
        []
    )

    var diff = new MouseSpeed()
    diff.init()

    // const [scene, target] = useMemo(() => {
    //     const scene = new THREE.Scene()
    //     scene.background = new THREE.Color("white")
    //     const target = new THREE.WebGLMultisampleRenderTarget(1024, 1024, {
    //         format: THREE.RGBFormat,
    //         minFilter: THREE.NearestFilter,
    //         magFilter: THREE.NearestFilter,
    //         stencilBuffer: false,
    //     })
    //     target.samples = 8
    //     return [scene, target]
    // }, [])

    const pointerMove = e => {
        pointer.set(e.x / window.innerWidth, 1 - e.y / window.innerHeight)

        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

        uniforms.u_mouse.value.x = pointer.x
        uniforms.u_mouse.value.y = pointer.y
    }

    useFrame((state, delta) => {
        uniforms.u_time.value += delta
        // uniforms.u_n1.value = props.isDarkMode ? 4357252 : 4096
        uniforms.u_n2.value = props.isDarkMode ? 0 : 4357252
        uniforms.u_bw1.value = props.isDarkMode ? 1.0 : 0.125
        uniforms.u_bw2.value = props.isDarkMode ? 0.125 : 1.0

        uniforms.u_mouse.value.lerp(pointer, 0.2)
        uniforms.u_speed.value = speed
        // state.gl.render(state.scene, state.camera)
        // state.gl.setClearColor(0x000000, 0)

        const diffSpeed =
            Math.max(Math.abs(diff.speedX), Math.abs(diff.speedY)) * 0.05
        speed += Math.min(diffSpeed, 0.1)
        speed *= 0.95

        speed = Math.min(2, speed)

        // state.gl.setRenderTarget(target)
        // state.gl.render(scene, state.camera)
        // state.gl.setRenderTarget(null)
    })

    return (
        <>
            {/* {createPortal(<Trail />, scene)} */}
            <mesh onPointerMove={pointerMove}>
                <planeBufferGeometry args={[width, height, 1, 1]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={mainVert}
                    fragmentShader={mainFrag}
                    onUpdate={self => (self.needsUpdate = true)}
                />
            </mesh>
            {/* <FRMR /> */}
        </>
    )
}

export default Geometry
