import React, { useState } from "react"
import { motion, useDragControls } from "framer-motion"
import { connect } from "react-redux"
import styles from "../../styles/modals.module.scss"

const Modal = ({
    modalName,
    modalClass,
    width,
    height,
    toolbar,
    imageData,
    children,
    ...props
}) => {
    // Set modal variables
    const getIsOpen = modal => {
        switch (modal) {
            case "About":
                return props.isAboutOpen
            case "Work":
                return props.isWorkOpen
        }
    }
    const isModalOpen = getIsOpen(modalName)

    const getZIndex = modal => {
        switch (modal) {
            case "About":
                return props.zIndexAbout
            case "Work":
                return props.zIndexWork
        }
    }
    const zIndex = getZIndex(modalName)

    const getClass = modal => {
        switch (modal) {
            case "About":
                return styles.about
            case "About":
                return styles.work
        }
    }

    const closeModal = modal => {
        switch (modal) {
            case "About":
                return props.onModalClose("CLOSE_ABOUT")
            case "Work":
                return props.onModalClose("CLOSE_WORK")
        }
    }

    const incZIndex = modal => {
        switch (modal) {
            case "About":
                return props.onIncZIndex("INC_Z_ABOUT")
            case "Work":
                return props.onIncZIndex("INC_Z_WORK")
        }
    }

    // Get window dimensions
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    // Position
    const getYPos = () => {
        const yPos = innerHeight - height - toolbar - 40
        if (yPos < 0) return 0
        return yPos
    }

    const xPos = Math.random() * (innerWidth - width)
    const yPos = Math.random() * getYPos()

    // Prevent z-index increment when closing modal
    const onClickClose = e => {
        e.stopPropagation()
    }

    // CSS theme switch
    const cssSwitch = param => {
        switch (param) {
            case "LIGHT":
                return styles.light
            case "DARK":
                return styles.dark
            case "SOLIS":
                return styles.solis
            case "TERMINAL":
                return styles.terminal
            case "ACID":
                return styles.acid
            default:
                return
        }
    }

    // Framer motion drag
    const dragControls = useDragControls()
    const constraints = {
        left: 0,
        right: innerWidth - width,
        top: 0,
        bottom: getYPos(),
    }

    function startDrag(event) {
        incZIndex(modalName)
        dragControls.start(event)
    }

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraints}
            className={`
                ${styles.modal} 
                ${getClass(modalName)} 
                ${cssSwitch(props.theme)} 
                ${isModalOpen ? styles.modalVisible : styles.modalHidden}
            `}
            style={{
                zIndex: zIndex,
            }}
            onClick={() => incZIndex(modalName)}
        >
            <div className={styles.modalBar} onPointerDown={startDrag}>
                <span className={styles.heading}>{modalName}</span>
                <svg
                    width="12"
                    className={styles.close}
                    onMouseDown={onClickClose}
                    onClick={() => closeModal(modalName)}
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
            <div className={styles.body} dragListener={false}>
                {children}
            </div>
        </motion.div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        isAboutOpen: state.isAboutOpen,
        zIndexAbout: state.zIndexes.about,
        isWorkOpen: state.isWorkOpen,
        zIndexWork: state.zIndexes.work,
        // anchor: state.modalAnchor,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: payload => dispatch({ type: payload }),
        onIncZIndex: payload => dispatch({ type: payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
