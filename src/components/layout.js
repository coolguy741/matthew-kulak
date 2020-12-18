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
import { useMediaQuery } from "react-responsive"
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

    const isLandscape = useMediaQuery({
        query: "(orientation: landscape)",
    })

    const isTabletPortrait = useMediaQuery({
        query: "(min-width: 481px)",
    })

    const isTabletPortraitHeight = useMediaQuery({
        query: "(min-height: 450px)",
    })

    const isTabletLandscape = useMediaQuery({
        query: "(min-width: 821px)",
    })

    const isLaptop = useMediaQuery({
        query: "(min-width: 1200px)",
    })

    const getWorkWidth = () => {
        if (
            (isTabletLandscape && isLandscape) ||
            (isTabletPortrait && isTabletPortraitHeight) ||
            isLaptop
        ) {
            return 140
        } else if (isLandscape) {
            return 402
        } else {
            return 130
        }
    }

    const getWorkHeight = () => {
        if (
            (isTabletLandscape && isLandscape) ||
            (isTabletPortrait && isTabletPortraitHeight) ||
            isLaptop
        ) {
            return 400
        } else if (isLandscape) {
            return 140
        } else {
            return 400
        }
    }

    const getGallerySize = () => {
        if (isLaptop) {
            return 480
        } else if (
            (isTabletPortrait && isTabletPortraitHeight) ||
            isTabletLandscape
        ) {
            return 420
        } else if (isLandscape) {
            return 270
        } else {
            return 320
        }
    }

    const getToolbarHeight = () => {
        if (isLaptop) {
            return 70
        } else if (isTabletLandscape) {
            return 60
        } else if (isTabletPortrait || isLandscape) {
            return 50
        } else {
            return 100
        }
    }

    const getProjectWidth = () => {
        if (
            (isTabletLandscape && isLandscape) ||
            (isTabletPortrait && isTabletPortraitHeight) ||
            isLaptop
        ) {
            return 400
        } else {
            return 300
        }
    }

    const getProjectHeight = () => {
        if (
            (isTabletLandscape && isLandscape) ||
            (isTabletPortrait && isTabletPortraitHeight) ||
            isLaptop
        ) {
            return 450
        } else if (isLandscape) {
            return 240
        } else {
            return 430
        }
    }

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <main>{children}</main>
            <Work
                width={getWorkWidth()}
                height={getWorkHeight()}
                toolbar={getToolbarHeight()}
            />
            <About
                width={
                    (isTabletPortrait && isTabletPortraitHeight) ||
                    isTabletLandscape ||
                    isLaptop
                        ? 350
                        : 270
                }
                height={
                    (isTabletPortrait && isTabletPortraitHeight) ||
                    isTabletLandscape ||
                    isLaptop
                        ? 380
                        : 280
                }
                toolbar={getToolbarHeight()}
            />
            <Contact
                width={
                    (isTabletPortrait && isTabletPortraitHeight) ||
                    isTabletLandscape ||
                    isLaptop
                        ? 230
                        : 190
                }
                height={
                    (isTabletPortrait && isTabletPortraitHeight) ||
                    isTabletLandscape ||
                    isLaptop
                        ? 125
                        : 120
                }
                toolbar={getToolbarHeight()}
            />
            <UserSettings
                width={
                    (isTabletPortrait && isTabletPortraitHeight) ||
                    isTabletLandscape ||
                    isLaptop
                        ? 380
                        : 310
                }
                height={250}
                toolbar={getToolbarHeight()}
            />
            <Design
                width={getGallerySize()}
                height={getGallerySize()}
                toolbar={getToolbarHeight()}
                imageData={data.images}
            />
            <GNOS
                width={getProjectWidth()}
                height={getProjectHeight()}
                toolbar={getToolbarHeight()}
            />
            <Cadillac
                width={getProjectWidth()}
                height={getProjectHeight()}
                toolbar={getToolbarHeight()}
            />
            <Tripwire
                width={getProjectWidth()}
                height={getProjectHeight()}
                toolbar={getToolbarHeight()}
            />
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
