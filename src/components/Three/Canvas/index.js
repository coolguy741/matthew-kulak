import React, { Suspense } from "react"
import { connect } from "react-redux"

import Effects from "../Effects"
import { Canvas } from "react-three-fiber"
import styles from "../../../styles/canvas.module.scss"
import Camera from "../Camera"
import Geometry from "../Geometry"
import { OrbitControls } from "@react-three/drei"

const MainCanvas = props => {
    return (
        <Canvas
            className={styles.Canvas}
            gl={
                {
                    // antialias: true,
                    // alpha: true,
                    // stencil: false,
                    // depth: false,
                }
            }
        >
            <Camera
                left={-1}
                right={1}
                top={1}
                bottom={-1}
                near={0.1}
                far={10}
                position={[0, 0, 1]}
            />
            {/* <OrbitControls /> */}
            <Suspense fallback={null}>
                <Geometry theme={props.theme} sliderPos={props.sliderPos} />
            </Suspense>
            {/* <Effects /> */}
        </Canvas>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        sliderPos: state.sliderPos,
    }
}

export default connect(mapStateToProps)(MainCanvas)
