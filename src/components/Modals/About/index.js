import React from "react"
import Modal from "../../Modals"
import { connect } from "react-redux"
import styles from "../../../styles/modals.module.scss"

const About = ({ width, height, toolbar }) => {
    // Get current year
    const d = new Date()
    const year = d.getFullYear()

    return (
        <Modal name={"About"} width={width} height={height} toolbar={toolbar}>
            <div className={styles.aboutLogoContainer}>
                <svg version="1.1" viewBox="0 0 49.7 49.7" width="70">
                    <g>
                        <g>
                            <polygon
                                className={styles.logoPath}
                                points="20.2,21.9 33.3,35.1 33.3,26.6 28.6,21.9"
                            />
                        </g>
                        <g>
                            <g>
                                <g>
                                    <polygon
                                        className={styles.logoPath}
                                        points="33.3,12.5 32.4,13.5 19.2,13.5 18.3,12.5 13.6,12.5 10.8,15.4 10.8,20 11.7,21 11.7,29.4 
					                                10.8,30.4 10.8,35.1 18.3,42.6 18.3,20 33.3,20 40.8,12.5"
                                    />
                                </g>
                            </g>
                            <path
                                className={styles.logoPath}
                                d="M24.8,49.7c-6.6,0-12.9-2.6-17.6-7.3C2.6,37.7,0,31.5,0,24.8C0,18.2,2.6,12,7.3,7.3C12,2.6,18.2,0,24.8,0
                                            c6.6,0,12.9,2.6,17.6,7.3c4.7,4.7,7.3,10.9,7.3,17.6c0,6.6-2.6,12.9-7.3,17.6C37.7,47.1,31.5,49.7,24.8,49.7L24.8,49.7z M24.8,2.8
                                            C19,2.8,13.4,5.1,9.3,9.3C5.1,13.4,2.8,19,2.8,24.8c0,5.9,2.3,11.4,6.4,15.6c4.2,4.2,9.7,6.4,15.6,6.4c5.9,0,11.4-2.3,15.6-6.4
                                            c4.2-4.2,6.4-9.7,6.4-15.6c0-5.9-2.3-11.4-6.4-15.6C36.3,5.1,30.7,2.8,24.8,2.8L24.8,2.8z"
                            />
                        </g>
                    </g>
                </svg>
            </div>
            <div className={styles.about}>
                <div className={styles.aboutTitle}>
                    <h2>Class</h2>
                </div>
                <div className={styles.aboutDesc}>
                    <span>Developer</span>
                </div>
                <div className={styles.aboutTitle}>
                    <h2>Location</h2>
                </div>
                <div className={styles.aboutDesc}>
                    <span>Calgary, Canada</span>
                </div>
                <div className={styles.aboutTitle}>
                    <h2>Tech</h2>
                </div>
                <div className={styles.aboutDesc}>
                    <span>WebGL, ThreeJS, React Three Fiber, AR/VR</span>
                </div>
                <div className={styles.aboutTitle}>
                    <h2>Clients</h2>
                </div>
                <div className={styles.aboutDesc}>
                    <span>NBC, AT&T, NCAA, ExxonMobil, Toyota</span>
                </div>
                <div className={styles.aboutTitle}>
                    <h2>Status</h2>
                </div>
                <div className={`${styles.aboutDesc} ${styles.status}`}>
                    <span>Available</span>
                </div>
                <div className={`${styles.aboutTitle} ${styles.connect}`}>
                    <h2>Connect</h2>
                </div>
                <div className={`${styles.aboutDesc} ${styles.connect}`}>
                    <a
                        href="https://www.linkedin.com/in/frmr"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg
                            height="20"
                            viewBox="0 0 72 72"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className={styles.linkedInPath}
                                d="M64,0H8C3.6,0,0,3.6,0,8v56c0,4.4,3.6,8,8,8h56c4.4,0,8-3.6,8-8V8C72,3.6,68.4,0,64,0z M21.8,62H11V27.3h10.7
                                V62z M16.3,22.8c-3.5,0-6.3-2.9-6.3-6.4c0-3.5,2.8-6.4,6.3-6.4c3.5,0,6.3,2.9,6.3,6.4C22.7,19.9,19.9,22.8,16.3,22.8z M62,62H51.3
                                V43.8c0-5-1.9-7.8-5.8-7.8c-4.3,0-6.5,2.9-6.5,7.8V62H28.6V27.3h10.3V32c0,0,3.1-5.7,10.5-5.7c7.4,0,12.6,4.5,12.6,13.8V62z"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://twitter.com/frmr_"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 250 203.1"
                            width="20"
                        >
                            <path
                                className={styles.twitterPath}
                                d="M78.6,203.1c94.3,0,145.9-78.2,145.9-145.9c0-2.2,0-4.4-0.1-6.6c10-7.3,18.7-16.3,25.6-26.5
                                            c-9.4,4.1-19.3,6.9-29.5,8.1c10.7-6.4,18.7-16.5,22.5-28.4c-10.1,6-21.1,10.2-32.6,12.4c-19.4-20.7-51.9-21.7-72.6-2.2
                                            c-13.3,12.5-19,31.2-14.8,49C81.9,60.9,43.4,41.4,17.4,9.4C3.8,32.8,10.7,62.8,33.3,77.8c-8.2-0.2-16.1-2.4-23.3-6.4
                                            c0,0.2,0,0.4,0,0.6c0,24.4,17.2,45.4,41.2,50.3c-7.6,2.1-15.5,2.4-23.2,0.9c6.7,20.9,26,35.2,47.9,35.6c-18.2,14.3-40.6,22-63.7,22
                                            c-4.1,0-8.2-0.3-12.2-0.7C23.5,195.2,50.7,203.1,78.6,203.1"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/frmr1"
                        target="_blank"
                        rel="noreferrer"
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
                        </svg>
                    </a>
                </div>
                <span className={styles.copyright}>©{year} FRMR.</span>
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(About)
