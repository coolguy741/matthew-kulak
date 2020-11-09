import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import styles from "../../../styles/toolbar.module.scss"
import axios from "axios"

const Location = props => {
    const [userData, setUserData] = useState({
        city: null,
        region: null,
        countryCode: null,
        lat: null,
        lon: null,
        timezone: null,
        isp: null,
    })

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
        <>
            <span className={styles.span}>
                {userData.city} <br></br>
                {userData.region}, {userData.countryCode}
            </span>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Location)
