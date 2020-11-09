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
            <Work width={window.innerWidth} height={window.innerHeight} />
            <About width={window.innerWidth} height={window.innerHeight} />
            <Contact width={window.innerWidth} height={window.innerHeight} />
            <GNOS width={window.innerWidth} height={window.innerHeight} />
            <Cadillac width={window.innerWidth} height={window.innerHeight} />
            <Tripwire width={window.innerWidth} height={window.innerHeight} />
            <footer>
                <ToolBar />
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

export default connect(mapStateToProps)(Layout)

export { StateContext }
