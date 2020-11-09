import React, { useRef } from "react"

import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const About = props => {
    return (
        <div className={styles.nav} onClick={props.onOpenAbout}>
            <span className={styles.navlink}>About</span>
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
        onOpenAbout: () => dispatch({ type: "TOGGLE_ABOUT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
