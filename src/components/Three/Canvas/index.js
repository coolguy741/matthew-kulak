import React, { useRef, useState, Suspense } from "react"
import { connect } from "react-redux"

import * as THREE from "three"
import Effects from "../Effects"
import { Canvas, useFrame } from "react-three-fiber"
import styles from "../../../styles/Canvas.module.css"
import Camera from "../Camera"
import CameraControls from "../CameraControls"
import Project from "../Project"
import Geometry from "../Geometry"

const MainCanvas = () => {
    // const [rotation, setRotation] = useState([0, 0, 0, 0])

    return (
        <Canvas
            className={styles.Canvas}
            // gl={{
            //     antialias: false,
            //     alpha: false,
            //     stencil: false,
            //     depth: false,
            // }}
            // onMouseMove={onMouseMove}
            // onCreated={({ gl }) => {
            //     gl.setClearColor("#f6f6f6")
            //     gl.toneMapping = THREE.ACESFilmicToneMapping
            //     gl.outputEncoding = THREE.sRGBEncoding
            // }}
        >
            <Camera
                fov={45}
                aspect={window.innerWidth / window.innerHeight}
                near={1}
                far={1000}
                position={[0, 0, 700]}
            />
            {/* <Camera
                left={-1}
                right={1}
                top={1}
                bottom={-1}
                near={0.1}
                far={10}
                position={[0, 0, 1]}
            /> */}
            <CameraControls />
            <hemisphereLight
                skyColor={0xffffff}
                groundColor={0x000000}
                intensity={1}
            />
            <directionalLight
                position={[20, 6, 250]}
                color={0xffffff}
                intensity={0.2}
            />
            <Suspense fallback={null}>
                {/* <Geometry /> */}
                <Project slug={"GNOS CLOTHING"} />
            </Suspense>
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
