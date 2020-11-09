import React, { useRef } from "react"

import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const Contact = props => {
    return (
        <div className={styles.work} onClick={props.onOpenContact}>
            <span className={styles.navlink}>CONTACT</span>
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
        onOpenContact: () => dispatch({ type: "TOGGLE_CONTACT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
