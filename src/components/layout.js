import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { connect } from "react-redux"

import Header from "./header"
import ControlPanel from "../components/ControlPanel"
import "./layout.css"

const state = {
  projects: [
    {
      name: "Tripwire",
      slug: "tripwire",
    },
    {
      name: "GNOS Clothing",
      slug: "gnos",
    },
    {
      name: "Cadillac",
      slug: "cadillac",
    },
  ],
}

const StateContext = React.createContext(state)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <footer>
        <ControlPanel />
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

export { StateContext }
