import React from "react"
import Modal from "../../../Modals"
import { connect } from "react-redux"
import styles from "../../../../styles/modals.module.scss"

const Tripwire = ({ width, height, toolbar }) => {
    return (
        <Modal
            name={"Tripwire"}
            width={width}
            height={height}
            toolbar={toolbar}
        >
            <svg
                version="1.1"
                width="120"
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
            <p className={styles.workDesc}>
                Tripwire is an open-source project which fetches adventure tour
                data from the G-Adventures API and maps the locational itinerary
                data to a Mapbox instance.
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
                <a className={styles.btn} href="#" target="_blank">
                    View Live
                </a>
                <a
                    className={styles.btn}
                    href="https://github.com/frmr1/tripwire"
                    target="_blank"
                >
                    View Source
                </a>
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Tripwire)
