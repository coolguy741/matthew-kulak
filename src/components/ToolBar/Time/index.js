import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"
import axios from "axios"

const Time = props => {
    const startTime = () => {
        const time = new Date().toLocaleTimeString("en", {
                hour: "numeric",
                hour12: false,
                minute: "numeric",
            }),
            t = setTimeout(function () {
                startTime()
            }, 500)

        return time
    }

    startTime()

    return (
        <div
            className={`${styles.time} ${
                props.isDarkMode ? styles.timedark : ""
            }`}
        >
            <span className={styles.span}>{startTime()}</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(Time)
