import React from "react"
import { connect } from "react-redux"

import Img from "gatsby-image"
import tripwire from "../../assets/images/tripwire.png"
import MainCanvas from "../../components/Three/Canvas"
import Layout from "../../components/layout"
import styles from "../../styles/project.module.scss"

const Tripwire = props => (
    <Layout>
        <MainCanvas />
        <h1
            className={`${styles.h1Container} ${
                props.isDarkMode ? styles.darkMode : styles.lightMode
            }`}
        >
            TRIPWIRE
        </h1>
    </Layout>
)

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

export default connect(mapStateToProps, mapDispatchToProps)(Tripwire)
