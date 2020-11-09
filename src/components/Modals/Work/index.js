import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../assets/images/x.svg"
import cadillac from "../../../assets/images/cadillac.svg"
import gnos from "../../../assets/images/gnos.svg"
import tripwire from "../../../assets/images/tripwire.svg"
import styles from "../../../styles/modals.module.scss"

class Work extends React.Component {
    render() {
        const width = this.props.width / 4
        const height = this.props.height / 2

        const xPos = Math.random() * (this.props.width - width)
        const yPos = Math.random() * (this.props.height - height - 135) // Screen height minus modal, toolbars

        return (
            <Draggable
                handle=".handle"
                bounds="body"
                defaultPosition={{ x: xPos, y: yPos }}
            >
                <div
                    className={`${styles.modal} ${
                        this.props.isWorkOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>Work</span>
                        <img
                            className={styles.close}
                            onClick={this.props.onWorkClose}
                            src={x}
                            width={12}
                        />
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <div className={styles.workIcons}>
                            <div
                                className={styles.workIcon}
                                onClick={this.props.onGNOSOpen}
                            >
                                <img src={gnos} width={60} />
                                <br />
                                <span>GNOS</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={this.props.onCadillacOpen}
                            >
                                <img src={cadillac} width={60} />
                                <br />
                                <span>Cadillac</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={this.props.onTripwireOpen}
                            >
                                <img src={tripwire} width={60} />
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
        isDarkMode: state.darkMode,
        isWorkOpen: state.isWorkOpen,
        zIndex: state.zIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWorkClose: () => dispatch({ type: "CLOSE_WORK" }),
        onGNOSOpen: () => dispatch({ type: "OPEN_GNOS" }),
        onCadillacOpen: () => dispatch({ type: "OPEN_CADILLAC" }),
        onTripwireOpen: () => dispatch({ type: "OPEN_TRIPWIRE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)
