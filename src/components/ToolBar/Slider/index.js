import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import ReactSlider from "react-slider"
import { useMediaQuery } from "react-responsive"
import { motion } from "framer-motion"
import styles from "../../../styles/toolbar.module.scss"

const Slider = props => {
    const [isOpen, setIsOpen] = useState(false)

    const isLandscapeTabletOrLaptop = useMediaQuery({
        query: "(min-width: 821px)",
    })

    const drawerOffset = isLandscapeTabletOrLaptop ? "-300%" : "-400%"

    const variants = {
        open: { y: drawerOffset },
        closed: { y: "0" },
    }

    return (
        <motion.div
            // onClick={() => setIsOpen(!isOpen)}
            className={styles.sliderContainer}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
        >
            <div className={styles.iconContainer}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 158.16 144.48"
                    width="40"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <path
                        className={styles.themePickerPath}
                        d="M79,144.45q-33.75,0-67.49,0c-4.13,0-7.67-1.15-9.8-4.79a11.88,11.88,0,0,1-1.63-5.63Q-.06,72.19,0,10.32A9.91,9.91,0,0,1,10.08.08c10.33-.15,20.67,0,31-.06,3.17,0,5.31,1.8,7,4.14s3.53,5.05,5.18,7.65a4.1,4.1,0,0,0,3.94,2q44.62-.07,89.24,0c7.64,0,11.67,4,11.67,11.73q0,53.63,0,107.24c0,7.7-4,11.72-11.67,11.72Q112.73,144.47,79,144.45ZM79.18,37.8H12.43c-4.84,0-5.58.75-5.58,5.69q0,44.25,0,88.49c0,4.89.77,5.66,5.63,5.66q66.61,0,133.23,0c4.76,0,5.6-.81,5.6-5.46v-89c0-4.57-.84-5.39-5.39-5.39Zm72.13-6.69V25.9c0-4.49-.75-5.22-5.25-5.23-29.66,0-59.32-.05-89,.07A10.35,10.35,0,0,1,47.8,16c-1.69-2.47-3.2-5.08-5.06-7.42A4.92,4.92,0,0,0,39.45,6.9c-9.33-.13-18.66-.09-28-.06C8,6.84,6.87,8,6.85,11.52c0,5.83,0,11.66,0,17.49,0,.73.11,1.45.15,2.1Z"
                    />
                    <path
                        className={styles.themePickerPath}
                        d="M96.38,95.21l13.08,7.55A33.73,33.73,0,0,0,81.68,54.63v15.1a18.69,18.69,0,0,1,14.7,25.48Z"
                    />
                    <path
                        className={styles.themePickerPath}
                        d="M51.31,107.27a33.67,33.67,0,0,0,55.54,0L93.77,99.71a18.62,18.62,0,0,1-29.38,0Z"
                    />
                    <path
                        className={styles.themePickerPath}
                        d="M76.48,54.63A33.67,33.67,0,0,0,45.42,88.21a33.32,33.32,0,0,0,3.28,14.55l13.08-7.55a18.67,18.67,0,0,1,14.7-25.48Z"
                    />
                </svg>
            </div>
            <div className={styles.drawer}>
                <ReactSlider
                    className={styles.slider}
                    thumbClassName={styles.sliderThumb}
                    trackClassName={styles.sliderTrack}
                    defaultValue={[0]}
                    ariaLabel={["Slider"]}
                    orientation="vertical"
                    invert
                    onChange={val => props.setSliderPos(val)}
                />
                <div className={styles.return}>
                    <svg
                        version="1.1"
                        id="Capa_1"
                        viewBox="0 0 925.551 925.552"
                    >
                        <g>
                            <path
                                className={styles.returnPath}
                                d="M768.051,127.108H142.044c-28.995,0-52.5,23.505-52.5,52.5s23.505,52.5,52.5,52.5h626.008c28.947,0,52.5,23.552,52.5,52.5
                                    v224.743c0,28.947-23.553,52.5-52.5,52.5H179.838l41.689-42.192c20.38-20.625,20.18-53.865-0.445-74.244
                                    c-20.624-20.38-53.866-20.181-74.244,0.445L15.155,579.132c-20.38,20.625-20.18,53.865,0.445,74.244L147.08,783.288
                                    c10.231,10.11,23.566,15.155,36.897,15.155c13.541-0.001,27.078-5.207,37.347-15.601c20.38-20.625,20.181-53.865-0.445-74.244
                                    l-42.25-41.747h589.423c86.846,0,157.5-70.654,157.5-157.5V284.608C925.551,197.762,854.897,127.108,768.051,127.108z"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </motion.div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        sliderPos: state.sliderPos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSliderPos: val => dispatch({ type: "SET_SLIDER_POS", val: val }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)
