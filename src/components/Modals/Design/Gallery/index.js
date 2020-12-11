import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Slider from "react-slick"
import styles from "../../../../styles/modals.module.scss"

const NextArrow = props => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
            onClick={onClick}
        />
    )
}

const PrevArrow = props => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
            onClick={onClick}
        />
    )
}

const Gallery = () => {
    const data = useStaticQuery(graphql`
        query Images {
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

    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    const images = data.images.nodes.map(e => e.childImageSharp)

    console.log(images)

    return (
        <Slider {...settings}>
            {images.map(image => (
                <div>
                    <Img key={image.id} fluid={image.fluid} />
                </div>
            ))}
        </Slider>
    )
}

export default Gallery
