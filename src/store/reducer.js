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
    darkMode: false,
    isContactOpen: false,
    isAboutOpen: false,
    isGNOSOpen: false,
    isCadillacOpen: false,
    isTripwireOpen: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DARKMODE_TOGGLE":
            return {
                ...state,
                darkMode: !state.darkMode,
            }
        case "TOGGLE_WORK":
            return {
                ...state,
                isWorkOpen: !state.isWorkOpen,
            }
        case "CLOSE_WORK":
            return {
                ...state,
                isWorkOpen: false,
            }
        case "TOGGLE_ABOUT":
            return {
                ...state,
                isAboutOpen: !state.isAboutOpen,
            }
        case "CLOSE_ABOUT":
            return {
                ...state,
                isAboutOpen: false,
            }
        case "TOGGLE_CONTACT":
            return {
                ...state,
                isContactOpen: !state.isContactOpen,
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
