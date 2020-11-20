import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import X from "../../../assets/images/svg/x.svg"
import XWhite from "../../../assets/images/svg/x-white.svg"
import MainLogo from "../../../assets/images/svg/logo.svg"
import WhiteLogo from "../../../assets/images/svg/logo-white.svg"
import styles from "../../../styles/modals.module.scss"

class About extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 3
        const height = this.props.height / 1.5

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
                        {this.props.isDarkMode ? (
                            <WhiteLogo width={150} />
                        ) : (
                            <MainLogo width={150} />
                        )}
                        <p>FRMR is a developer and designer based in Canada.</p>
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
