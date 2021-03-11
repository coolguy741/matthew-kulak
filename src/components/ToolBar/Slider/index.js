import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
import ReactSlider from "react-slider"
import { useMediaQuery } from "react-responsive"
import { motion } from "framer-motion"
import styles from "../../../styles/toolbar.module.scss"

const Slider = props => {
    // Refs
    const wrapperRef = useRef(null)

    // Responsive framer motion
    const isLandscapeTabletOrLaptop = useMediaQuery({
        query: "(min-width: 821px)",
    })

    const drawerOffset = isLandscapeTabletOrLaptop ? "-300%" : "-400%"

    const variants = {
        open: { y: drawerOffset },
        closed: { y: "0" },
    }

    // Close toolbar drawer if there is a click outside of the element
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                props.closeSlider()
            }
        }

        document.addEventListener("mouseup", handleClickOutside)
        return () => {
            document.removeEventListener("mouseup", handleClickOutside)
        }
    }, [wrapperRef])

    return (
        <motion.div
            ref={wrapperRef}
            className={styles.sliderContainer}
            animate={props.isSliderOpen ? "open" : "closed"}
            variants={variants}
            transition={{ type: "spring", stiffness: 3000, damping: 220 }}
        >
            <div
                className={styles.toolbarClickHandler}
                onClick={() => props.toggleSlider()}
            >
                <div className={styles.iconContainer}>
                    <svg viewBox="0 0 158.14 144.5">
                        <path
                            className={styles.sliderPath}
                            d="M47.05,54.27a9.14,9.14,0,0,1-9.11-8.58l-.06-.94H27.65a2.5,2.5,0,0,1,0-5H37.88l.06-.94a9.14,9.14,0,0,1,9.11-8.58h5.77a9.14,9.14,0,0,1,9.1,8.58l.06.94h71.61a2.5,2.5,0,0,1,0,5H62l-.06.94a9.14,9.14,0,0,1-9.1,8.58Zm0-19A4.15,4.15,0,0,0,43,38.55a4.54,4.54,0,0,0-.08.81v5.78A4.54,4.54,0,0,0,43,46a4.15,4.15,0,0,0,4.06,3.32h5.77a4.14,4.14,0,0,0,4-3.32,3.83,3.83,0,0,0,.08-.81V39.36a3.68,3.68,0,0,0-.08-.8,4.14,4.14,0,0,0-4-3.33Z"
                        />
                        <path
                            className={styles.sliderPath}
                            d="M105.45,84.27a9.14,9.14,0,0,1-9.11-8.58l-.06-.94H27.65a2.5,2.5,0,0,1,0-5H96.28l.06-.94a9.14,9.14,0,0,1,9.11-8.58h5.77a9.14,9.14,0,0,1,9.11,8.58l0,.94h13.21a2.5,2.5,0,0,1,0,5H120.38l0,.94a9.14,9.14,0,0,1-9.11,8.58Zm0-19a4.15,4.15,0,0,0-4.06,3.32,4.54,4.54,0,0,0-.08.81v5.78a4.43,4.43,0,0,0,.08.8,4.15,4.15,0,0,0,4.06,3.33h5.77a4.13,4.13,0,0,0,4-3.32,3.86,3.86,0,0,0,.09-.81V69.36a4.43,4.43,0,0,0-.08-.8,4.16,4.16,0,0,0-4.06-3.33Z"
                        />
                        <path
                            className={styles.sliderPath}
                            d="M68.21,114.27a9.14,9.14,0,0,1-9.1-8.58l-.06-.94H27.65a2.5,2.5,0,0,1,0-5h31.4l.06-.94a9.14,9.14,0,0,1,9.1-8.58H74a9.14,9.14,0,0,1,9.1,8.58l.06.94h50.44a2.5,2.5,0,0,1,0,5H83.15l-.06.94a9.14,9.14,0,0,1-9.1,8.58Zm0-19a4.14,4.14,0,0,0-4,3.32,4.63,4.63,0,0,0-.08.81v5.78a4.43,4.43,0,0,0,.08.8,4.14,4.14,0,0,0,4,3.33H74A4.14,4.14,0,0,0,78,106a4.63,4.63,0,0,0,.08-.81V99.36a4.43,4.43,0,0,0-.08-.8A4.14,4.14,0,0,0,74,95.23Z"
                        />
                    </svg>
                </div>
            </div>
            <div className={styles.drawer}>
                <div className={styles.sliderDrawer}>
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
                </div>
                <div
                    className={styles.return}
                    onClick={() => props.toggleSlider()}
                >
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
        sliderPos: state.sliderPos,
        isSliderOpen: state.isSliderOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSliderPos: val => dispatch({ type: "SET_SLIDER_POS", val: val }),
        toggleSlider: () => dispatch({ type: "TOGGLE_SLIDER" }),
        closeSlider: () => dispatch({ type: "CLOSE_SLIDER" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)
