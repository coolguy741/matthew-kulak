import React, { useRef } from "react"

import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const Work = props => {
    const onClickFn = () => {
        props.onOpenWork()
        props.onIncZIndex()
    }
    return (
        <div
            className={`${styles.nav} ${
                props.isDarkMode ? styles.navdark : ""
            }`}
            onClick={onClickFn}
        >
            <span
                className={`${styles.navlink} ${
                    props.isDarkMode ? styles.navlinkdark : ""
                }`}
            >
                Work
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
        zIndex: state.zIndexes.work,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenWork: () => dispatch({ type: "OPEN_WORK" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_WORK" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)
