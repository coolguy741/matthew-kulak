import React from "react"
import PropTypes from "prop-types"

import styles from "./styles/toolbar.module.scss"

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes}>
                <div id="loader-wrapper" className="loader-wrapper">
                    <div className="loader">
                        <svg
                            version="1.1"
                            viewBox="0 0 49.7 49.7"
                            fill-opacity="0"
                            width="90"
                        >
                            <g>
                                <g>
                                    <polygon
                                        className="loader-logo"
                                        points="20.2,21.9 33.3,35.1 33.3,26.6 28.6,21.9"
                                    />
                                </g>
                                <g>
                                    <g>
                                        <g>
                                            <polygon
                                                className="loader-logo"
                                                points="33.3,12.5 32.4,13.5 19.2,13.5 18.3,12.5 13.6,12.5 10.8,15.4 10.8,20 11.7,21 11.7,29.4 
						                        10.8,30.4 10.8,35.1 18.3,42.6 18.3,20 33.3,20 40.8,12.5"
                                            />
                                        </g>
                                    </g>
                                    <path
                                        id="loader-logo"
                                        d="M24.8,49.7c-6.6,0-12.9-2.6-17.6-7.3C2.6,37.7,0,31.5,0,24.8C0,18.2,2.6,12,7.3,7.3C12,2.6,18.2,0,24.8,0
				                        c6.6,0,12.9,2.6,17.6,7.3c4.7,4.7,7.3,10.9,7.3,17.6c0,6.6-2.6,12.9-7.3,17.6C37.7,47.1,31.5,49.7,24.8,49.7L24.8,49.7z M24.8,2.8
                                        C19,2.8,13.4,5.1,9.3,9.3C5.1,13.4,2.8,19,2.8,24.8c0,5.9,2.3,11.4,6.4,15.6c4.2,4.2,9.7,6.4,15.6,6.4c5.9,0,11.4-2.3,15.6-6.4
                                        c4.2-4.2,6.4-9.7,6.4-15.6c0-5.9-2.3-11.4-6.4-15.6C36.3,5.1,30.7,2.8,24.8,2.8L24.8,2.8z"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                {props.preBodyComponents}
                <div
                    key={`body`}
                    id="___gatsby"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                />
                {props.postBodyComponents}
            </body>
        </html>
    )
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
}
