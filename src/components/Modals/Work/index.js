import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import Cadillac from "../../../assets/images/svg/cadillac.svg"
import Tripwire from "../../../assets/images/svg/tripwire.svg"
import styles from "../../../styles/modals.module.scss"

class Work extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 4
        const height = this.props.height / 2

        const xPos = Math.random() * (this.props.width - width)
        const yPos = Math.random() * (this.props.height - height - 135) // Screen height minus modal, toolbars

        const onClickGNOS = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onGNOSOpen()
            this.props.onIncZIndexGNOS()
        }

        const onClickCadillac = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onCadillacOpen()
            this.props.onIncZIndexCadillac()
        }

        const onClickTripwire = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onTripwireOpen()
            this.props.onIncZIndexTripwire()
        }

        const onClickDesign = e => {
            e.stopPropagation() // Stop onClick event (z-index inc) of parent (work modal)
            this.props.onDesignOpen()
            this.props.onIncZIndexDesign()
        }

        const onClickClose = e => {
            e.stopPropagation() // Stop z-index increment on mouse down if closing modal
        }

        const dragHandlers = { onStart: this.onStart }

        const cssSwitch = param => {
            switch (param) {
                case "LIGHT":
                    return styles.light
                case "DARK":
                    return styles.dark
                case "GREY":
                    return styles.grey
                case "TERMINAL":
                    return styles.terminal
                case "ACID":
                    return styles.acid
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
                        this.props.isWorkOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                    onClick={this.props.onIncZIndex}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>Work</span>
                        <svg
                            width="12"
                            className={styles.close}
                            onMouseDown={onClickClose}
                            onClick={this.props.onWorkClose}
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
                        <div className={styles.workIcons}>
                            <div
                                className={styles.workIcon}
                                onClick={onClickGNOS}
                            >
                                <svg
                                    version="1.1"
                                    viewBox="0 0 130 120"
                                    width="60"
                                >
                                    <path
                                        className={styles.gnosPathDark}
                                        d="M49.1,102.9c-1.3-0.7-5.3-8.1-5.3-8.1s1.8,6.2,1.4,10.5h6.7C51.3,104.2,50.3,103.4,49.1,102.9z"
                                    />
                                    <path
                                        className={styles.gnosPathLight}
                                        d="M7,117.1c-3.7,0.1-6.9-2.8-7-6.6c0-1.3,0.3-2.5,0.9-3.6L59,6.4c1.9-3.3,6.2-4.5,9.5-2.5
                                        c1.1,0.6,1.9,1.5,2.5,2.5l58,100.5c1.2,2.1,1.2,4.7,0,6.8c-1.3,2.1-3.6,3.4-6,3.3L7,117.1L7,117.1z"
                                    />
                                    <path
                                        className={styles.gnosPathDark}
                                        d="M124.4,109.5L66.4,9c-0.4-0.8-1.4-1-2.2-0.6C64,8.6,63.8,8.8,63.6,9l-58,100.4c-0.4,0.7-0.2,1.6,0.5,2
	                                     c0.3,0.2,0.5,0.2,0.8,0.2H123c0.8,0.1,1.5-0.6,1.6-1.4C124.6,110,124.5,109.7,124.4,109.5z"
                                    />
                                    <path
                                        className={styles.gnosPathDark}
                                        d="M19.9,105.2L19.9,105.2z"
                                    />
                                    <path
                                        className={styles.gnosPathLight}
                                        d="M45.3,105.2c0.4-4.3-1.4-10.4-1.4-10.4s3.9,7.3,5.3,8c1.2,0.5,2.1,1.3,2.8,2.4h30.8c0.3-1.1,0.5-3.2,0.8-4.8
                                        c0.1-0.7,0.2-1.2,0.3-1.8c-0.4-3-1.1-5.8-3.6-7.8c-1.4,0.8-1.4-0.2-2.2,1.2c-0.2,0.3-1.8,1.9-2,2.2c-1.2,2.2-2.9,4.1-5,5.4
                                        c-1.5,0.9-6.5,2.7-6.5,2.7c-0.4,0-1.9,0-2.2,0c-2.5-0.4-3.5-1.4-5.1-2.6c-0.6-0.5-3.1-1.6-3.5-2.2c-0.6-1-6.2-5.9-5.8-7.2
                                        c0.3,0.1,9,5,9.3,4.9l3.1,0.2l3.2-0.2l0,0c2.3-2-1.1-4.1,0.1-6.1h2l1.8-0.4c1-0.7,1.9-1.5,2.7-2.3c0.8-0.9,1.8-2,0.7-3.2
                                        c-0.8-0.7-2.1-0.7-2.9,0c-5.8,3.9-9.1,0.9-11.8-4.9c-1.1,2.3-1.6,4.9-3.1,6.2C52.2,85.2,51,85.5,49,85c-1.4-0.3-2.2,0.7-3.2,1.3
                                        c0,0-4.4,1.8-5.6,0.6c-1.1-1.2-1-6.6-1.1-8.4l1.1-4.3l0.1-1.1c0.4-0.7,0.3-2.2,1.1-2.2c3.1-0.2,5.4-3.3,8.3-2.6
                                        c4.5-0.9,7.1-1.8,11.8-3.1c4.2-1,6.9-2.7,11.5-2.2c0.8,0.1,1.6,0.3,2.3,0.5c0.7,0.3,1.8,0.8,2.8,1.1c0-0.3,0-0.6,0-0.8l-0.2-2
                                        l-0.5-0.1c-4.5-0.8-7-3.4-6.6-6.1c0-0.5,0.1-1,0.2-1.4c0.2-0.5,6-7.2,6-7.2c0.8-1,1.5-2,2.2-3L65,19.6L40.3,62.4l-24.8,42.8H45.3z"
                                    />
                                    <path
                                        className={styles.gnosPathR}
                                        d="M91.2,13h-2.3V6.1H90v2.7h1.6l1.2-2.7h1.3l-1.4,3c0.4,0.2,0.6,0.4,0.9,0.7c0.2,0.3,0.3,0.7,0.3,1.1
                                        c0,0.2,0,0.5-0.1,0.7c-0.1,0.2-0.2,0.5-0.4,0.7c-0.2,0.2-0.5,0.4-0.8,0.5C92.1,12.9,91.6,13,91.2,13z M91.3,9.7H90V12h1.2
                                        c0.2,0,0.5,0,0.7-0.1c0.2,0,0.3-0.1,0.5-0.2c0.1-0.1,0.2-0.2,0.2-0.3c0.1-0.1,0.1-0.3,0.1-0.4c0-0.2,0-0.3-0.1-0.5
                                        c0-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.3-0.2-0.4-0.2C91.7,9.8,91.5,9.8,91.3,9.7L91.3,9.7z"
                                    />
                                    <path
                                        className={styles.gnosPathR}
                                        d="M86.7,12.9c-1.8-2.4-1.3-5.9,1.2-7.7c1.9-1.4,4.6-1.4,6.5,0l0.8-0.8c-2.8-2.3-7-1.8-9.3,1c-2,2.4-2,5.9,0,8.3
	                                     L86.7,12.9z"
                                    />
                                    <path
                                        className={styles.gnosPathR}
                                        d="M96.3,5.4l-0.8,0.8c1.8,2.5,1.2,5.9-1.3,7.7c-1.9,1.4-4.5,1.4-6.4,0L87,14.7c2.9,2.2,7,1.7,9.3-1.2
	                                    C98.1,11.1,98.1,7.8,96.3,5.4z"
                                    />
                                </svg>
                                <br />
                                <span>GNOS</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={onClickCadillac}
                            >
                                <Cadillac width={60} />
                                <br />
                                <span>Cadillac</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={onClickTripwire}
                            >
                                <svg
                                    version="1.1"
                                    width="60"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 130 120"
                                >
                                    <g>
                                        <path
                                            className={styles.tripwirePath}
                                            d="M36.6,47.1H22v31.5c0,3.7,1.8,4.4,6.3,4.4h8c1-0.2,1.9,0.3,2.2,1.3c0,0.2,0.1,0.3,0.1,0.5v8.2
                                            c0,1.2-1,2.1-2.1,2.1c-4.2,0.6-8.5,1-12.7,0.9C11.7,96,4.7,92.3,4.7,78.5V25.2c0.1-1.1,1-2.1,2.1-2.1l13-2.2h0.3
                                            c1.1,0.1,1.9,1,1.9,2.1v11.2h14.5c1.2,0,2.1,1,2.1,2.2c0,0,0,0,0,0v8.5C38.7,46,37.8,47,36.6,47.1C36.6,47.1,36.6,47.1,36.6,47.1z"
                                        />
                                        <path
                                            className={styles.tripwirePath}
                                            d="M100.6,96c-5.7,0.3-11.4-0.9-16.5-3.6c-5.1,2.7-10.8,3.9-16.5,3.6c-13.3,0-24.6-7-24.6-26.8V36.3
                                            c0-1.2,1-2.2,2.2-2.2H58c1.2,0,2.1,1,2.1,2.2c0,0,0,0,0,0v32.9c0,9.9,3.8,11.5,9.3,11.5c2,0.1,4.1-0.2,6.1-0.8V36.4
                                            c0-1.2,0.9-2.2,2.1-2.3h13.1c1.2,0.1,2.1,1,2.1,2.2L92.8,80c2,0.6,4,0.8,6.1,0.8c5.5,0,9.3-1.6,9.3-11.5V36.3
                                            c0-1.2,0.9-2.2,2.1-2.2c0,0,0,0,0,0H123c1.2,0,2.2,0.9,2.2,2.1v33C125.3,89,113.9,96,100.6,96z"
                                        />
                                    </g>
                                </svg>
                                <br />
                                <span>Tripwire</span>
                            </div>
                            <div
                                className={styles.workIcon}
                                onClick={onClickDesign}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 130 120"
                                    width="60"
                                >
                                    <path
                                        className={styles.designPath}
                                        d="M65,111.63H16.75c-2.93,0-5.51-.79-7-3.43a8,8,0,0,1-1.14-4q-.11-44.26-.07-88.46a7,7,0,0,1,6.86-7.28h.36c7.36-.15,14.79,0,22.15-.08,2.28,0,3.78,1.29,5,2.93s2.5,3.65,3.72,5.43a2.78,2.78,0,0,0,2.78,1.43h63.74c5.43,0,8.36,2.86,8.36,8.36v76.6c0,5.51-2.86,8.36-8.36,8.36C97.06,111.63,81.06,111.63,65,111.63Zm.14-76.25H17.39c-3.43,0-4,.58-4,4.08v63.23c0,3.51.57,4.08,4,4.08h95.18c3.43,0,4-.57,4-3.93V39.24c0-3.28-.57-3.86-3.86-3.86Zm51.52-4.78V26.88c0-3.21-.57-3.72-3.71-3.72-21.23,0-42.38,0-63.6.08a7.56,7.56,0,0,1-6.64-3.36c-1.22-1.79-2.29-3.65-3.65-5.29a3.33,3.33,0,0,0-2.36-1.21c-6.64-.08-13.36-.08-20-.08-2.43,0-3.29.86-3.29,3.36V29.17a9.93,9.93,0,0,0,.14,1.5Z"
                                    />
                                    <polygon
                                        className={styles.designPath}
                                        points="59.56 67.64 74.82 83.01 74.82 73.11 69.34 67.64 59.56 67.64"
                                    />
                                    <polygon
                                        className={styles.designPath}
                                        points="74.82 56.7 73.77 57.86 58.4 57.86 57.35 56.7 51.88 56.7 48.62 60.07 48.62 65.43 49.67 66.59 49.67 76.37 48.62 77.54 48.62 83.01 57.35 91.74 57.35 65.43 74.82 65.43 83.55 56.7 74.82 56.7"
                                    />
                                    <path
                                        className={styles.designPath}
                                        d="M64.92,100A28.82,28.82,0,0,1,36.05,71,29,29,0,0,1,64.92,42.14a28.94,28.94,0,1,1,0,57.87Zm0-54.61A25.83,25.83,0,0,0,39.31,71a25.79,25.79,0,0,0,7.45,18.16,25.33,25.33,0,0,0,18.16,7.45,25.84,25.84,0,0,0,18.16-7.45A25.33,25.33,0,0,0,90.53,71,25.44,25.44,0,0,0,64.92,45.4Z"
                                    />
                                </svg>
                                <br />
                                <span>Design</span>
                            </div>
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
        isWorkOpen: state.isWorkOpen,
        zIndex: state.zIndexes.work,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWorkClose: () => dispatch({ type: "CLOSE_WORK" }),
        onGNOSOpen: () => dispatch({ type: "OPEN_GNOS" }),
        onCadillacOpen: () => dispatch({ type: "OPEN_CADILLAC" }),
        onTripwireOpen: () => dispatch({ type: "OPEN_TRIPWIRE" }),
        onDesignOpen: () => dispatch({ type: "OPEN_DESIGN" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_WORK" }),
        onIncZIndexGNOS: () => dispatch({ type: "INC_Z_GNOS" }),
        onIncZIndexCadillac: () => dispatch({ type: "INC_Z_CADILLAC" }),
        onIncZIndexTripwire: () => dispatch({ type: "INC_Z_TRIPWIRE" }),
        onIncZIndexDesign: () => dispatch({ type: "INC_Z_DESIGN" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)
