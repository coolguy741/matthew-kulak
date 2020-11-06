import React, { useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import { Text } from "@react-three/drei/text"
import Origami from "../../../assets/fonts/Origami.ttf"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"
import cloud from "../../../assets/textures/cloud.png"
import lava from "../../../assets/textures/lavatile.jpg"
import * as THREE from "three"

function Project(props) {
    const text = useRef()
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // const textureLoader = new THREE.TextureLoader()

    // const uniforms = {
    //   fogDensity: { value: 0.45 },
    //   fogColor: { value: new THREE.Vector3(0, 0, 0) },
    //   time: { value: 1.0 },
    //   uvScale: { value: new THREE.Vector2(3.0, 1.0) },
    //   texture1: {
    //     value: textureLoader.load(cloud),
    //   },
    //   texture2: {
    //     value: textureLoader.load(lava),
    //   },
    // }

    // uniforms["texture1"].value.wrapS = uniforms["texture1"].value.wrapT =
    //   THREE.RepeatWrapping
    // uniforms["texture2"].value.wrapS = uniforms["texture2"].value.wrapT =
    //   THREE.RepeatWrapping

    // const shaderMaterial = new THREE.ShaderMaterial({
    //   uniforms: uniforms,
    //   vertexShader: vertShader,
    //   fragmentShader: fragShader,
    // })

    const material = new THREE.MeshPhongMaterial({
        color: "#202020",
    })

    return (
        <Text
            ref={text}
            position-z={600}
            material-toneMapped={false}
            color="#bafc03"
            // facade="Text3DFacade"
            outlineWidth={0.3}
            outlineColor="#ffffff"
            fontSize="20"
            anchorX="center"
            anchorY="middle"
            font={Origami}
            letterSpacing="-0.04"
            rotation={props.rotation}
            material={material}
        >
            {props.slug}
        </Text>
    )
}

export default Project
