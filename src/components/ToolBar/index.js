import React from "react"

import Logo from "./Logo"
import FRMR from "./FRMR"
import DarkMode from "./DarkMode"
import Location from "./Location"
import Work from "./Nav/Work"
import About from "./Nav/About"
import Contact from "./Nav/Contact"
import Time from "./Time"
import { Link } from "gatsby"
import styles from "../../styles/toolbar.module.scss"

const ToolBar = () => {
    return (
        <div className={styles.toolBar}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <Work />
            <About />
            <Contact />
            <div className={styles.frmr}>
                <FRMR />
            </div>
            <div className={styles.time}>
                <Time />
            </div>
            <div className={styles.weather}>
                <span>WEATHER</span>
            </div>
            <div className={styles.location}>
                <Location />
            </div>
            <div className={styles.darkmode}>
                <DarkMode />
            </div>
        </div>
    )
}

export default ToolBar
