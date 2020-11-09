import React from "react"

import Draggable from "react-draggable"
import { connect } from "react-redux"
import x from "../../../../assets/images/x.svg"
import styles from "../../../../styles/modals.module.scss"

class Tripwire extends React.Component {
    render() {
        const width = this.props.width / 3
        const height = this.props.height / 1.5

        const xPos = Math.random() * (this.props.width - width)
        const yPos = Math.random() * (this.props.height - height - 135) // Screen height minus modal, toolbars

        return (
            <Draggable
                handle=".handle"
                bounds="body"
                defaultPosition={{ x: xPos, y: yPos }}
            >
                <div
                    className={`${styles.modal} ${
                        this.props.isTripwireOpen
                            ? styles.modalVisible
                            : styles.modalHidden
                    }`}
                    style={{
                        zIndex: this.props.zIndex,
                    }}
                >
                    <div className={`${styles.modalBar} handle`}>
                        <span className={styles.heading}>Tripwire</span>
                        <img
                            className={styles.close}
                            onClick={this.props.onTripwireClose}
                            src={x}
                            width={12}
                        />
                    </div>
                    <div
                        className={styles.body}
                        style={{ height: height, width: width }}
                    >
                        <p>Tripwire is a sick clothing brand.</p>
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
        zIndex: state.zIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTripwireClose: () => dispatch({ type: "CLOSE_TRIPWIRE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tripwire)
