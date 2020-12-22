import React, { useEffect } from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import Toggle from "react-toggle"
import styles from "../../../styles/modals.module.scss"
import "../../../styles/toggleswitch.scss"

class UserSettings extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const innerWidth = window.innerWidth
        const innerHeight = window.innerHeight

        const getYPos = () => {
            const yPos =
                innerHeight - this.props.height - this.props.toolbar - 40
            if (yPos < 0) {
                return 0
            } else {
                return yPos
            }
        }

        const xPos = Math.random() * (innerWidth - this.props.width)
        const yPos = Math.random() * getYPos()

        const dragHandlers = { onStart: this.onStart }

        const onClickClose = e => {
            e.stopPropagation() // Stop z-index increment on mouse down if closing modal
        }

        const cssSwitch = param => {
            switch (param) {
                case "LIGHT":
                    return styles.light
                case "DARK":
                    return styles.dark
                case "SOLIS":
                    return styles.solis
                case "TERMINAL":
                    return styles.terminal
                case "ACID":
                    return styles.acid
                default:
                    return
            }
        }

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

        return (
            <Draggable
                handle=".handle"
                bounds="body"
                defaultPosition={{ x: xPos, y: yPos }}
                {...dragHandlers}
            >
                <div
                    className={`${styles.modal} ${
                        styles.settingsModal
                    } ${cssSwitch(this.props.theme)} ${
                        this.props.isSettingsOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    } `}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                    onClick={this.props.onIncZIndex}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>Settings</span>
                        <svg
                            width="12"
                            className={styles.close}
                            onMouseDown={onClickClose}
                            onClick={this.props.onSettingsClose}
                            viewBox="0 0 32.78 32.78"
                        >
                            <rect
                                className={styles.xPath}
                                x="-2.61"
                                y="12.21"
                                width="38"
                                height="8.36"
                                transform="translate(16.39 -6.79) rotate(45)"
                            />
                            <rect
                                className={styles.xPath}
                                x="-2.61"
                                y="12.21"
                                width="38"
                                height="8.36"
                                transform="translate(39.57 16.39) rotate(135)"
                            />
                        </svg>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.togglesContainer}>
                            <div className={styles.toggleContainer}>
                                <label>
                                    <Toggle
                                        defaultChecked={true}
                                        icons={false}
                                        className={toggleCssSwitch(
                                            this.props.theme
                                        )}
                                        onChange={this.props.onToggleAnimating}
                                    />
                                    <h3>Animation</h3>
                                </label>
                            </div>
                            <div className={styles.toggleContainer}>
                                <label>
                                    <Toggle
                                        defaultChecked={true}
                                        icons={false}
                                        className={toggleCssSwitch(
                                            this.props.theme
                                        )}
                                        onChange={this.props.onToggleFXAA}
                                    />
                                    <h3>FXAA</h3>
                                </label>
                            </div>
                            <div className={styles.toggleContainer}>
                                <label>
                                    <Toggle
                                        defaultChecked={true}
                                        icons={false}
                                        className={toggleCssSwitch(
                                            this.props.theme
                                        )}
                                        onChange={this.props.onToggleRendering}
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
                                <span>{this.props.gpu.gpu}</span>
                            </div>
                            <div className={styles.settingsTitle}>
                                <h2>Screen Size</h2>
                            </div>
                            <div className={styles.settingsDesc}>
                                <span>{`${innerWidth} x ${innerHeight}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        isSettingsOpen: state.isSettingsOpen,
        zIndex: state.zIndexes.settings,
        rendering: state.rendering,
        animating: state.animating,
        gpu: state.gpu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSettingsClose: () => dispatch({ type: "CLOSE_SETTINGS" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_SETTINGS" }),
        onToggleRendering: () => dispatch({ type: "TOGGLE_RENDERING" }),
        onToggleAnimating: () => dispatch({ type: "TOGGLE_ANIMATING" }),
        onToggleFXAA: () => dispatch({ type: "TOGGLE_FXAA" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
