import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import X from "../../../assets/images/svg/x.svg"
import XWhite from "../../../assets/images/svg/x-white.svg"
import MainLogo from "../../../assets/images/svg/logo.svg"
import WhiteLogo from "../../../assets/images/svg/logo-white.svg"
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
                        className={`${styles.modalBar} ${
                            this.props.isDarkMode ? styles.modalBardark : ""
                        } handle`}
                    >
                        <span className={styles.heading}>About</span>
                        {this.props.isDarkMode ? (
                            <X
                                className={styles.close}
                                onClick={this.props.onAboutClose}
                                width={12}
                            />
                        ) : (
                            <XWhite
                                className={styles.close}
                                onClick={this.props.onAboutClose}
                                width={12}
                            />
                        )}
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <div className={styles.aboutLogoContainer}>
                            {this.props.isDarkMode ? (
                                <WhiteLogo width={80} />
                            ) : (
                                <MainLogo width={80} />
                            )}
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
                                    {this.props.isDarkMode ? (
                                        <MailWhite
                                            className={styles.mail}
                                            width={19}
                                        />
                                    ) : (
                                        <Mail
                                            className={styles.mail}
                                            width={19}
                                        />
                                    )}
                                </a>
                                <a
                                    href="https://twitter.com/frmr_"
                                    target="_blank"
                                >
                                    {this.props.isDarkMode ? (
                                        <TwitterWhite width={20} />
                                    ) : (
                                        <Twitter width={20} />
                                    )}
                                </a>
                                <a
                                    href="https://github.com/frmr1"
                                    target="_blank"
                                >
                                    {this.props.isDarkMode ? (
                                        <GithubWhite width={18} />
                                    ) : (
                                        <Github width={18} />
                                    )}
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
        isDarkMode: state.darkMode,
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
