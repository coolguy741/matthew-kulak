import React, { Suspense } from "react"
import { connect } from "react-redux"

import Effects from "../Effects"
import { Canvas } from "react-three-fiber"
import styles from "../../../styles/canvas.module.scss"
import Camera from "../Camera"
import Geometry from "../Geometry"
import { OrbitControls } from "@react-three/drei"

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
                preserveDrawingBuffer: true,
            }}
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
            <OrbitControls />
            <ambientLight />
            <Suspense fallback={null}>
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
