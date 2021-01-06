import React, { Suspense, useState, useEffect } from "react"
import { connect } from "react-redux"

import Effects from "../Effects"
import { Canvas } from "react-three-fiber"
import styles from "../../../styles/canvas.module.scss"
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
            invalidateFrameloop={!props.animating}
        >
            {/* <OrbitControls /> */}
            <Suspense fallback={null}>
                <Geometry
                    animating={props.animating}
                    theme={props.theme}
                    sliderPos={props.sliderPos}
                    panelRef={props.panelRef}
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
