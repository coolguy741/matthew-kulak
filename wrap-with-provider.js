import React from "react"
import { Provider } from "react-redux"
import reducer from "./src/store/reducer"
import { createStore } from "redux"
import "./src/components/layout.scss"

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
    // Instantiating store in `wrapRootElement` handler ensures:
    //  - there is fresh store for each SSR page
    //  - it will be called only once in browser, when React mounts
    const store = createStore(reducer)

    return <Provider store={store}>{element}</Provider>
}
