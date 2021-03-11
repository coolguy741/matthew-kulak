import React from "react"
import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const Contact = props => {
    // On click function
    const onClickFn = () => {
        props.onOpenContact()
        props.onIncZIndex()
    }

    return (
        <div className={`${styles.nav} ${styles.contact}`} onClick={onClickFn}>
            <span className={styles.navlink}>Contact</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        zIndex: state.zIndexes.contact,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenContact: () => dispatch({ type: "OPEN_CONTACT" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_CONTACT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
