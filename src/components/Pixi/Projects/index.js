import React, { useRef, useContext, useEffect } from "react"

import { Container, Text } from "react-pixi-fiber"
import { GlitchFilter } from "@pixi/filter-glitch"
import { StateContext } from "../../layout"
import { navigate } from "gatsby"

const Projects = props => {
  const width = window.innerWidth
  const height = window.innerHeight

  const containersRef = useRef(null)
  const stateContext = useContext(StateContext)

  let x = width * 0.5
  let y = height * 0.5

  let deltaY = 0

  const loadFonts = () => {
    return new Promise((resolve, rej) => {
      const fontsList = [
        new FontFace("Origami", "url(../assets/fonts/Origami.woff2)"),
      ]
      fontsList.forEach(fonts => {
        fonts.load().then(function (loadedFontFace) {
          document.fonts.add(loadedFontFace)
          document.body.style.fontFamily = "Origami"
        })
      })
      document.fonts.ready.then(() => {
        resolve()
      })
    })
  }

  // loadFonts()

  const style = {
    fill: null,
    fontFamily: "Origami",
    fontSize: 110,
    letterSpace: -4,
    dropShadow: true,
    dropShadowBlur: 7,
    dropShadowAlpha: 0.5,
    dropShadowDistance: 5,
  }

  console.log(props.isDarkMode)

  if (props.isDarkMode) {
    style.fill = 0xd3fc03
  } else {
    style.fill = 0x202020
  }

  const glitchFilters = []

  stateContext.projects.map((_, i) => {
    return (glitchFilters[i] = new GlitchFilter({
      seed: 0.8,
    }))
  })

  useEffect(() => {
    for (let i = 0; i < stateContext.projects.length; i++) {
      glitchFilters[i].slices = 0
    }

    const animate = () => {
      for (let i = 0; i < stateContext.projects.length; i++) {
        glitchFilters[i].offset = Math.random() * 7
      }
    }

    props.app.ticker.add(animate)
  }, [glitchFilters, props.app.ticker, stateContext.projects.length])

  props.app.view.addEventListener("wheel", data => (deltaY = data.deltaY))

  return (
    <>
      {stateContext.projects.map((e, i) => {
        return (
          <Container filters={[glitchFilters[i]]} key={i} ref={containersRef}>
            <Text
              key={e.slug}
              text={e.name}
              x={x}
              y={y + deltaY + i * 90}
              interactive="true"
              buttonMode="true"
              style={style}
              anchor="0.5"
              mouseover={() => {
                glitchFilters[i].slices = Math.floor(
                  Math.random() * Math.floor(5) + 45
                )
              }}
              mouseout={() => {
                glitchFilters[i].slices = 0
              }}
              mouseup={() => {
                navigate(`/work/${e.slug}`)
              }}
            />
          </Container>
        )
      })}
    </>
  )
}

export default Projects
