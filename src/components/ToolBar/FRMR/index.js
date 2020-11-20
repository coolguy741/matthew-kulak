import React from "react"
import { connect } from "react-redux"

import FRMRSVG from "../../../assets/images/svg/frmr.svg"
import FRMRWhite from "../../../assets/images/svg/frmr-white.svg"
import styles from "../../../styles/toolbar.module.scss"

const FRMR = props => {
    return (
        <div
            className={`${styles.frmr} ${
                props.isDarkMode ? styles.frmrdark : ""
            }`}
        >
            {props.isDarkMode ? (
                <FRMRWhite width={110} />
            ) : (
                <FRMRSVG width={110} />
            )}
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
