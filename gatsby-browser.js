import wrapWithProvider from "./wrap-with-provider"
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
    document.getElementById("loader-wrapper").style.transition =
        "background-color 2s"

    document.getElementById("loader-logo").style.transition =
        "fill-opacity 1.5s"

    document.getElementsByClassName("loader-logo")[0].style.transition =
        "fill-opacity 1.5s"

    document.getElementsByClassName("loader-logo")[1].style.transition =
        "fill-opacity 1.5s"

    setTimeout(() => {
        document.getElementsByClassName("loader-logo")[0].style.fillOpacity = 0
        document.getElementsByClassName("loader-logo")[1].style.fillOpacity = 0
        document.getElementById("loader-logo").style.fillOpacity = 0
    }, 1500)

    setTimeout(() => {
        document.getElementById("loader-wrapper").style.backgroundColor =
            "transparent"
    }, 2500)

    setTimeout(() => {
        document.getElementById("loader-wrapper").style.display = "none"
    }, 4000)
}

export const wrapRootElement = wrapWithProvider
