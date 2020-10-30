import React, { useRef, useState } from "react"
import { connect } from "react-redux"

import Effects from "../Effects"
import { Canvas, useFrame } from "react-three-fiber"
import ParticleField from "../Canvas/Particles"
import styles from "../../../styles/Canvas.module.css"
import Project from "../Project"
import config from "./Particles/config"
import merge from "lodash.merge"

const MainCanvas = () => {
  const [rotation, setRotation] = useState([0, 0, 0, 0])

  const onMouseMove = e => {
    setRotation([
      ((e.clientY / e.target.offsetHeight - 0.5) * -Math.PI) / 50,
      ((e.clientX / e.target.offsetWidth - 0.5) * -Math.PI) / 50,
      0,
    ])
  }

  return (
    <Canvas
      className={styles.Canvas}
      gl={{
        antialias: true,
        alpha: false,
        stencil: false,
        depth: false,
      }}
      camera={{
        fov: 120,
        // z: 40,
      }}
      onMouseMove={onMouseMove}
    >
      <pointLight color={0x2003fc} position={[-350, 0, -160]} />
      <pointLight color={0x8400ff} position={[-250, 0, -160]} />
      <pointLight color={0xfc03eb} position={[-150, 0, -170]} />
      <pointLight color={0xff0000} position={[0, 0, -170]} />
      <pointLight color={0xfc03eb} position={[150, 0, -170]} />
      <pointLight color={0x8400ff} position={[250, 0, -160]} />
      <pointLight color={0x2003fc} position={[350, 0, -160]} />
      <Project slug={"GNOS CLOTHING"} rotation={rotation} />
      <ParticleField {...config} />
      <Effects />
    </Canvas>
  )
}

const mapStateToProps = state => {
  return {
    isDarkMode: state.darkMode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCanvas)
