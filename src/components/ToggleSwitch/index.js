import React from "react"
import { connect } from "react-redux"

import "../../styles/toggleswitch.scss"

const ToggleSwitch = ({ name, checked, onChange }) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        id={name}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner " />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isDarkMode: state.darkMode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSwitch)
