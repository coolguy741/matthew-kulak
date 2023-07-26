import React from "react"
import Modal from "../../../Modals"
import { connect } from "react-redux"
import styles from "../../../../styles/modals.module.scss"

const GNOS = ({ width, height, toolbar }) => {
    return (
        <Modal name={"GNOS"} width={width} height={height} toolbar={toolbar}>
            <svg version="1.1" viewBox="0 0 130 120" width="120">
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
            <p className={styles.workDesc}>
                GNOS is a clothing brand founded and operated by CoolGuy.
            </p>
            <h4>Tech Stack</h4>
            <ul className={styles.tech}>
                <li>
                    <span>React</span>
                </li>
                <li>
                    <span>Next.js</span>
                </li>
                <li>
                    <span>GraphQL</span>
                </li>
                <li>
                    <span>Apollo Server/Client</span>
                </li>
            </ul>
            <div className={styles.btnContainer}>
                {/* <a className={styles.btn} href="https://gnosclothing.com" target="_blank" rel="noreferrer">
                    View Live
                </a>
                <a className={styles.btn} href="#" target="_blank" rel="noreferrer">
                    View Source
                </a> */}
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(GNOS)
