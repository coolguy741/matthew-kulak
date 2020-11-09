import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../assets/images/x.svg"
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
                        width: width,
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
                    <div className={styles.body} style={{ height: height }}>
                        <p>TRIPWIRE CADILLAC GNOS CLOTHING</p>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)
