import React from "react"

import Logo from "./Logo"
import FRMR from "./FRMR"
import DarkMode from "./DarkMode"
import { Link } from "gatsby"
import styles from "../../styles/toolbar.module.scss"

const ToolBar = () => {
    return (
        <div className={styles.toolBar}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.work}>
                <Link>WORK</Link>
            </div>
            <div className={styles.work}>
                <Link>ABOUT</Link>
            </div>
            <div className={styles.work}>
                <Link>CONTACT</Link>
            </div>
            <div className={styles.frmr}>
                <FRMR />
            </div>
            <div className={styles.time}>TIME</div>
            <div className={styles.weather}>WEATHER</div>
            <div className={styles.location}>LOCATION</div>
            <div className={styles.darkmode}>
                <DarkMode />
            </div>
        </div>
    )
}

export default ToolBar
