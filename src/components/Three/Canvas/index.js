import React, { useRef, useState } from "react"
import { connect } from "react-redux"

import * as THREE from "three"
import Effects from "../Effects"
import { Canvas, useFrame } from "react-three-fiber"
import styles from "../../../styles/Canvas.module.css"
import Project from "../Project"
import Crystal from "../Crystal"

const MainCanvas = () => {
  const [rotation, setRotation] = useState([0, 0, 0, 0])

  // const onMouseMove = e => {
  //   setRotation([
  //     ((e.clientY / e.target.offsetHeight - 0.5) * -Math.PI) / 50,
  //     ((e.clientX / e.target.offsetWidth - 0.5) * -Math.PI) / 50,
  //     0,
  //   ])
  // }

  return (
    <Canvas
      className={styles.Canvas}
      gl={{
        antialias: false,
        alpha: false,
        stencil: false,
        depth: false,
      }}
      // onMouseMove={onMouseMove}
      onCreated={({ gl }) => {
        gl.setClearColor("#f6f6f6")
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
      }}
    >
      {/* <ambientLight intensity={0.1} /> */}
      {/* <pointLight /> */}
      <Crystal />
      {/* <Project slug={"GNOS CLOTHING"} rotation={rotation} /> */}
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
