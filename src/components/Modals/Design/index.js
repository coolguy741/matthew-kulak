import React from "react"

import Draggable from "react-draggable"
import Slider from "react-slick"
import Img from "gatsby-image"
import { connect } from "react-redux"
import styles from "../../../styles/modals.module.scss"

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

class Design extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const innerWidth = window.innerWidth
        const innerHeight = window.innerHeight

        const getYPos = () => {
            const yPos =
                innerHeight - this.props.height - this.props.toolbar - 40
            if (yPos < 0) {
                return 0
            } else {
                return yPos
            }
        }

        const xPos = Math.random() * (innerWidth - this.props.width)
        const yPos = Math.random() * getYPos()

        const settings = {
            dots: false,
            infinite: true,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        }

        const images = this.props.imageData.nodes.map(e => e.childImageSharp)

        const dragHandlers = { onStart: this.onStart }

        const onClickClose = e => {
            e.stopPropagation() // Stop z-index increment on mouse down if closing modal
        }

        const cssSwitch = param => {
            switch (param) {
                case "LIGHT":
                    return styles.light
                case "DARK":
                    return styles.dark
                case "GREY":
                    return styles.grey
                case "TERMINAL":
                    return styles.terminal
                case "ACID":
                    return styles.acid
                default:
                    return
            }
        }

        return (
            <Draggable
                handle=".handle"
                bounds="body"
                defaultPosition={{ x: xPos, y: yPos }}
                {...dragHandlers}
            >
                <div
                    className={`${styles.modal} ${
                        styles.galleryModal
                    } ${cssSwitch(this.props.theme)} ${
                        this.props.isDesignOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                    onClick={this.props.onIncZIndex}
                >
                    <div
                        className={`${styles.modalBar} ${cssSwitch(
                            this.props.theme
                        )} handle`}
                    >
                        <span className={styles.heading}>Design</span>
                        <svg
                            width="12"
                            className={styles.close}
                            onMouseDown={onClickClose}
                            onClick={this.props.onDesignClose}
                            viewBox="0 0 32.78 32.78"
                        >
                            <rect
                                className={styles.xPath}
                                x="-2.61"
                                y="12.21"
                                width="38"
                                height="8.36"
                                transform="translate(16.39 -6.79) rotate(45)"
                            />
                            <rect
                                className={styles.xPath}
                                x="-2.61"
                                y="12.21"
                                width="38"
                                height="8.36"
                                transform="translate(39.57 16.39) rotate(135)"
                            />
                        </svg>
                    </div>
                    <div className={styles.body}>
                        <Slider {...settings}>
                            {images.map(image => (
                                <div>
                                    <Img key={image.id} fluid={image.fluid} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        isDesignOpen: state.isDesignOpen,
        zIndex: state.zIndexes.design,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDesignClose: () => dispatch({ type: "CLOSE_DESIGN" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_DESIGN" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Design)
