import React, { useRef } from "react"

import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const Work = props => {
    return (
        <div className={styles.nav} onClick={props.onOpenWork}>
            <span className={styles.navlink}>Work</span>
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
        onOpenWork: () => dispatch({ type: "TOGGLE_WORK" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)
