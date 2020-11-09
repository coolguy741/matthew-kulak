import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../../assets/images/x.svg"
import styles from "../../../../styles/modals.module.scss"

class Cadillac extends React.Component {
    render() {
        const width = this.props.width / 3
        const height = this.props.height / 1.5

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
                        this.props.isCadillacOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>Cadillac</span>
                        <img
                            className={styles.close}
                            onClick={this.props.onCadillacClose}
                            src={x}
                            width={12}
                        />
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <p>Cadillac is a sick clothing brand.</p>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
        isCadillacOpen: state.isCadillacOpen,
        zIndex: state.zIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCadillacClose: () => dispatch({ type: "CLOSE_CADILLAC" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cadillac)
