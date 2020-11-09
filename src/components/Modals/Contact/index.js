import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../assets/images/x.svg"
import github from "../../../assets/images/github.svg"
import mail from "../../../assets/images/mail.svg"
import twitter from "../../../assets/images/twitter.svg"
import styles from "../../../styles/modals.module.scss"

class Contact extends React.Component {
    render() {
        return (
            <Draggable handle=".handle" bounds="body">
                <div
                    className={`${
                        this.props.isContactOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{ zIndex: this.props.zIndex }}
                >
                    <div className={styles.modal}>
                        <div className={`${styles.modalBar} handle`}>
                            <span className={styles.heading}>Contact</span>
                            <img
                                className={styles.close}
                                onClick={this.props.onContactClose}
                                src={x}
                                width={12}
                            />
                        </div>
                        <div className={styles.body}>
                            <ul className={styles.ul}>
                                <li>
                                    <a href="mailto:frmr@frmr.dev">
                                        <img
                                            src={mail}
                                            className={styles.mail}
                                            width={16}
                                        />{" "}
                                        frmr@frmr.dev
                                    </a>
                                </li>
                                <li>
                                    <span>
                                        <a
                                            href="https://twitter.com/frmr_"
                                            target="_blank"
                                        >
                                            <img src={twitter} width={19} />{" "}
                                            @frmr_
                                        </a>
                                    </span>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/frmr1"
                                        target="_blank"
                                    >
                                        <img src={github} width={18} /> @frmr1
                                    </a>
                                </li>
                            </ul>
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
        isContactOpen: state.isContactOpen,
        zIndex: state.zIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onContactClose: () => dispatch({ type: "CLOSE_CONTACT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
