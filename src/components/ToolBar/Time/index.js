import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"

const Time = props => {
    const [curTime, setTime] = useState()

    useEffect(() => {
        setInterval(() => {
            setTime(
                new Date().toLocaleTimeString("en", {
                    hour: "numeric",
                    hour12: false,
                    minute: "numeric",
                })
            )
        }, 1000)
    })

    return (
        <div
            className={`${styles.time} ${
                props.isDarkMode ? styles.timedark : ""
            }`}
        >
            <span className={styles.span}>{curTime}</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(Time)
