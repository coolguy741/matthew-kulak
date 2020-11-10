import React from "react"
import { connect } from "react-redux"

import mainLogo from "../../../assets/images/logo.svg"
import whiteLogo from "../../../assets/images/logo-white.svg"
import styles from "../../../styles/toolbar.module.scss"

const Logo = props => {
    return (
        <div
            className={`${styles.logo} ${
                props.isDarkMode ? styles.logodark : ""
            }`}
        >
            <img
                src={props.isDarkMode ? whiteLogo : mainLogo}
                alt="FRMR"
                width="155px"
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(Logo)
