import React, { useEffect, useState } from "react"
import styles from "../../../styles/toolbar.module.scss"

const Time = props => {
    // State
    const [currentTime, setCurrentTime] = useState()

    // Set current time
    useEffect(() => {
        setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString("en", {
                    hour: "numeric",
                    hour12: false,
                    minute: "numeric",
                    second: "numeric",
                })
            )
        }, 1000)
    })

    return (
        <div className={styles.time}>
            <span className={styles.span}>{currentTime}</span>
        </div>
    )
}

export default Time
