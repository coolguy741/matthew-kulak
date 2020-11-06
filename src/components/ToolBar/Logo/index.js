import React from "react"
import { connect } from "react-redux"
import { Link } from "gatsby"

import mainLogo from "../../../assets/images/logo.svg"
import greenLogo from "../../../assets/images/logo-green.svg"
import styles from "../../../styles/logo.module.css"

const Logo = props => {
    return (
        <>
            <img
                src={props.isDarkMode ? greenLogo : mainLogo}
                alt="FRMR"
                width="155px"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
