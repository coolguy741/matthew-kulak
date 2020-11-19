import React from "react"

import { createStore } from "redux"
import reducer from "./src/store/reducer"
import { Provider } from "react-redux"
import "./src/components/layout.scss"

const store = createStore(reducer)

export const onClientEntry = () => {
    document.getElementById("loader-wrapper").style.display = "block"
}
export const onPreRouteUpdate = () => {
    document.getElementById("loader-wrapper").style.display = "block"
}
export const onRouteUpdateDelayed = () => {
    document.getElementById("loader-wrapper").style.display = "block"
}
export const onRouteUpdate = () => {
    setTimeout(() => {
        document.getElementById("loader-wrapper").style.display = "none"
    }, 1000)
}

export const wrapRootElement = ({ element }) => (
    <Provider store={store}>{element}</Provider>
)
