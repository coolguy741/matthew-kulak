import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectsCanvas from "../components/ProjectsCanvas"

const IndexPage = () => (
  <Layout>
    <SEO title="FRMR" />
    <ProjectsCanvas />
  </Layout>
)

export default IndexPage
