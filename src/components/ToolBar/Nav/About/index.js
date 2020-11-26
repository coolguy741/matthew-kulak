import React, { useRef } from "react"

import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const About = props => {
    const onClickFn = () => {
        props.onOpenAbout()
        props.onIncZIndex()
    }

    const cssSwitch = param => {
        switch (param) {
            case "LIGHT":
                return styles.light
            case "DARK":
                return styles.dark
            case "GREY":
                return styles.grey
            default:
                return
        }
    }

    return (
        <div
            className={`${styles.nav} ${cssSwitch(props.theme)}`}
            onClick={onClickFn}
        >
            <span className={styles.navlink}>About</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        zIndex: state.zIndexes.about,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenAbout: () => dispatch({ type: "OPEN_ABOUT" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_ABOUT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
