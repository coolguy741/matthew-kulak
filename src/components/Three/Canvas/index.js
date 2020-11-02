import React, { useRef, useState } from "react"
import { connect } from "react-redux"

import * as THREE from "three"
import Effects from "../Effects"
import { Canvas, useFrame } from "react-three-fiber"
import styles from "../../../styles/Canvas.module.css"
import Project from "../Project"
import Geometry from "../Geometry"

const MainCanvas = () => {
    const [rotation, setRotation] = useState([0, 0, 0, 0])

    // const onMouseMove = e => {
    //     uniforms.u_mouse.value.x = e.touches ? e.touches[0].clientX : e.clientX
    //     uniforms.u_mouse.value.y = e.touches ? e.touches[0].clientY : e.clientY
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
            // camera={{
            //     position: [0, 1, 3],
            // }}
            // onMouseMove={onMouseMove}
            onCreated={({ gl }) => {
                gl.setClearColor("#f6f6f6")
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.outputEncoding = THREE.sRGBEncoding
            }}
            orthographic={true}
        >
            {/* <ambientLight intensity={1} /> */}
            {/* <pointLight /> */}
            <Geometry />
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
