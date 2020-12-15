import React from "react"

import { connect } from "react-redux"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MainCanvas from "../components/Three/Canvas"

const IndexPage = props => {
    console.log(props)
    return (
        <Layout>
            <SEO title="FRMR" />
            {props.rendering && <MainCanvas location={props.location} />}
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        rendering: state.rendering,
    }
}

export default connect(mapStateToProps)(IndexPage)
