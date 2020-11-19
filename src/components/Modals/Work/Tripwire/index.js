import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import tripwire from "../../../../assets/images/tripwire.svg"
import x from "../../../../assets/images/x.svg"
import xWhite from "../../../../assets/images/x-white.svg"
import styles from "../../../../styles/modals.module.scss"

class Tripwire extends React.Component {
    onStart = () => {
        this.props.onIncZIndex()
    }

    render() {
        const width = this.props.width / 3
        const height = this.props.height / 1.5

        const xPos = Math.random() * (this.props.width - width)
        const yPos = Math.random() * (this.props.height - height - 135) // Screen height minus modal, toolbars

        const dragHandlers = { onStart: this.onStart }

        return (
            <Draggable
                handle=".handle"
                bounds="body"
                defaultPosition={{ x: xPos, y: yPos }}
                {...dragHandlers}
            >
                <div
                    className={`${styles.modal} ${
                        this.props.isDarkMode ? styles.modaldark : ""
                    } ${
                        this.props.isTripwireOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                    onClick={this.props.onIncZIndex}
                >
                    <div
                        className={`${styles.modalBar} ${
                            this.props.isDarkMode ? styles.modalBardark : ""
                        } handle`}
                    >
                        <span className={styles.heading}>Tripwire</span>
                        <img
                            className={styles.close}
                            onClick={this.props.onTripwireClose}
                            src={this.props.isDarkMode ? xWhite : x}
                            width={12}
                        />
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <img src={tripwire} width={120} />
                        <p>
                            Tripwire is an open-source project which fetches
                            adventure tour data from the G-Adventures API and
                            maps the locational itinerary data to a Mapbox
                            instance.
                        </p>
                        <h4>Tech Stack</h4>
                        <ul>
                            <li>
                                <span>React</span>
                            </li>
                            <li>
                                <span>Next.js</span>
                            </li>
                            <li>
                                <span>GraphQL</span>
                            </li>
                            <li>
                                <span>Apollo Server/Client</span>
                            </li>
                        </ul>
                        <div className={styles.btnContainer}>
                            <a className={styles.btn} href="#" target="_blank">
                                View Live
                            </a>
                            <a
                                className={styles.btn}
                                href="https://github.com/frmr1/tripwire"
                                target="_blank"
                            >
                                View Source
                            </a>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
        isTripwireOpen: state.isTripwireOpen,
        zIndex: state.zIndexes.tripwire,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTripwireClose: () => dispatch({ type: "CLOSE_TRIPWIRE" }),
        onIncZIndex: () => dispatch({ type: "INC_Z_TRIPWIRE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tripwire)
