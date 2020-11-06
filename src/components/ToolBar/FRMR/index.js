import React from "react"
import { connect } from "react-redux"

import frmr from "../../../assets/images/frmr.svg"

const Logo = props => {
    return (
        <>
            <img
                src={props.isDarkMode ? frmr : frmr}
                alt="FRMR"
                width="110px"
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
