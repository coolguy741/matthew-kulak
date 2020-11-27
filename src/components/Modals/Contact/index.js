import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
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
                        <svg
                            width="12"
                            className={styles.close}
                            onClick={this.props.onContactClose}
                            viewBox="0 0 32.78 32.78"
                        >
                            <rect
                                className={styles.xPath}
                                x="-2.61"
                                y="12.21"
                                width="38"
                                height="8.36"
                                transform="translate(16.39 -6.79) rotate(45)"
                            />
                            <rect
                                className={styles.xPath}
                                x="-2.61"
                                y="12.21"
                                width="38"
                                height="8.36"
                                transform="translate(39.57 16.39) rotate(135)"
                            />
                        </svg>
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <ul className={styles.contact}>
                            <li>
                                <a href="mailto:frmr@frmr.dev">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 384"
                                        className={styles.mail}
                                        width="16"
                                    >
                                        <path
                                            className={styles.mailPath}
                                            d="M464,64H48A48.05,48.05,0,0,0,0,112V400a48.05,48.05,0,0,0,48,48H464a48.05,48.05,0,0,0,48-48V112A48.05,48.05,0,0,0,464,64Zm0,32a15.91,15.91,0,0,1,6.13,1.24L256,282.83,41.87,97.24A15.93,15.93,0,0,1,48,96H464Zm0,320H48a16,16,0,0,1-16-16V131l213.52,185a16,16,0,0,0,21,0L480,131V400A16,16,0,0,1,464,416Z"
                                            transform="translate(0 -64)"
                                        />
                                    </svg>{" "}
                                    frmr@frmr.dev
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/frmr_"
                                    target="_blank"
                                >
                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 250 203.1"
                                        width="19"
                                    >
                                        {/* <rect
                                            x="-75"
                                            y="-98.5"
                                            class="twitterst0"
                                            width="400"
                                            height="400"
                                        /> */}
                                        <path
                                            className={styles.twitterPath}
                                            d="M78.6,203.1c94.3,0,145.9-78.2,145.9-145.9c0-2.2,0-4.4-0.1-6.6c10-7.3,18.7-16.3,25.6-26.5
                                            c-9.4,4.1-19.3,6.9-29.5,8.1c10.7-6.4,18.7-16.5,22.5-28.4c-10.1,6-21.1,10.2-32.6,12.4c-19.4-20.7-51.9-21.7-72.6-2.2
                                            c-13.3,12.5-19,31.2-14.8,49C81.9,60.9,43.4,41.4,17.4,9.4C3.8,32.8,10.7,62.8,33.3,77.8c-8.2-0.2-16.1-2.4-23.3-6.4
                                            c0,0.2,0,0.4,0,0.6c0,24.4,17.2,45.4,41.2,50.3c-7.6,2.1-15.5,2.4-23.2,0.9c6.7,20.9,26,35.2,47.9,35.6c-18.2,14.3-40.6,22-63.7,22
                                            c-4.1,0-8.2-0.3-12.2-0.7C23.5,195.2,50.7,203.1,78.6,203.1"
                                        />
                                    </svg>{" "}
                                    @frmr_
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/frmr1"
                                    target="_blank"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32.58 31.77"
                                        width="18"
                                    >
                                        <path
                                            className={styles.githubPath}
                                            d="M16.29,0a16.29,16.29,0,0,0-5.15,31.75A0.82,0.82,0,0,0,12.25,31c0-.39,0-1.41,0-2.77C7.7,29.18,6.74,26,6.74,26a4.31,4.31,0,0,0-1.81-2.38c-1.48-1,.11-1,0.11-1a3.42,3.42,0,0,1,2.5,1.68,3.47,3.47,0,0,0,4.74,1.35,3.48,3.48,0,0,1,1-2.18C9.7,23.08,5.9,21.68,5.9,15.44a6.3,6.3,0,0,1,1.68-4.37,5.86,5.86,0,0,1,.16-4.31s1.37-.44,4.48,1.67a15.44,15.44,0,0,1,8.16,0c3.11-2.11,4.48-1.67,4.48-1.67A5.85,5.85,0,0,1,25,11.07a6.29,6.29,0,0,1,1.67,4.37c0,6.26-3.81,7.63-7.44,8a3.89,3.89,0,0,1,1.11,3c0,2.18,0,3.93,0,4.47a0.82,0.82,0,0,0,1.12.78A16.29,16.29,0,0,0,16.29,0Z"
                                        />
                                    </svg>{" "}
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
