import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MainCanvas from "../components/Three/Canvas"

const IndexPage = props => {
  return (
    <Layout>
      <SEO title="FRMR" />
      <MainCanvas location={props.location} />
    </Layout>
  )
}

export default IndexPage
