import React from "react"

import { createStore } from "redux"
import reducer from "./src/store/reducer"
import { Provider } from "react-redux"

const store = createStore(reducer)

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
)
