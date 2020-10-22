import React, { useRef } from "react"
import { connect } from "react-redux"

import { Link } from "gatsby"
import { TweenLite, Power2 } from "gsap"
import styles from "../../../styles/NavItems.module.css"

const NavItems = props => {
  const workRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  const style = {
    fontWeight: 500,
  }

  const workLinkAnimateIn = () => {
    TweenLite.to(workRef.current, 0.3, { ease: Power2.easeInOut, right: 5 })
  }

  const workLinkAnimateOut = () => {
    TweenLite.to(workRef.current, 0.3, { ease: Power2.easeInOut, right: 0 })
  }

  const aboutLinkAnimateIn = () => {
    TweenLite.to(aboutRef.current, 0.3, { ease: Power2.easeInOut, right: 5 })
  }

  const aboutLinkAnimateOut = () => {
    TweenLite.to(aboutRef.current, 0.3, { ease: Power2.easeInOut, right: 0 })
  }

  const contactLinkAnimateIn = () => {
    TweenLite.to(contactRef.current, 0.3, { ease: Power2.easeInOut, right: 5 })
  }

  const contactLinkAnimateOut = () => {
    TweenLite.to(contactRef.current, 0.3, { ease: Power2.easeInOut, right: 0 })
  }

  return (
    <div
      className={`${styles.navList} ${
        props.isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <Link
        activeStyle={style}
        to="/"
        ref={workRef}
        onMouseOver={workLinkAnimateIn}
        onMouseLeave={workLinkAnimateOut}
      >
        WORK
      </Link>
      <Link
        activeStyle={style}
        to="/about"
        ref={aboutRef}
        onMouseOver={aboutLinkAnimateIn}
        onMouseLeave={aboutLinkAnimateOut}
      >
        ABOUT
      </Link>
      <Link
        activeStyle={style}
        to="/contact"
        ref={contactRef}
        onMouseOver={contactLinkAnimateIn}
        onMouseLeave={contactLinkAnimateOut}
      >
        CONTACT
      </Link>
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
    onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavItems)
