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
            name: "Basscoast",
            slug: "basscoast",
        },
    ],
    darkMode: false,
    isContactOpen: false,
    isAboutOpen: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DARKMODE_TOGGLE":
            return {
                ...state,
                darkMode: !state.darkMode,
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
        default:
            return state
    }
}

export default reducer
