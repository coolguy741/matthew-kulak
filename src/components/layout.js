import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { connect } from "react-redux"

import Header from "./header"
import ToolBar from "../components/ToolBar"
import Contact from "../components/Modals/Contact"
import About from "../components/Modals/About"
import Work from "../components/Modals/Work"
import GNOS from "../components/Modals/Work/GNOS"
import Cadillac from "../components/Modals/Work/Cadillac"
import Tripwire from "../components/Modals/Work/Tripwire"
import "./layout.scss"

const state = {
    zIndex: 0,
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

    const width = window.innerWidth
    const height = window.innerHeight

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <main>{children}</main>
            <Work width={width} height={height} />
            <About width={width} height={height} />
            <Contact width={width} height={height} />
            <GNOS width={width} height={height} />
            <Cadillac width={width} height={height} />
            <Tripwire width={width} height={height} />
            <footer>
                <ToolBar />
            </footer>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

export { StateContext }
