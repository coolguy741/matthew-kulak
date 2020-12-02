import React, { useRef } from "react"

import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const About = props => {
    const onClickFn = () => {
        props.onOpenAbout()
        props.onIncZIndex()
    }

    return (
        <div className={`${styles.nav} ${styles.about}`} onClick={onClickFn}>
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
