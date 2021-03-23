import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const NotFoundPage = props => (
    <Layout>
        <SEO title="404: Not found" />
        <div class="errorContainer">
            <h1>404: Not Found</h1>
        </div>
    </Layout>
)

export default NotFoundPage
