import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import X from "../../../../assets/images/svg/x.svg"
import XWhite from "../../../../assets/images/svg/x-white.svg"
import GnosSVG from "../../../../assets/images/svg/gnos.svg"
import GnosWhite from "../../../../assets/images/svg/gnos-white.svg"
import styles from "../../../../styles/modals.module.scss"

class GNOS extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 3
        const height = this.props.height / 1.5

        const xPos = Math.random() * (this.props.width - width)
        const yPos = Math.random() * (this.props.height - height - 135) // Screen height minus modal, toolbars

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
                            onClick={this.props.onGnosClose}
                            width={12}
                        />
                    )
                case "GREY":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onGnosClose}
                            width={12}
                        />
                    )
                case "LIGHT":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onGnosClose}
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
                    return <GnosWhite width={120} />
                case "GREY":
                    return <GnosSVG width={120} />
                case "LIGHT":
                    return <GnosSVG width={120} />
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
                        this.props.isGNOSOpen
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
                        <span className={styles.heading}>GNOS</span>
                        {xSwitch(this.props.theme)}
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        {gnosSwitch(this.props.theme)}
                        <p>
                            GNOS is a clothing brand founded and operated by
                            FRMR.
                        </p>
                        <h4>Tech Stack</h4>
                        <ul className={styles.tech}>
                            <li>
                                <span>React</span>
                            </li>
                            <li>
                                <span>Next.js</span>
                            </li>
                            <li>
                                <span>GraphQL</span>
                            </li>
                            <li>
                                <span>Apollo Server/Client</span>
                            </li>
                        </ul>
                        <div className={styles.btnContainer}>
                            <a className={styles.btn} href="#" target="_blank">
                                View Live
                            </a>
                            <a className={styles.btn} href="#" target="_blank">
                                View Source
                            </a>
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
        isGNOSOpen: state.isGNOSOpen,
        zIndex: state.zIndexes.gnos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGnosClose: () => dispatch({ type: "CLOSE_GNOS" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_GNOS" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GNOS)
