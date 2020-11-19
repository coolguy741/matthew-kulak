import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../../assets/images/x.svg"
import xWhite from "../../../../assets/images/x-white.svg"
import gnos from "../../../../assets/images/gnos.svg"
import gnosWhite from "../../../../assets/images/gnos-white.svg"
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

        return (
            <Draggable
                handle=".handle"
                bounds="body"
                defaultPosition={{ x: xPos, y: yPos }}
                {...dragHandlers}
            >
                <div
                    className={`${styles.modal} ${
                        this.props.isDarkMode ? styles.modaldark : ""
                    } ${
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
                        <img
                            className={styles.close}
                            onClick={this.props.onGNOSClose}
                            src={this.props.isDarkMode ? xWhite : x}
                            width={12}
                        />
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <img
                            src={this.props.isDarkMode ? gnosWhite : gnos}
                            width={120}
                        />
                        <p>
                            GNOS is a clothing brand founded and operated by
                            FRMR.
                        </p>
                        <h4>Tech Stack</h4>
                        <ul>
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
        isDarkMode: state.darkMode,
        isGNOSOpen: state.isGNOSOpen,
        zIndex: state.zIndexes.gnos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGNOSClose: () => dispatch({ type: "CLOSE_GNOS" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_GNOS" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GNOS)
