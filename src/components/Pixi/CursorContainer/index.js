import React, { useState, useEffect } from "react"
import Cursor from "../Cursor/index"

const CursorContainer = props => {
  const [darkMode, setDarkMode] = useState(props.darkMode)
  const [cursor, setCursor] = useState(new Array(500).fill(null))
  var counter = 0

  useEffect(() => {
    const animate = () => {
      let x = props.app.renderer.plugins.interaction.mouse.global.x
      let y = props.app.renderer.plugins.interaction.mouse.global.y
      let radius = Math.random() * (20 * Math.random())
      let negOrPos1 = Math.random() < 0.5 ? -1 : 1
      let negOrPos2 = Math.random() < 0.5 ? -1 : 1
      let seed = Math.floor(Math.random() * 15) + 1
      counter++
      setCursor(prevState =>
        prevState
          .concat({ x, y, radius, negOrPos1, negOrPos2, seed, counter })
          .filter((_, i) => i !== 1)
      )
    }

    props.app.ticker.add(animate)
  }, [])

  useEffect(() => {
    setDarkMode(props.darkMode)
  }, [props.darkMode])

  return (
    <>
      {cursor.map((e, i) => {
        return (
          <Cursor
            key={e?.counter}
            x={e?.x}
            y={e?.y}
            radius={e?.radius}
            negOrPos1={e?.negOrPos1}
            negOrPos2={e?.negOrPos2}
            seed={e?.seed}
            darkMode={darkMode}
          />
        )
      })}
    </>
  )
}

export default CursorContainer
