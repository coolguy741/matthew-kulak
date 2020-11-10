import React from "react"

import { connect } from "react-redux"
import Logo from "./Logo"
import FRMR from "./FRMR"
import DarkMode from "./DarkMode"
import Location from "./Location"
import Work from "./Nav/Work"
import About from "./Nav/About"
import Contact from "./Nav/Contact"
import Time from "./Time"
import Weather from "./Weather"
import styles from "../../styles/toolbar.module.scss"

const Toolbar = props => {
    return (
        <div
            className={`${styles.toolbar} ${
                props.isDarkMode ? styles.toolbardark : ""
            }`}
        >
            <Logo />
            <Work />
            <About />
            <Contact />
            <FRMR />
            <Time />
            <Weather />
            <Location />
            <DarkMode />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(Toolbar)
