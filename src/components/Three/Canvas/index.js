import React, { useRef, useState, Suspense } from "react"
import { connect } from "react-redux"

import * as THREE from "three"
import Effects from "../Effects"
import { Canvas, useFrame } from "react-three-fiber"
import styles from "../../../styles/canvas.module.scss"
import Camera from "../Camera"
import CameraControls from "../CameraControls"
import Geometry from "../Geometry"
import { Trail } from "../Geometry"

const MainCanvas = props => {
    // const [rotation, setRotation] = useState([0, 0, 0, 0])

    return (
        <Canvas
            className={styles.Canvas}
            gl={{
                antialias: true,
                alpha: true,
                stencil: false,
                depth: false,
            }}
            onCreated={({ gl }) => {
                gl.setClearColor(0xffffff, 0.5)
            }}
        >
            <Camera
                fov={45}
                aspect={window.innerWidth / window.innerHeight}
                near={1}
                far={1000}
                position={[0, 0, 500]}
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
            {/* <CameraControls /> */}
            <Suspense fallback={null}>
                {/* <Trail isDarkMode={props.isDarkMode} /> */}
                <Geometry isDarkMode={props.isDarkMode} />
            </Suspense>
            {/* <Effects /> */}
        </Canvas>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(MainCanvas)
