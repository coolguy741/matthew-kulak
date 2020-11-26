import React from "react"
import { connect } from "react-redux"

import FRMRSVG from "../../../assets/images/svg/frmr.svg"
import FRMRWhite from "../../../assets/images/svg/frmr-white.svg"
import styles from "../../../styles/toolbar.module.scss"

const FRMR = props => {
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

    const svgSwitch = param => {
        switch (param) {
            case "DARK":
                return <FRMRWhite width={110} />
            case "GREY":
                return <FRMRSVG width={110} />
            case "LIGHT":
                return <FRMRSVG width={110} />
        }
    }

    return (
        <div className={`${styles.frmr} ${cssSwitch(props.theme)}`}>
            {svgSwitch(props.theme)}
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
        onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FRMR)
