import React, { useRef, useEffect } from "react"
import { extend, useThree, useFrame } from "react-three-fiber"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  FilmPass,
  GlitchPass,
})

const Effects = () => {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])

  useFrame(() => composer.current.render(), 1)

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <filmPass attachArray="passes" args={[1000, 10, 0, false]} />
      <unrealBloomPass attachArray="passes" args={[undefined, 2.5, 2.1, 0]} />
      <filmPass attachArray="passes" args={[1, 0, 0, false]} />
      {/* <glitchPass attachArray="passes" args={[100]} /> */}
    </effectComposer>
  )
}

export default Effects
