import React from "react"
import Modal from "../../../Modals"
import { connect } from "react-redux"
import styles from "../../../../styles/modals.module.scss"

const ExxonMobil = ({ width, height, toolbar }) => {
    return (
        <Modal
            name={"ExxonMobil"}
            width={width}
            height={height}
            toolbar={toolbar}
        >
            <div className={styles.exxonContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 47.16">
                    <path
                        className={styles.exxonPath}
                        d="M97.91,9.12h6.91v2.36a10.8,10.8,0,0,1,7.56-2.94c5.21,0,9.35,3.85,9.35,9.88V34.09h-7.3V20.36c0-3.36-1.64-5.36-4.61-5.36s-4.61,1.88-4.61,5.36V34.09h-7.3v-25M167.44,21.6a13.32,13.32,0,1,1,13.32,13.06A13.08,13.08,0,0,1,167.44,21.6m7.21,0a6.17,6.17,0,1,0,12.33,0,6.17,6.17,0,1,0-12.33,0m-107.46,0a13.32,13.32,0,1,1,13.32,13,13.08,13.08,0,0,1-13.32-13m7.2,0a6.17,6.17,0,1,0,12.33,0,6.17,6.17,0,1,0-12.33,0M229.49,6.35h7.4V0h-7.4Zm0,27.74h7.4v-25h-7.4Zm13.11,0H250V0h-7.4Zm-37.22,0h-7V0h7.1V11.1c.35-.26,2.65-2.56,7.67-2.56,6.57,0,12.05,5.64,12.05,13.07s-5.83,13-12.13,13a11.18,11.18,0,0,1-7.59-2.49l-.08,1.92m12.31-12.5a6.25,6.25,0,1,0-12.5,0,6.25,6.25,0,0,0,12.5,0M24.15,34.09h8.56L40.4,24.2l4.8,4.86-11,13.74h8.59l7-9.11L63.07,47.16H73.44L54.42,28l15-18.92H60.81L49.74,23.33,45,18.52,57.26,3H48.69L40.28,13.83,35.72,9.12H25.49l10.3,10.4L24.15,34.09M0,0V34.09H22.45V27.73H7.64V19.58H21.79V13.42H7.64V6.35H22.45V0H0M127.57,0V34.09h7.19V8.35h.32l6.18,25.74h8.07l6.33-25.74H156V34.09h7.19V0H151.44L145.6,24.88h-.26L139.64,0H127.57"
                    />
                </svg>
            </div>
            <p className={styles.workDesc}>
                Developer on 3D/AR mobile experience for ExxonMobil's Carbon
                Capture project with Groove Jones for the 23rd World Petroleum
                Congress.
            </p>
            <h4>Tech Stack</h4>
            <ul className={styles.tech}>
                <li>
                    <span>ThreeJS</span>
                </li>
                <li>
                    <span>React Three Fiber</span>
                </li>
                <li>
                    <span>AR</span>
                </li>
            </ul>
            <div className={styles.btnContainer}>
                <a
                    className={styles.btn}
                    href="https://ccs-ar.exxonmobil.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    View Live (mobile)
                </a>{" "}
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(ExxonMobil)
