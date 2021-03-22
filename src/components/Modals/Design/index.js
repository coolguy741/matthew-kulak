import React from "react"
import Slider from "react-slick"
import Modal from "../../Modals"
import Img from "gatsby-image"
import { connect } from "react-redux"

const NextArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
            onClick={onClick}
            onKeyDown={onClick}
            role="button"
            aria-label="Next"
            tabIndex={0}
        />
    )
}

const PrevArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
            onClick={onClick}
            onKeyDown={onClick}
            role="button"
            aria-label="Previous"
            tabIndex={0}
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
                    <div key={image.fluid.src}>
                        <Img key={image.fluid.src} fluid={image.fluid} />
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
