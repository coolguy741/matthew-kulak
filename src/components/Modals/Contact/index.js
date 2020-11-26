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

        const cssSwitch = param => {
            switch (param) {
                case "LIGHT":
                    return styles.light
                case "DARK":
                    return styles.dark
                case "GREY":
                    return styles.grey
                default:
                    return
            }
        }

        const xSwitch = param => {
            switch (param) {
                case "DARK":
                    return (
                        <XWhite
                            className={styles.close}
                            onClick={this.props.onContactClose}
                            width={12}
                        />
                    )
                case "GREY":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onContactClose}
                            width={12}
                        />
                    )
                case "LIGHT":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onContactClose}
                            width={12}
                        />
                    )
                default:
                    return
            }
        }

        const mailSwitch = param => {
            switch (param) {
                case "DARK":
                    return <MailWhite className={styles.mail} width={16} />
                case "GREY":
                    return <Mail className={styles.mail} width={16} />
                case "LIGHT":
                    return <Mail className={styles.mail} width={16} />
                default:
                    return
            }
        }

        const twitterSwitch = param => {
            switch (param) {
                case "DARK":
                    return <TwitterWhite width={19} />
                case "GREY":
                    return <Twitter width={19} />
                case "LIGHT":
                    return <Twitter width={19} />
                default:
                    return
            }
        }

        const githubSwitch = param => {
            switch (param) {
                case "DARK":
                    return <GithubWhite width={18} />
                case "GREY":
                    return <Github width={18} />
                case "LIGHT":
                    return <Github width={18} />
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
                        className={`${styles.modalBar} ${cssSwitch(
                            this.props.theme
                        )} handle`}
                    >
                        <span className={styles.heading}>Contact</span>
                        {xSwitch(this.props.theme)}
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <ul className={styles.contact}>
                            <li>
                                <a href="mailto:frmr@frmr.dev">
                                    {mailSwitch(this.props.theme)} frmr@frmr.dev
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/frmr_"
                                    target="_blank"
                                >
                                    {twitterSwitch(this.props.theme)} @frmr_
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/frmr1"
                                    target="_blank"
                                >
                                    {githubSwitch(this.props.theme)} @frmr1
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
        theme: state.theme,
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
