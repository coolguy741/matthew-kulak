import React from "react"
import { connect } from "react-redux"

import Sun from "../../../assets/images/svg/sun.svg"
import Moon from "../../../assets/images/svg/moon.svg"
import styles from "../../../styles/toolbar.module.scss"

const DarkMode = props => {
    return (
        <div
            className={`${styles.darkmode} ${
                props.isDarkMode ? styles.darkmodedark : ""
            }`}
        >
            <span onClick={props.onDarkModeToggle} className={styles.span}>
                {props.isDarkMode ? <Sun width={30} /> : <Moon width={20} />}
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
