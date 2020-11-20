import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import X from "../../../assets/images/svg/x.svg"
import XWhite from "../../../assets/images/svg/x-white.svg"
import Github from "../../../assets/images/svg/github.svg"
import GithubWhite from "../../../assets/images/svg/github-white.svg"
import Mail from "../../../assets/images/svg/mail.svg"
import MailWhite from "../../../assets/images/svg/mail-white.svg"
import Twitter from "../../../assets/images/svg/twitter.svg"
import TwitterWhite from "../../../assets/images/svg/twitter-white.svg"
import styles from "../../../styles/modals.module.scss"

class Contact extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 4.5
        const height = this.props.height / 4

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
                        this.props.isContactOpen
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
                        <span className={styles.heading}>Contact</span>
                        {this.props.isDarkMode ? (
                            <X
                                className={styles.close}
                                onClick={this.props.onContactClose}
                                width={12}
                            />
                        ) : (
                            <XWhite
                                className={styles.close}
                                onClick={this.props.onContactClose}
                                width={12}
                            />
                        )}
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <ul className={styles.contact}>
                            <li>
                                <a href="mailto:frmr@frmr.dev">
                                    {this.props.isDarkMode ? (
                                        <MailWhite
                                            className={styles.mail}
                                            width={16}
                                        />
                                    ) : (
                                        <Mail
                                            className={styles.mail}
                                            width={16}
                                        />
                                    )}{" "}
                                    frmr@frmr.dev
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/frmr_"
                                    target="_blank"
                                >
                                    {this.props.isDarkMode ? (
                                        <TwitterWhite width={19} />
                                    ) : (
                                        <Twitter width={19} />
                                    )}{" "}
                                    @frmr_
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/frmr1"
                                    target="_blank"
                                >
                                    {this.props.isDarkMode ? (
                                        <GithubWhite width={18} />
                                    ) : (
                                        <Github width={18} />
                                    )}{" "}
                                    @frmr1
                                </a>
                            </li>
                        </ul>
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
        zIndex: state.zIndexes.contact,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onContactClose: () => dispatch({ type: "CLOSE_CONTACT" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_CONTACT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
