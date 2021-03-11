import React from "react"
import Slider from "react-slick"
import Modal from "../../Modals"
import Img from "gatsby-image"
import { connect } from "react-redux"

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

const Design = ({ width, height, toolbar, imageData }) => {
    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    // Gatsby images
    const images = imageData.nodes.map(e => e.childImageSharp)

    return (
        <Modal
            name={"Design"}
            width={width}
            height={height}
            toolbar={toolbar}
            imageData={imageData}
        >
            <Slider {...settings}>
                {images.map(image => (
                    <div>
                        <Img key={image.id} fluid={image.fluid} />
                    </div>
                ))}
            </Slider>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Design)
