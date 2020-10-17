const initialState = {
  projects: [
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
}

const reducer = (state = initialState, action) => {
  if (action.type === "TOGGLE") {
    return {
      ...state,
      darkMode: !state.darkMode,
    }
  }
  return state
}

export default reducer
