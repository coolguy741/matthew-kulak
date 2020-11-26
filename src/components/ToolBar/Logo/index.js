import React from "react"
import { connect } from "react-redux"

import LogoBlack from "../../../assets/images/svg/logo.svg"
import LogoWhite from "../../../assets/images/svg/logo-white.svg"
import styles from "../../../styles/toolbar.module.scss"

const Logo = props => {
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
                return <LogoWhite width={155} />
            case "GREY":
                return <LogoBlack width={155} />
            case "LIGHT":
                return <LogoBlack width={155} />
        }
    }

    return (
        <div className={`${styles.logo} ${cssSwitch(props.theme)}`}>
            {svgSwitch(props.theme)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Logo)
