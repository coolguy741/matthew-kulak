import React, { useMemo, useRef } from "react"

import * as THREE from "three"
import MouseSpeed from "mouse-speed"
import { useFrame, useLoader, useThree, createPortal } from "react-three-fiber"
import { trailVert } from "../shaders/trailVert"
import { trailFrag } from "../shaders/trailFrag"
import { mainVert } from "../shaders/mainVert"
import { mainFrag } from "../shaders/mainFrag"
import fence from "../../../assets/textures/tokyo.png"
import dispMap from "../../../assets/textures/fire.jpg"

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
                value: new THREE.DataTexture(
                    new Float32Array(width * height * 4),
                    width,
                    height
                ),
            },
            u_image: {
                value: graf,
            },
            u_disp: {
                value: disp,
            },
            u_n1: {
                value: 11512810,
            },
            u_n2: {
                value: 13199452,
            },
            u_n3: {
                value: 15252014,
            },
            u_n4: {
                value: 23385164,
            },
            u_n5: {
                value: 15255086,
            },
            u_n6: {
                value: 332772,
            },
            u_n7: {
                value: 65600,
            },
            u_n8: {
                value: 4096,
            },
            u_bw1: {
                value: 0.0,
            },
            u_bw2: {
                value: 1.0,
            },
        }),
        []
    )

    var diff = new MouseSpeed()

    var onCalcSpeed = function () {
        var speedX = diff.speedX
        var speedY = diff.speedY
    }

    diff.init(onCalcSpeed)

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
        uniforms.u_n1.value = props.isDarkMode ? 4096 : 11512810
        uniforms.u_n2.value = props.isDarkMode ? 65600 : 13199452
        uniforms.u_n3.value = props.isDarkMode ? 332772 : 15252014
        uniforms.u_n4.value = props.isDarkMode ? 15255086 : 23385164
        uniforms.u_n5.value = props.isDarkMode ? 23385164 : 15255086
        uniforms.u_n6.value = props.isDarkMode ? 15252014 : 332772
        uniforms.u_n7.value = props.isDarkMode ? 13199452 : 65600
        uniforms.u_n8.value = props.isDarkMode ? 11512810 : 4096
        uniforms.u_bw1.value = props.isDarkMode ? 1.0 : 0.0
        uniforms.u_bw2.value = props.isDarkMode ? 0.0 : 1.0

        uniforms.u_mouse.value.lerp(pointer, 0.2)
        uniforms.u_speed.value = speed
        // state.gl.render(state.scene, state.camera)
        state.gl.setClearColor(0x000000, 0)

        const diffSpeed =
            Math.max(Math.abs(diff.speedX), Math.abs(diff.speedY)) * 0.05
        speed += diffSpeed
        speed *= 0.9

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
        </>
    )
}

export default Geometry
