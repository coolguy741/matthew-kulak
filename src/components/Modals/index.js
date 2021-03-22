import React from "react"
import { motion, useDragControls } from "framer-motion"
import { connect } from "react-redux"
import styles from "../../styles/modals.module.scss"

const Modal = ({
    name,
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
            case "Contact":
                return props.isContactOpen
            case "Design":
                return props.isDesignOpen
            case "Settings":
                return props.isSettingsOpen
            case "Cadillac":
                return props.isCadillacOpen
            case "GNOS":
                return props.isGnosOpen
            case "Tripwire":
                return props.isTripwireOpen
        }
    }
    const isModalOpen = getIsOpen(name)

    const getZIndex = modal => {
        switch (modal) {
            case "About":
                return props.zIndexAbout
            case "Work":
                return props.zIndexWork
            case "Contact":
                return props.zIndexContact
            case "Design":
                return props.zIndexDesign
            case "Settings":
                return props.zIndexSettings
            case "Cadillac":
                return props.zIndexCadillac
            case "GNOS":
                return props.zIndexGnos
            case "Tripwire":
                return props.zIndexTripwire
        }
    }
    const zIndex = getZIndex(name)

    const getClass = modal => {
        switch (modal) {
            case "About":
                return styles.aboutModal
            case "Work":
                return styles.workModal
            case "Contact":
                return styles.contactModal
            case "Design":
                return styles.galleryModal
            case "Settings":
                return styles.settingsModal
            case "Cadillac":
                return styles.projectModal
            case "GNOS":
                return styles.projectModal
            case "Tripwire":
                return styles.projectModal
        }
    }

    const closeModal = modal => {
        switch (modal) {
            case "About":
                return props.onModalClose("CLOSE_ABOUT")
            case "Work":
                return props.onModalClose("CLOSE_WORK")
            case "Contact":
                return props.onModalClose("CLOSE_CONTACT")
            case "Design":
                return props.onModalClose("CLOSE_DESIGN")
            case "Settings":
                return props.onModalClose("CLOSE_SETTINGS")
            case "Cadillac":
                return props.onModalClose("CLOSE_CADILLAC")
            case "GNOS":
                return props.onModalClose("CLOSE_GNOS")
            case "Tripwire":
                return props.onModalClose("CLOSE_TRIPWIRE")
        }
    }

    const incZIndex = modal => {
        switch (modal) {
            case "About":
                return props.onIncZIndex("INC_Z_ABOUT")
            case "Work":
                return props.onIncZIndex("INC_Z_WORK")
            case "Contact":
                return props.onIncZIndex("INC_Z_CONTACT")
            case "Design":
                return props.onIncZIndex("INC_Z_DESIGN")
            case "Settings":
                return props.onIncZIndex("INC_Z_SETTINGS")
            case "Cadillac":
                return props.onIncZIndex("INC_Z_CADILLAC")
            case "GNOS":
                return props.onIncZIndex("INC_Z_GNOS")
            case "Tripwire":
                return props.onIncZIndex("INC_Z_TRIPWIRE")
        }
    }

    // Get window dimensions
    let windowWidth = 0
    let windowHeight = 0
    if (typeof window !== `undefined`) windowWidth = window.innerWidth
    if (typeof window !== `undefined`) windowHeight = window.innerHeight

    // Set modal position
    const getXPos = () => {
        const xPos = windowWidth - width
        if (xPos < 0) return 0
        return xPos
    }
    const getYPos = () => {
        const yPos = windowHeight - height - toolbar - 40
        if (yPos < 0) return 0
        return yPos
    }

    const xPos = getXPos() * Math.random()
    const yPos = getYPos() * Math.random()

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
        right: windowWidth - width,
        top: 0,
        bottom: getYPos(),
    }

    function startDrag(event) {
        incZIndex(name)
        dragControls.start(event)
    }

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraints}
            initial={{ x: xPos, y: yPos }}
            className={`
                ${styles.modal} 
                ${getClass(name)} 
                ${cssSwitch(props.theme)} 
                ${isModalOpen ? styles.modalVisible : styles.modalHidden}
            `}
            style={{
                zIndex: zIndex,
            }}
            onClick={() => incZIndex(name)}
        >
            <div className={styles.modalBar} onPointerDown={startDrag}>
                <span className={styles.heading}>{name}</span>
                <svg
                    width="12"
                    className={styles.close}
                    onMouseDown={onClickClose}
                    onClick={() => closeModal(name)}
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
            <div className={styles.body}>{children}</div>
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
        isContactOpen: state.isContactOpen,
        zIndexContact: state.zIndexes.contact,
        isDesignOpen: state.isDesignOpen,
        zIndexDesign: state.zIndexes.design,
        isSettingsOpen: state.isSettingsOpen,
        zIndexSettings: state.zIndexes.settings,
        isCadillacOpen: state.isCadillacOpen,
        zIndexCadillac: state.zIndexes.cadillac,
        isGnosOpen: state.isGnosOpen,
        zIndexGnos: state.zIndexes.gnos,
        isTripwireOpen: state.isTripwireOpen,
        zIndexTripwire: state.zIndexes.tripwire,
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
