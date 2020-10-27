import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import ToggleSwitch from "../ToggleSwitch"
import styles from "../../styles/ControlPanel.module.css"
import axios from "axios"

const ControlPanel = props => {
  const [userData, setUserData] = useState({
    city: null,
    region: null,
    countryCode: null,
    lat: null,
    lon: null,
    timezone: null,
    isp: null,
  })

  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const fullTime = `${hours}:${minutes}`

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://ip-api.com/json/70.65.236.65"
      )
      .then(response => {
        setUserData({
          city: response.data.city,
          region: response.data.region,
          countryCode: response.data.countryCode,
          lat: response.data.lat,
          lon: response.data.lon,
          timezone: response.data.timezone,
          isp: response.data.isp,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div
      className={`${styles.ControlPanel} ${
        props.isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <ToggleSwitch
        name={"darkModeToggle"}
        checked={props.isDarkMode}
        onChange={props.onDarkModeToggle}
      />
      <div className={styles.timeLocation}>
        <span>
          {fullTime} IN {userData.city}, {userData.countryCode}
        </span>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
