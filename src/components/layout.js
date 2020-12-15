import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { connect } from "react-redux"

import Header from "./header"
import ToolBar from "../components/ToolBar"
import Contact from "../components/Modals/Contact"
import About from "../components/Modals/About"
import Work from "../components/Modals/Work"
import UserSettings from "../components/Modals/UserSettings"
import Design from "../components/Modals/Design"
import GNOS from "../components/Modals/Work/GNOS"
import Cadillac from "../components/Modals/Work/Cadillac"
import Tripwire from "../components/Modals/Work/Tripwire"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./layout.scss"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query imagesAndSiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
            images: allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
                nodes {
                    id
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
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
            <UserSettings width={width} height={height} />
            <Design width={width} height={height} imageData={data.images} />
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
