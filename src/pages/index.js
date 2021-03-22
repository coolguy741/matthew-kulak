import React, { useEffect } from "react"
import { connect } from "react-redux"
import Layout from "../components/Layout"
import { getGPUTier } from "detect-gpu"
import SEO from "../components/seo"
import MainCanvas from "../components/Three/Canvas"
import { easterEgg } from "../util/easteregg"

const IndexPage = props => {
    useEffect(() => {
        ;(async () => {
            const gpuTier = await getGPUTier()

            props.setGpuTier(gpuTier)
        })()
    }, [])

    if (typeof window !== `undefined`) window.easterEgg = easterEgg

    return (
        <Layout>
            <SEO title="FRMR" />
            {props.rendering && <MainCanvas hudRef={props.hudRef} />}
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        rendering: state.rendering,
        gpu: state.gpu,
        hudRef: state.hudRef,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGpuTier: gpu => dispatch({ type: "SET_GPU_TIER", gpu: gpu }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
