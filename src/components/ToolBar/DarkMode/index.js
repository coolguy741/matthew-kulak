import React from "react"
import { connect } from "react-redux"

import sun from "../../../assets/images/sun.svg"
import moon from "../../../assets/images/moon.svg"
import styles from "../../../styles/toolbar.module.scss"

const DarkMode = props => {
    return (
        <div
            className={`${styles.darkmode} ${
                props.isDarkMode ? styles.darkmodedark : ""
            }`}
        >
            <span onClick={props.onDarkModeToggle} className={styles.span}>
                <img
                    src={props.isDarkMode ? sun : moon}
                    width={props.isDarkMode ? 30 : 20}
                />
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
