import React from "react"

import { connect } from "react-redux"
import Logo from "./Logo"
import FRMR from "./FRMR"
import ThemePicker from "./ThemePicker"
import Location from "./Location"
import Work from "./Nav/Work"
import About from "./Nav/About"
import Contact from "./Nav/Contact"
import Time from "./Time"
import Weather from "./Weather"
import styles from "../../styles/toolbar.module.scss"

const Toolbar = props => {
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
        <>
            <div className={`${styles.toolbar} ${cssSwitch(props.theme)}`}>
                <Logo />
                <Work />
                <About />
                <Contact />
                <FRMR />
                <Time />
                <Weather />
                <Location />
                <ThemePicker />
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Toolbar)
