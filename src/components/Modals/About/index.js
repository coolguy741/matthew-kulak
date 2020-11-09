import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../assets/images/x.svg"
import styles from "../../../styles/modals.module.scss"

class About extends React.Component {
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
                        this.props.isAboutOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                        width: width,
                    }}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>About</span>
                        <img
                            className={styles.close}
                            onClick={this.props.onAboutClose}
                            src={x}
                            width={12}
                        />
                    </div>
                    <div className={styles.body} style={{ height: height }}>
                        <p>
                            FRMR is a designer, developer and music producer
                            based in Canada.
                        </p>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
        isAboutOpen: state.isAboutOpen,
        zIndex: state.zIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAboutClose: () => dispatch({ type: "CLOSE_ABOUT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
