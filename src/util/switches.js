export const cssSwitch = param => {
    switch (param) {
        case "LIGHT":
            return styles.light
        case "DARK":
            return styles.dark
        case "SOLIS":
            return styles.solis
        case "TERMINAL":
            return styles.terminal
        case "ACID":
            return styles.acid
        default:
            return
    }
}
