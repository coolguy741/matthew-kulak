import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../../assets/images/x.svg"
import styles from "../../../../styles/modals.module.scss"

class GNOS extends React.Component {
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
                        this.props.isGNOSOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>GNOS</span>
                        <img
                            className={styles.close}
                            onClick={this.props.onGNOSClose}
                            src={x}
                            width={12}
                        />
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <p>GNOS is a sick clothing brand.</p>
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
        zIndex: state.zIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGNOSClose: () => dispatch({ type: "CLOSE_GNOS" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GNOS)
