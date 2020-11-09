import React from "react"
import { connect } from "react-redux"

import MainCanvas from "../components/Three/Canvas"
import Layout from "../components/layout"
import styles from "../styles/page.module.css"

const about = props => {
  return (
    <Layout>
      <MainCanvas />
      <h1
        className={`${styles.h1Container} ${
          props.isDarkMode ? styles.darkMode : styles.lightMode
        }`}
      >
        ABOUT
      </h1>
    </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(about)