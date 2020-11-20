import React from "react"
import { connect } from "react-redux"

import LogoBlack from "../../../assets/images/logo.svg"
import LogoWhite from "../../../assets/images/logo-white.svg"
import styles from "../../../styles/toolbar.module.scss"

const Logo = props => {
    return (
        <div
            className={`${styles.logo} ${
                props.isDarkMode ? styles.logodark : ""
            }`}
        >
            {/* {props.isDarkMode ? (
                <LogoWhite alt={"FRMR"} width={155} />
            ) : (
                <LogoBlack alt={"FRMR"} width={155} />
            )} */}
            <img
                src={props.isDarkMode ? LogoWhite : LogoBlack}
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
