import React from "react"
import loadable from "@loadable/component"
import { connect } from "react-redux"
import Effects from "../Effects"
import { Canvas } from "react-three-fiber"
import styles from "../../../styles/canvas.module.scss"
// import { OrbitControls } from "@react-three/drei"

const Quad = loadable(() => import("../Quad"))

const MainCanvas = ({ hudRef, mouseX, mouseY, ...props }) => {
    return (
        <Canvas
            className={styles.Canvas}
            gl
            invalidateFrameloop={!props.animating}
        >
            {/* <OrbitControls /> */}
            <Quad
                animating={props.animating}
                theme={props.theme}
                sliderPos={props.sliderPos}
                hudRef={hudRef}
                mouseX={mouseX}
                mouseY={mouseY}
            />
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
