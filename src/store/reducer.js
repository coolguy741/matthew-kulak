const initialState = {
    zIndexes: {
        work: 0,
        about: 0,
        contact: 0,
        settings: 0,
        design: 0,
        gnos: 0,
        cadillac: 0,
        tripwire: 0,
    },
    aboutAnchor: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    },
    gpu: {},
    theme: "DARK",
    isContactOpen: false,
    isAboutOpen: false,
    isSettingsOpen: false,
    isDesignOpen: false,
    isGnosOpen: false,
    isCadillacOpen: false,
    isTripwireOpen: false,
    isThemePickerOpen: false,
    isSliderOpen: false,
    sliderPos: 0,
    rendering: true,
    animating: true,
    fxaa: true,
    hudRef: {},
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
        case "INC_Z_SETTINGS":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    settings: getNextZ(state.zIndexes),
                },
            }
        case "INC_Z_DESIGN":
            return {
                ...state,
                zIndexes: {
                    ...state.zIndexes,
                    design: getNextZ(state.zIndexes),
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
        case "SOLIS_THEME":
            return {
                ...state,
                theme: "SOLIS",
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
        case "OPEN_SETTINGS":
            return {
                ...state,
                isSettingsOpen: true,
            }
        case "CLOSE_SETTINGS":
            return {
                ...state,
                isSettingsOpen: false,
            }
        case "OPEN_DESIGN":
            return {
                ...state,
                isDesignOpen: true,
            }
        case "CLOSE_DESIGN":
            return {
                ...state,
                isDesignOpen: false,
            }
        case "OPEN_GNOS":
            return {
                ...state,
                isGnosOpen: true,
            }
        case "CLOSE_GNOS":
            return {
                ...state,
                isGnosOpen: false,
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
        case "TOGGLE_THEME_PICKER":
            return {
                ...state,
                isSliderOpen: false,
                isThemePickerOpen: !state.isThemePickerOpen,
            }
        case "TOGGLE_SLIDER":
            return {
                ...state,
                isSliderOpen: !state.isSliderOpen,
                isThemePickerOpen: false,
            }
        case "CLOSE_SLIDER":
            return {
                ...state,
                isSliderOpen: false,
            }
        case "CLOSE_THEME_PICKER":
            return {
                ...state,
                isThemePickerOpen: false,
            }
        case "SET_SLIDER_POS":
            return {
                ...state,
                sliderPos: action.val,
            }
        case "SET_ABOUT_ANCHOR":
            return {
                ...state,
                aboutAnchor: {
                    top: action.top,
                    left: action.left,
                    width: action.width,
                    height: action.height,
                },
            }
        case "TOGGLE_RENDERING":
            return {
                ...state,
                rendering: !state.rendering,
            }
        case "TOGGLE_ANIMATING":
            return {
                ...state,
                animating: !state.animating,
            }
        case "TOGGLE_FXAA":
            return {
                ...state,
                fxaa: !state.fxaa,
            }
        case "SET_GPU_TIER":
            return {
                ...state,
                gpu: action.gpu,
            }
        case "SET_HUD_REF":
            return {
                ...state,
                hudRef: action.ref,
            }
        default:
            return state
    }
}

export default reducer
