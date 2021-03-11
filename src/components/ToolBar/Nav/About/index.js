import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import styles from "../../../../styles/toolbar.module.scss"

const About = props => {
    // Refs
    const aboutRef = useRef()

    // On click function
    const onClickFn = () => {
        props.onOpenAbout()
        props.onIncZIndex()
    }

    // Bounding box anchor
    useEffect(() => {
        const pos = {
            top: aboutRef.current.getBoundingClientRect().top,
            left: aboutRef.current.getBoundingClientRect().left,
            width: aboutRef.current.getBoundingClientRect().width,
            height: aboutRef.current.getBoundingClientRect().height,
        }
        props.setAboutAnchor(pos)
    }, [aboutRef.current])

    return (
        <div
            ref={aboutRef}
            className={`${styles.nav} ${styles.about}`}
            onClick={onClickFn}
        >
            <span className={styles.navlink}>About</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        zIndex: state.zIndexes.about,
        aboutAnchor: state.aboutAnchor,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenAbout: () => dispatch({ type: "OPEN_ABOUT" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_ABOUT" }),
        setAboutAnchor: pos =>
            dispatch({
                type: "SET_ABOUT_ANCHOR",
                top: pos.top,
                left: pos.left,
                width: pos.width,
                height: pos.height,
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
