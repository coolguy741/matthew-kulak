import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import axios from "axios"
import styles from "../../../styles/toolbar.module.scss"

const Time = props => {
    const [weather, setWeather] = useState({
        temp: null,
        desc: null,
    })

    const APIkey = "720cc76de16cef79bc83cf4b4a7eb0ec"
    const cityName = "Canmore"

    useEffect(() => {
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
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

    return (
        <div
            className={`${styles.weather} ${
                props.isDarkMode ? styles.weatherdark : ""
            }`}
        >
            <span className={styles.span}>
                {weather.temp} {weather.desc}
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkMode,
    }
}

export default connect(mapStateToProps)(Time)
