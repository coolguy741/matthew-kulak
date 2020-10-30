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
  darkMode: true,
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
