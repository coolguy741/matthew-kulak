import React from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"

const DarkMode = props => {
    return (
        <>
            <span onClick={props.onDarkModeToggle} className={styles.span}>
                DARK
            </span>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DarkMode)
