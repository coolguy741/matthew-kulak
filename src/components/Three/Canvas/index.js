import React, { Suspense } from "react"
import { connect } from "react-redux"
import Effects from "../Effects"
import { Canvas } from "react-three-fiber"
import styles from "../../../styles/canvas.module.scss"
import Quad from "../Quad"
// import { OrbitControls } from "@react-three/drei"

const MainCanvas = ({ hudRef, ...props }) => {
    return (
        <Canvas
            className={styles.Canvas}
            gl
            invalidateFrameloop={!props.animating}
        >
            {/* <OrbitControls /> */}
            <Suspense fallback={null}>
                <Quad
                    animating={props.animating}
                    theme={props.theme}
                    sliderPos={props.sliderPos}
                    hudRef={hudRef}
                />
            </Suspense>
            <Effects fxaa={props.fxaa} />
        </Canvas>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        sliderPos: state.sliderPos,
        animating: state.animating,
        fxaa: state.fxaa,
    }
}

export default connect(mapStateToProps)(MainCanvas)
