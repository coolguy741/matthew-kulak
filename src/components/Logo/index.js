import React from "react"
import { connect } from "react-redux"
import { Link } from "gatsby"

import mainLogo from "../../images/logo.svg"
import greenLogo from "../../images/logo-green.svg"
import styles from "../../styles/Logo.module.css"

const Logo = props => {
  return (
    <div className={styles.Logo}>
      <Link to="/">
        <img
          src={props.isDarkMode ? greenLogo : mainLogo}
          alt="FRMR"
          width="55px"
        />
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
