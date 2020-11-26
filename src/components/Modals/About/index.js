import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import X from "../../../assets/images/svg/x.svg"
import XWhite from "../../../assets/images/svg/x-white.svg"
import Logo from "../../../assets/images/svg/logo.svg"
import LogoWhite from "../../../assets/images/svg/logo-white.svg"
import Github from "../../../assets/images/svg/github.svg"
import GithubWhite from "../../../assets/images/svg/github-white.svg"
import Mail from "../../../assets/images/svg/mail.svg"
import MailWhite from "../../../assets/images/svg/mail-white.svg"
import Twitter from "../../../assets/images/svg/twitter.svg"
import TwitterWhite from "../../../assets/images/svg/twitter-white.svg"
import styles from "../../../styles/modals.module.scss"

class About extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 3
        const height = this.props.height / 1.5

        const d = new Date()
        const year = d.getFullYear()

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
                            onClick={this.props.onAboutClose}
                            width={12}
                        />
                    )
                case "GREY":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onAboutClose}
                            width={12}
                        />
                    )
                case "LIGHT":
                    return (
                        <X
                            className={styles.close}
                            onClick={this.props.onAboutClose}
                            width={12}
                        />
                    )
                default:
                    return
            }
        }

        const logoSwitch = param => {
            switch (param) {
                case "DARK":
                    return <LogoWhite width={80} />
                case "GREY":
                    return <Logo width={80} />
                case "LIGHT":
                    return <Logo width={80} />
                default:
                    return
            }
        }

        const mailSwitch = param => {
            switch (param) {
                case "DARK":
                    return <MailWhite className={styles.mail} width={19} />
                case "GREY":
                    return <Mail className={styles.mail} width={19} />
                case "LIGHT":
                    return <Mail className={styles.mail} width={19} />
                default:
                    return
            }
        }

        const twitterSwitch = param => {
            switch (param) {
                case "DARK":
                    return <TwitterWhite width={20} />
                case "GREY":
                    return <Twitter width={20} />
                case "LIGHT":
                    return <Twitter width={20} />
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
                        this.props.isAboutOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    } `}
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
                        <span className={styles.heading}>About</span>
                        {xSwitch(this.props.theme)}
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <div className={styles.aboutLogoContainer}>
                            {logoSwitch(this.props.theme)}
                        </div>
                        <div className={styles.about}>
                            <div className={styles.aboutTitle}>
                                <h2>Class</h2>
                            </div>
                            <div className={styles.aboutDesc}>
                                <span>Developer/designer</span>
                            </div>
                            <div className={styles.aboutTitle}>
                                <h2>Location</h2>
                            </div>
                            <div className={styles.aboutDesc}>
                                <span>Canada</span>
                            </div>
                            <div className={styles.aboutTitle}>
                                <h2>Status</h2>
                            </div>
                            <div
                                className={`${styles.aboutDesc} ${styles.status}`}
                            >
                                <span>Available</span>
                            </div>
                            <div
                                className={`${styles.aboutTitle} ${styles.connect}`}
                            >
                                <h2>Connect</h2>
                            </div>
                            <div
                                className={`${styles.aboutDesc} ${styles.connect}`}
                            >
                                <a href="mailto:frmr@frmr.dev">
                                    {mailSwitch(this.props.theme)}
                                </a>
                                <a
                                    href="https://twitter.com/frmr_"
                                    target="_blank"
                                >
                                    {twitterSwitch(this.props.theme)}
                                </a>
                                <a
                                    href="https://github.com/frmr1"
                                    target="_blank"
                                >
                                    {githubSwitch(this.props.theme)}
                                </a>
                            </div>
                            <span className={styles.copyright}>
                                ©{year} FRMR.
                            </span>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        isAboutOpen: state.isAboutOpen,
        zIndex: state.zIndexes.about,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAboutClose: () => dispatch({ type: "CLOSE_ABOUT" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_ABOUT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
