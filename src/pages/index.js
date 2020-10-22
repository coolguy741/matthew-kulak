import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Canvas from "../components/Pixi/Canvas"

const IndexPage = props => {
  return (
    <Layout>
      <SEO title="FRMR" />
      <Canvas location={props.location} />
    </Layout>
  )
}

export default IndexPage
