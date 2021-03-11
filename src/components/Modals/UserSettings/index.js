import React from "react"
import Modal from "../../Modals"
import { connect } from "react-redux"
import Toggle from "react-toggle"
import styles from "../../../styles/modals.module.scss"
import "../../../styles/toggleswitch.scss"

const UserSettings = ({ width, height, toolbar, ...props }) => {
    // Toggle CSS switch
    const toggleCssSwitch = param => {
        switch (param) {
            case "LIGHT":
                return "light"
            case "DARK":
                return "dark"
            case "SOLIS":
                return "solis"
            case "TERMINAL":
                return "terminal"
            case "ACID":
                return "acid"
            default:
                return
        }
    }

    // Get window dimensions
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    return (
        <Modal
            name={"Settings"}
            width={width}
            height={height}
            toolbar={toolbar}
        >
            <div className={styles.togglesContainer}>
                <div className={styles.toggleContainer}>
                    <label>
                        <Toggle
                            defaultChecked={true}
                            icons={false}
                            className={toggleCssSwitch(props.theme)}
                            onChange={props.onToggleAnimating}
                        />
                        <h3>Animation</h3>
                    </label>
                </div>
                <div className={styles.toggleContainer}>
                    <label>
                        <Toggle
                            defaultChecked={true}
                            icons={false}
                            className={toggleCssSwitch(props.theme)}
                            onChange={props.onToggleFXAA}
                        />
                        <h3>FXAA</h3>
                    </label>
                </div>
                <div className={styles.toggleContainer}>
                    <label>
                        <Toggle
                            defaultChecked={true}
                            icons={false}
                            className={toggleCssSwitch(props.theme)}
                            onChange={props.onToggleRendering}
                        />
                        <h3>WebGL</h3>
                    </label>
                </div>
            </div>
            <div className={styles.gpuInfo}>
                <div className={styles.settingsTitle}>
                    <h2>GPU</h2>
                </div>
                <div className={styles.settingsDesc}>
                    <span>{props.gpu.gpu}</span>
                </div>
                <div className={styles.settingsTitle}>
                    <h2>Screen Size</h2>
                </div>
                <div className={styles.settingsDesc}>
                    <span>{`${innerWidth} x ${innerHeight}`}</span>
                </div>
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        rendering: state.rendering,
        animating: state.animating,
        gpu: state.gpu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleRendering: () => dispatch({ type: "TOGGLE_RENDERING" }),
        onToggleAnimating: () => dispatch({ type: "TOGGLE_ANIMATING" }),
        onToggleFXAA: () => dispatch({ type: "TOGGLE_FXAA" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
