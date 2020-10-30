import React, { useRef } from "react"

import * as THREE from "three"
import { useFrame } from "react-three-fiber"
import { vertShader } from "../shaders/vertex"
import { fragShader } from "../shaders/fragment"
import cloud from "../../../assets/textures/cloud.png"
import fire from "../../../assets/textures/fire.jpg"

const Crystal = () => {
  const mesh = useRef()

  const clock = new THREE.Clock()

  const textureLoader = new THREE.TextureLoader()

  const uniforms = {
    fogDensity: { value: 0.45 },
    fogColor: { value: new THREE.Vector3(0, 0, 0) },
    time: { value: 1.0 },
    uvScale: { value: new THREE.Vector2(3.0, 1.0) },
    texture1: {
      value: textureLoader.load(cloud),
    },
    texture2: {
      value: textureLoader.load(fire),
    },
  }

  uniforms["texture1"].value.wrapS = uniforms["texture1"].value.wrapT =
    THREE.RepeatWrapping
  uniforms["texture2"].value.wrapS = uniforms["texture2"].value.wrapT =
    THREE.RepeatWrapping

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertShader,
    fragmentShader: fragShader,
  })

  useFrame(() => {
    const delta = 5 * clock.getDelta()

    uniforms["time"].value += 0.4 * delta

    // mesh.current.rotation.y += 0.0125 * delta
    mesh.current.rotation.z += 0.01 * delta
  })

  return (
    <mesh ref={mesh}>
      <torusBufferGeometry args={[3.6, 2.5, 80, 30]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertShader}
        fragmentShader={fragShader}
      />
    </mesh>
  )
}

export default Crystal
