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

    const cssSwitch = param => {
        switch (param) {
            case "LIGHT":
                return styles.light
            case "DARK":
                return styles.dark
            case "GREY":
                return styles.grey
            default:
                return
        }
    }

    return (
        <div className={`${styles.location} ${cssSwitch(props.theme)}`}>
            <span className={styles.span}>
                {userData.city} <br></br>
                {userData.region}, {userData.countryCode}
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Location)
