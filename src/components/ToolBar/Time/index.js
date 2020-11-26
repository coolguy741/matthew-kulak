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

    const cssSwitch = param => {
        switch (param) {
            case "LIGHT":
                return styles.light
            case "DARK":
                return styles.dark
            case "GREY":
                return styles.grey
            default:
                return
        }
    }

    return (
        <div className={`${styles.time} ${cssSwitch(props.theme)}`}>
            <span className={styles.span}>{curTime}</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Time)
