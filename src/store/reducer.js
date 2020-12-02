const initialState = {
    projects: [
        {
            name: "Tripwire",
            slug: "tripwire",
        },
        {
            name: "GNOS Clothing",
            slug: "gnos",
        },
        {
            name: "Cadillac",
            slug: "cadillac",
        },
    ],
    zIndexes: {
        work: 0,
        about: 0,
        contact: 0,
        gnos: 0,
        cadillac: 0,
        tripwire: 0,
    },
    theme: "LIGHT",
    isContactOpen: false,
    isAboutOpen: false,
    isGNOSOpen: false,
    isCadillacOpen: false,
    isTripwireOpen: false,
}

// add 1 to the current (highest) z-index
const getNextZ = zIndexes => Math.max(...Object.values(zIndexes)) + 1

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INC_Z_WORK":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    work: getNextZ(state.zIndexes),
                },
            }
        case "INC_Z_ABOUT":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    about: getNextZ(state.zIndexes),
                },
            }
        case "INC_Z_CONTACT":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    contact: getNextZ(state.zIndexes),
                },
            }
        case "INC_Z_GNOS":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    gnos: getNextZ(state.zIndexes),
                },
            }
        case "INC_Z_CADILLAC":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    cadillac: getNextZ(state.zIndexes),
                },
            }
        case "INC_Z_TRIPWIRE":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    tripwire: getNextZ(state.zIndexes),
                },
            }
        case "LIGHT_THEME":
            return {
                ...state,
                theme: "LIGHT",
            }
        case "DARK_THEME":
            return {
                ...state,
                theme: "DARK",
            }
        case "GREY_THEME":
            return {
                ...state,
                theme: "GREY",
            }
        case "TERMINAL_THEME":
            return {
                ...state,
                theme: "TERMINAL",
            }
        case "ACID_THEME":
            return {
                ...state,
                theme: "ACID",
            }
        case "OPEN_WORK":
            return {
                ...state,
                isWorkOpen: true,
            }
        case "CLOSE_WORK":
            return {
                ...state,
                isWorkOpen: false,
            }
        case "OPEN_ABOUT":
            return {
                ...state,
                isAboutOpen: true,
            }
        case "CLOSE_ABOUT":
            return {
                ...state,
                isAboutOpen: false,
            }
        case "OPEN_CONTACT":
            return {
                ...state,
                isContactOpen: true,
            }
        case "CLOSE_CONTACT":
            return {
                ...state,
                isContactOpen: false,
            }
        case "OPEN_GNOS":
            return {
                ...state,
                isGNOSOpen: true,
            }
        case "CLOSE_GNOS":
            return {
                ...state,
                isGNOSOpen: false,
            }
        case "OPEN_CADILLAC":
            return {
                ...state,
                isCadillacOpen: true,
            }
        case "CLOSE_CADILLAC":
            return {
                ...state,
                isCadillacOpen: false,
            }
        case "OPEN_TRIPWIRE":
            return {
                ...state,
                isTripwireOpen: true,
            }
        case "CLOSE_TRIPWIRE":
            return {
                ...state,
                isTripwireOpen: false,
            }
        default:
            return state
    }
}

export default reducer
