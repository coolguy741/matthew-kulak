import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../assets/images/x.svg"
import styles from "../../../styles/modals.module.scss"

class About extends React.Component {
    render() {
        return (
            <Draggable handle=".handle" bounds="body">
                <div
                    className={`${
                        this.props.isAboutOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{ zIndex: this.props.zIndex }}
                >
                    <div className={styles.modal}>
                        <div className={`${styles.modalBar} handle`}>
                            <span className={styles.heading}>About</span>
                            <img
                                className={styles.close}
                                onClick={this.props.onAboutClose}
                                src={x}
                                width={12}
                            />
                        </div>
                        <div className={styles.body}>
                            <p>
                                FRMR is a designer, developer and music producer
                                based in Canada.
                            </p>
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
