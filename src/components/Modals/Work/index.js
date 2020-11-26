import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import X from "../../../assets/images/svg/x.svg"
import XWhite from "../../../assets/images/svg/x-white.svg"
import Cadillac from "../../../assets/images/svg/cadillac.svg"
import Gnos from "../../../assets/images/svg/gnos.svg"
import GnosWhite from "../../../assets/images/svg/gnos-white.svg"
import Tripwire from "../../../assets/images/svg/tripwire.svg"
import styles from "../../../styles/modals.module.scss"

class Work extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 4
        const height = this.props.height / 2

        const xPos = Math.random() * (this.props.width - width)
        const yPos = Math.random() * (this.props.height - height - 135) // Screen height minus modal, toolbars

        const onClickGNOS = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onGNOSOpen()
            this.props.onIncZIndexGNOS()
        }

        const onClickCadillac = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onCadillacOpen()
            this.props.onIncZIndexCadillac()
        }

        const onClickTripwire = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onTripwireOpen()
            this.props.onIncZIndexTripwire()
        }

        const dragHandlers = { onStart: this.onStart }

        const cssSwitch = param => {
            switch (param) {
                case "LIGHT":
                    return styles.light
                case "DARK":
                    return styles.dark
                case "GREY":
                    return styles.grey
                default:
                    return
            }
        }

        const xSwitch = param => {
            switch (param) {
                case "DARK":
                    return (
                        <XWhite
                            className={styles.close}
                            onClick={this.props.onWorkClose}
                            width={12}
                        />
                    )
                case "GREY":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onWorkClose}
                            width={12}
                        />
                    )
                case "LIGHT":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onWorkClose}
                            width={12}
                        />
                    )
                default:
                    return
            }
        }

        const gnosSwitch = param => {
            switch (param) {
                case "DARK":
                    return <GnosWhite width={60} />
                case "GREY":
                    return <Gnos width={60} />
                case "LIGHT":
                    return <Gnos width={60} />
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
                    className={`${styles.modal} ${cssSwitch(
                        this.props.theme
                    )} ${
                        this.props.isWorkOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                    onClick={this.props.onIncZIndex}
                >
                    <div
                        className={`${styles.modalBar} ${
                            this.props.isDarkMode ? styles.modalBardark : ""
                        } handle`}
                    >
                        <span className={styles.heading}>Work</span>
                        {xSwitch(this.props.theme)}
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <div className={styles.workIcons}>
                            <div
                                className={styles.workIcon}
                                onClick={onClickGNOS}
                            >
                                {gnosSwitch(this.props.theme)}
                                <br />
                                <span>GNOS</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={onClickCadillac}
                            >
                                <Cadillac width={60} />
                                <br />
                                <span>Cadillac</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={onClickTripwire}
                            >
                                <Tripwire width={60} />
                                <br />
                                <span>Tripwire</span>
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
        isWorkOpen: state.isWorkOpen,
        zIndex: state.zIndexes.work,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWorkClose: () => dispatch({ type: "CLOSE_WORK" }),
        onGNOSOpen: () => dispatch({ type: "OPEN_GNOS" }),
        onCadillacOpen: () => dispatch({ type: "OPEN_CADILLAC" }),
        onTripwireOpen: () => dispatch({ type: "OPEN_TRIPWIRE" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_WORK" }),
        onIncZIndexGNOS: () => dispatch({ type: "INC_Z_GNOS" }),
        onIncZIndexCadillac: () => dispatch({ type: "INC_Z_CADILLAC" }),
        onIncZIndexTripwire: () => dispatch({ type: "INC_Z_TRIPWIRE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)
