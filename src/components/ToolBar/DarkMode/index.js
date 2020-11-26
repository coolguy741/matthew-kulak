import React from "react"
import { connect } from "react-redux"

import Sun from "../../../assets/images/svg/sun.svg"
import Moon from "../../../assets/images/svg/moon.svg"
import styles from "../../../styles/toolbar.module.scss"

const DarkMode = props => {
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
        <div className={`${styles.darkmode} ${cssSwitch(props.theme)}`}>
            <span onClick={props.onDarkModeToggle} className={styles.span}>
                <Moon width={20} onClick={props.setDarkTheme} />
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLightTheme: () => dispatch({ type: "LIGHT_THEME" }),
        setDarkTheme: () => dispatch({ type: "DARK_THEME" }),
        setGreyTheme: () => dispatch({ type: "GREY_THEME" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DarkMode)
