import React from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"

const FRMR = props => {
    const cssSwitch = param => {
        switch (param) {
            case "LIGHT":
                return styles.light
            case "DARK":
                return styles.dark
            case "SOLIS":
                return styles.solis
            default:
                return
        }
    }

    return (
        <div className={`${styles.frmr} ${cssSwitch(props.theme)}`}>
            <svg version="1.1" viewBox="0 0 462.1 150.9" width="115">
                <path
                    className={styles.frmrPath}
                    d="M94.7,34.5H34.3v116.4L0,116.6V34.5L34.3,0H129L94.7,34.5z M37,55h56.8L59.6,89.2H37V55z"
                />
                <path
                    className={styles.frmrPath}
                    d="M132.9,0v116.4l-34.3,34.5V34.3L132.9,0z M213.3,100.2v48.8l-80.3-80.6h48.5L213.3,100.2z M181.4,34.3h-45.8V0
	                h75.2v38.9l-29.4,29.4V34.3L181.4,34.3z"
                />
                <polygon
                    className={styles.frmrPath}
                    points="213.6,97.1 248.2,131.6 248.2,38.2 213.6,3.9 "
                />
                <polygon
                    className={styles.frmrPath}
                    points="345.2,97.1 379.7,131.6 379.7,3.9 345.2,38.2 "
                />
                <polygon
                    className={styles.frmrPath}
                    points="331.2,0 296.7,34.3 262.2,0 213.6,0 268.6,55 296.7,82.8 324.8,55 379.7,0 "
                />
                <path
                    className={styles.frmrPath}
                    d="M462.1,102.1v48.8l-82.3-82.6h48.5L462.1,102.1z M428.2,34.3h-45.8V0h75.2v38.9l-29.4,29.4V34.3L428.2,34.3z"
                />
            </svg>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(FRMR)
