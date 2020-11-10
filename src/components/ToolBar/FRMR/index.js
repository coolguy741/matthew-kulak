import React from "react"
import { connect } from "react-redux"

import frmr from "../../../assets/images/frmr.svg"
import frmrWhite from "../../../assets/images/frmr-white.svg"
import styles from "../../../styles/toolbar.module.scss"

const FRMR = props => {
    return (
        <div
            className={`${styles.frmr} ${
                props.isDarkMode ? styles.frmrdark : ""
            }`}
        >
            <img
                src={props.isDarkMode ? frmrWhite : frmr}
                alt="FRMR"
                width="110px"
            />
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
        onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FRMR)
