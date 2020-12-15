import React, { useEffect } from "react"

import { connect } from "react-redux"
import Layout from "../components/layout"
import { getGPUTier } from "detect-gpu"
import SEO from "../components/seo"
import MainCanvas from "../components/Three/Canvas"

const IndexPage = props => {
    // useEffect(() => {
    //     let isMounted = true // note this flag denote mount status

    //     ;(async () => {
    //         await getGPUTier()
    //     })().then(data => {
    //         console.log(data)
    //         // if (isMounted) props.setGpuTier(data)
    //     })
    //     console.log(props.gpu)

    //     return () => {
    //         isMounted = false
    //     } // use effect cleanup to set flag false, if unmounted
    // })

    useEffect(() => {
        ;(async () => {
            const gpuTier = await getGPUTier()

            props.setGpuTier(gpuTier)
        })()
    }, [])

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
        gpu: state.gpu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGpuTier: gpu => dispatch({ type: "SET_GPU_TIER", gpu: gpu }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
