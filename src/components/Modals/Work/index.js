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
                    className={`${styles.modal} ${styles.workModal} ${cssSwitch(
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
                    <div className={styles.body}>
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
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    width="60"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 130 120"
                                >
                                    <g>
                                        <path
                                            className={styles.cadillacPath}
                                            d="M109.6,17.6c0,7.4-17.2,13.4-17.2,16c0,22,0,42.4,0,64.2c1-0.7,2.2-1.6,3.3-2.6c0.4-0.1,5.4-4.9,7.7-4.9
                                            c1.9,0,3.6,1.6,3.6,3.3c0,0.9-0.4,1.6-1.2,2.3C95.1,105.5,81.8,115,66.4,115c-11.4,0-33.2-6.6-36.7-19.2c-0.1-0.1-0.1-0.3-0.1-0.4
                                            c0-0.1,0-0.3,0.1-0.4c-0.1,0-0.1-0.4-0.1-0.9c0-0.4,0-1,0-1.3c0-16.5-0.1-23.1-10.3-26.5c-2.9-0.1-3.3-1.2-3.3-2.2
                                            c0-28.8,19.1-58.4,51.2-58.4c2.8,0,11.4-0.3,11.4,3.2c0,1-0.6,2-1.3,2.8C67,13.1,57.2,16.1,50.4,24c-9.3,12.2-13,27.5-13,41.2
                                            c0,0.4,4.4,4.2,5.8,8c1.5,4.1,0.9,14.3,3.3,14.3c3.2,0,8.6-7.4,8.6-12.8c0-2.8,0-3.1,0-13.2c-0.6-0.1-1-0.3-1.6-0.3
                                            c-3.9,0-6.1,4.1-8.7,4.1c-1.9,0-3.6-1.2-3.6-3.1c0-0.4,0.1-1.2,0.6-1.7c3.3-5.1,6.6-11.6,13.4-11.6c0-18.5,1-17.2,8.6-22.7
                                            c3.9-2.9,8.4-7.7,14-7.7c6.1,0,11.6,2.8,17.2,2.8c4.5,0,8.3-5.5,12.1-5.5c0.4,0,1,0,1.5,0.3C109.3,16.4,109.6,17,109.6,17.6z
                                            M81.1,32.9c-2.3-0.1-4.5-0.4-6.8-0.9C69.6,32,71,43.8,71,71.2c0,1.5,0.1,2.8,0.1,4.2c0,1.6-0.3,3.2-1,4.7
                                            c-2.9,4.8-11.9,10.3-11.9,15c0,4.4,13.1,7.3,16.7,7.3c5.4,0,6.1-3.5,6.1-5.7C81.1,75.4,81.1,54.1,81.1,32.9z"
                                        />
                                    </g>
                                </svg>

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
                                        d="M65,111.6H16.8c-2.9,0-5.5-0.8-7-3.4c-0.7-1.2-1.1-2.6-1.1-4c-0.1-29.5-0.1-59-0.1-88.5c-0.2-3.9,2.9-7.1,6.7-7.3
                                        c0,0,0.1,0,0.1,0h0.4c7.4-0.1,14.8,0,22.2-0.1c2.3,0,3.8,1.3,5,2.9s2.5,3.6,3.7,5.4c0.5,1,1.6,1.6,2.8,1.4h63.7
                                        c5.4,0,8.4,2.9,8.4,8.4v76.6c0,5.5-2.9,8.4-8.4,8.4C97.1,111.6,81.1,111.6,65,111.6z M65.1,35.4H17.4c-3.4,0-4,0.6-4,4.1v63.2
                                        c0,3.5,0.6,4.1,4,4.1h95.2c3.4,0,4-0.6,4-3.9V39.2c0-3.3-0.6-3.9-3.9-3.9L65.1,35.4z M116.7,30.6v-3.7c0-3.2-0.6-3.7-3.7-3.7
                                        c-21.2,0-42.4,0-63.6,0.1c-2.6,0.1-5.2-1.2-6.6-3.4c-1.2-1.8-2.3-3.6-3.7-5.3c-0.6-0.7-1.4-1.2-2.4-1.2c-6.6-0.1-13.4-0.1-20-0.1
                                        c-2.4,0-3.3,0.9-3.3,3.4v12.5c0,0.5,0.1,1,0.1,1.5L116.7,30.6z"
                                    />
                                    <g>
                                        <path
                                            className={styles.designPath}
                                            d="M56.7,80.8c-0.1-1.2-0.8-2.3-1.7-3.1c-0.8-0.6-1.9-1-2.9-1c-1.4,0-2.7,0.6-3.6,1.7c-0.8,1-1.1,2.2-1,3.4
                                            c0.1,1.2,0.8,2.3,1.7,3.1c0.8,0.6,1.8,1,2.9,1c1.4,0,2.8-0.6,3.6-1.7C56.5,83.2,56.9,82,56.7,80.8z M53.9,82.6
                                            c-0.4,0.5-1.1,0.8-1.7,0.8c-0.5,0-1-0.2-1.4-0.5c-0.5-0.4-0.8-0.9-0.8-1.5c-0.1-0.6,0.1-1.2,0.5-1.6c0.4-0.5,1.1-0.8,1.7-0.8
                                            c0.5,0,1,0.2,1.4,0.5c0.5,0.4,0.8,0.9,0.8,1.5C54.4,81.6,54.2,82.2,53.9,82.6z"
                                        />
                                        <path
                                            className={styles.designPath}
                                            d="M61.6,60.4c0.3,0.1,0.7,0.1,1,0.1c2.2,0,4-1.5,4.5-3.6c0.3-1.2,0.1-2.4-0.6-3.5c-0.7-1.1-1.7-1.8-2.9-2.1
                                            c-0.3-0.1-0.7-0.1-1-0.1c-2.2,0-4,1.5-4.5,3.6c-0.3,1.2-0.1,2.4,0.6,3.5C59.4,59.4,60.4,60.2,61.6,60.4z M60.5,55.4
                                            c0.2-1,1.1-1.7,2.2-1.7c0.2,0,0.3,0,0.5,0.1c0.6,0.1,1.1,0.5,1.4,1c0.3,0.5,0.4,1.1,0.3,1.6c-0.2,1-1.1,1.7-2.2,1.7
                                            c-0.2,0-0.3,0-0.5-0.1c-0.6-0.1-1.1-0.5-1.4-1C60.5,56.6,60.4,56,60.5,55.4z"
                                        />
                                        <path
                                            className={styles.designPath}
                                            d="M53.8,62.9c1-0.8,1.6-1.9,1.7-3.1c0.1-1.2-0.2-2.4-1-3.4c-0.9-1.1-2.2-1.7-3.6-1.7c-1,0-2.1,0.4-2.9,1
                                            c-1,0.8-1.6,1.9-1.7,3.1c-0.1,1.2,0.2,2.4,1,3.4c0.9,1.1,2.2,1.7,3.6,1.7C51.9,63.9,52.9,63.6,53.8,62.9z M48.6,59.1
                                            c0.1-0.6,0.4-1.1,0.8-1.5c0.4-0.3,0.9-0.5,1.4-0.5c0.7,0,1.3,0.3,1.7,0.8c0.4,0.5,0.5,1,0.5,1.6c-0.1,0.6-0.4,1.1-0.8,1.5
                                            c-0.4,0.3-0.9,0.5-1.4,0.5c-0.7,0-1.3-0.3-1.7-0.8C48.7,60.2,48.6,59.7,48.6,59.1z"
                                        />
                                        <path
                                            className={styles.designPath}
                                            d="M95.3,52.7c-0.2-0.2-0.6-0.4-1.1-0.4c-0.7,0-2.2,0-11.6,8l-0.4,0.3c-1.7-4.3-4.7-8.1-8.3-10.9c-4.4-3.2-9.6-5-15-5
                                            c-3.7,0-8.2,1.3-11.7,3.4c-4.4,2.6-6.8,6-6.8,9.7c0,4.5,2.5,6.3,4.5,7.8c1.6,1.2,2.8,2.1,2.8,4s-1.2,2.8-2.8,4
                                            c-2,1.5-4.5,3.3-4.5,7.8c0,3.7,2.4,7.1,6.8,9.7c3.5,2.1,8,3.4,11.7,3.4h0c6.7,0,13-2.6,17.7-7.3c4.7-4.6,7.3-10.7,7.3-17.3
                                            c1.6-1.8,3.1-3.6,4.5-5.2c2.4-2.9,4.2-5.3,5.5-7.1C95.5,55.2,96.3,53.7,95.3,52.7z M74.9,85.5c-4.3,4.2-10,6.6-16,6.6
                                            c-6.5,0-16.1-4.5-16.1-10.6c0-3.2,1.7-4.5,3.5-5.8c1.8-1.3,3.8-2.8,3.8-6c0-3.2-2-4.7-3.8-6c-1.8-1.3-3.5-2.6-3.5-5.9
                                            c0-3.8,3.5-6.4,5.6-7.6c3.1-1.8,7.3-3,10.5-3V47l0,0.2c4.9,0,9.6,1.6,13.6,4.5c3.6,2.7,6.4,6.4,7.8,10.6c-1.2,1-2.4,2.1-3.6,3.2
                                            c0.2-0.3,0.3-0.6,0.5-0.9c0.4-1.2,0.3-2.4-0.2-3.5c-0.8-1.6-2.4-2.6-4.2-2.6c-0.7,0-1.4,0.2-2,0.5c-1.1,0.5-2,1.5-2.4,2.6
                                            c-0.4,1.2-0.3,2.4,0.2,3.5c0.8,1.6,2.4,2.6,4.2,2.6c0.7,0,1.4-0.2,2-0.5c0,0,0.1,0,0.1-0.1c-2.6,2.4-5.1,4.8-7.2,6.9
                                            c-6,0.8-6.8,4.8-7.4,7.7c-0.5,2.4-0.8,3.5-2.5,3.6c-0.6,0-1,0.5-1.1,1c-0.1,0.6,0.2,1.1,0.7,1.3c0.1,0.1,3,1.3,6.5,1.3
                                            c2.4,0,4.5-0.6,6.1-1.7c2-1.4,3.4-3.6,4.1-6.6c2.2-2.2,4.6-4.8,7.1-7.6C80.6,77.7,78.4,82.1,74.9,85.5z M74.8,63.7
                                            c-0.2,0.6-0.6,1-1.1,1.3c-0.3,0.1-0.6,0.2-1,0.2c-0.9,0-1.6-0.5-2-1.2c-0.3-0.5-0.3-1.1-0.1-1.7c0.2-0.6,0.6-1,1.1-1.3
                                            c0.3-0.1,0.6-0.2,1-0.2c0.9,0,1.6,0.5,2,1.2C75,62.6,75,63.2,74.8,63.7z M67.8,76.4l3.9,3.9c-1.1,4.1-3.7,6.2-7.8,6.2
                                            c-0.9,0-1.8-0.1-2.7-0.3c0.9-1.1,1.2-2.7,1.5-4C63.2,79.4,63.7,77,67.8,76.4z M85.8,64.1c-4,4.7-8.7,10-12.8,14.1L70,75.1
                                            c3.6-3.6,8.2-7.8,12.5-11.6c0.5-0.4,1-0.9,1.5-1.3c4.3-3.6,6.8-5.5,8.3-6.5C91.3,57.2,89.4,59.8,85.8,64.1z"
                                        />
                                    </g>
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
