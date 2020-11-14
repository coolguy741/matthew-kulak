import React, { useMemo } from "react"
import { connect } from "react-redux"

import * as THREE from "three"
import MouseSpeed from "mouse-speed"
import { useFrame, useLoader, useThree, useUpdate } from "react-three-fiber"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"
import fence from "../../../assets/textures/tokyo.png"
import dispMap from "../../../assets/textures/fire.jpg"

const Geometry = props => {
    const { gl, scene, camera, raycaster } = useThree()
    const mouse = { x: 0.0, y: 0.0, z: 0.0 }

    const graf = useLoader(THREE.TextureLoader, fence)
    const disp = useLoader(THREE.TextureLoader, dispMap)

    const width = window.innerWidth
    const height = window.innerHeight

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: { value: { x: width, y: height } },
            u_speed: {
                value: 0,
            },
            u_ratio: {
                value: 1.5,
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

    const pointerMove = e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)

        uniforms.u_mouse.value.x = mouse.x
        uniforms.u_mouse.value.y = mouse.y

        // uniforms.u_mouse.value = intersects[0].point

        console.log(uniforms.u_mouse.value)
    }

    useFrame((_, delta) => {
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
    })

    var speed = new MouseSpeed()

    var onCalcSpeed = function () {
        var speedX = speed.speedX

        uniforms.u_speed.value = speedX

        // do anything you want with speed values
        console.log(uniforms.u_speed.value)
    }

    speed.init(onCalcSpeed)

    return (
        <>
            <mesh onPointerMove={pointerMove}>
                <planeBufferGeometry args={[width, height, 1, 1]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertShader}
                    fragmentShader={fragShader}
                    onUpdate={self => (self.needsUpdate = true)}
                />
            </mesh>
        </>
    )
}

export default Geometry
