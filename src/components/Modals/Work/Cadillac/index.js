import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import CadillacSVG from "../../../../assets/images/svg/cadillac.svg"
import styles from "../../../../styles/modals.module.scss"

class Cadillac extends React.Component {
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
                case "TERMINAL":
                    return styles.terminal
                case "ACID":
                    return styles.acid
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
                        this.props.isCadillacOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                    onClick={this.props.onIncZIndex}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>Cadillac</span>
                        <svg
                            width="12"
                            className={styles.close}
                            onClick={this.props.onCadillacClose}
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
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <CadillacSVG width={120} />
                        <p>The Cadillac website is built using Three.js.</p>
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
        isCadillacOpen: state.isCadillacOpen,
        zIndex: state.zIndexes.cadillac,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCadillacClose: () => dispatch({ type: "CLOSE_CADILLAC" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_CADILLAC" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cadillac)
