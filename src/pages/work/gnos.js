import React from "react"
import { connect } from "react-redux"

import MainCanvas from "../../components/Three/Canvas"
import Layout from "../../components/layout"
import styles from "../../styles/project.module.scss"

const GnosClothing = props => (
    <Layout>
        <MainCanvas />
        <h1
            className={`${styles.h1Container} ${
                props.isDarkMode ? styles.darkMode : styles.lightMode
            }`}
        >
            GNOS CLOTHING
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

export default connect(mapStateToProps, mapDispatchToProps)(GnosClothing)
