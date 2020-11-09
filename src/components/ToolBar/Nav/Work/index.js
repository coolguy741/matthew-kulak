import React, { useRef } from "react"
import { connect } from "react-redux"

import { Link } from "gatsby"
import { TweenLite, Power2 } from "gsap"
import styles from "../../../../styles/toolbar.module.scss"

const Work = props => {
    const workRef = useRef(null)

    const workLinkAnimateIn = () => {
        TweenLite.to(workRef.current, 0.3, { ease: Power2.easeInOut, right: 5 })
    }

    const workLinkAnimateOut = () => {
        TweenLite.to(workRef.current, 0.3, { ease: Power2.easeInOut, right: 0 })
    }

    return (
        <>
            <Link
                // activeStyle={style}
                to="/"
                ref={workRef}
                onMouseOver={workLinkAnimateIn}
                onMouseLeave={workLinkAnimateOut}
                className={styles.navlink}
            >
                WORK
            </Link>
        </>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Work)
