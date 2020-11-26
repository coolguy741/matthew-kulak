import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import axios from "axios"
import styles from "../../../styles/toolbar.module.scss"

const Time = props => {
    const [weather, setWeather] = useState({
        temp: null,
        desc: null,
    })

    const cityName = "Canmore"

    useEffect(() => {
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.GATSBY_WEATHER_API}`
            )
            .then(response => {
                setWeather({
                    temp: Math.round(response.data.main.temp - 273.15),
                    desc: response.data.weather[0].main,
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
        <div className={`${styles.weather} ${cssSwitch(props.theme)}`}>
            <span className={styles.span}>
                {weather.temp} {weather.desc}
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps)(Time)
