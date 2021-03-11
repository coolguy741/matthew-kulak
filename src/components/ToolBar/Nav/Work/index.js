import React from "react"
import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const Work = props => {
    // On click function
    const onClickFn = () => {
        props.onOpenWork()
        props.onIncZIndex()
    }

    return (
        <div className={`${styles.nav} ${styles.work}`} onClick={onClickFn}>
            <span className={styles.navlink}>Work</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
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
