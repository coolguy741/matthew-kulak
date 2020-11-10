import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"

const Time = props => {
    return (
        <div
            className={`${styles.weather} ${
                props.isDarkMode ? styles.weatherdark : ""
            }`}
        >
            <span className={styles.span}>WEATHER</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(Time)
