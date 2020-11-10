import React from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"

const DarkMode = props => {
    return (
        <div
            className={`${styles.darkmode} ${
                props.isDarkMode ? styles.darkmodedark : ""
            }`}
        >
            <span onClick={props.onDarkModeToggle} className={styles.span}>
                DARK
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDarkModeToggle: () => dispatch({ type: "DARKMODE_TOGGLE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DarkMode)
