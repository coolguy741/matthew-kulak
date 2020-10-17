import React, { useRef, useContext, useEffect } from "react"
import { connect } from "react-redux"
import { Stage, Container, Text, withApp } from "react-pixi-fiber"
import { GlitchFilter } from "@pixi/filter-glitch"
import { CRTFilter } from "@pixi/filter-crt"
import { StateContext } from "../layout"
import FullScreen from "../Canvas/FullScreen"
import styles from "../../styles/Canvas.module.css"
import { navigate } from "gatsby"

const Projects = props => {
  const containersRef = useRef(null)
  const stateContext = useContext(StateContext)

  const width = window.innerWidth
  const height = window.innerHeight
  const x = width * 0.5
  const y = height * 0.5

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

  const crtFilter = new CRTFilter({
    noise: 0.6,
    vignetting: 0.38,
    noiseSize: null,
    lineWidth: 0.1,
  })

  if (props.isDarkMode) {
    style.fill = 0xd3fc03
    crtFilter.noiseSize = 3
  } else {
    style.fill = 0x202020
    crtFilter.noiseSize = 1
  }

  const glitchFilters = []

  stateContext.projects.map((_, i) => {
    glitchFilters[i] = new GlitchFilter({
      seed: 0.8,
    })
  })

  useEffect(() => {
    let i
    for (i = 0; i < stateContext.projects.length; i++) {
      glitchFilters[i].slices = 0
    }

    const animateFilter = () => {
      crtFilter.seed = Math.random()
      crtFilter.time += 0.3
      for (i = 0; i < stateContext.projects.length; i++) {
        glitchFilters[i].offset = Math.random() * 7
      }
    }

    props.app.ticker.add(animateFilter)
  }, [])

  return (
    <Container filters={[crtFilter]}>
      {stateContext.projects.map((e, i) => {
        return (
          <Container filters={[glitchFilters[i]]} key={i} ref={containersRef}>
            <FullScreen x={0} y={0} width={width} height={height} />
            <Text
              key={e.slug}
              text={e.name}
              x={x}
              y={y + i * 90}
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
    </Container>
  )
}

const ProjectsWithApp = withApp(Projects)

const ProjectsCanvas = props => {
  const width = window.innerWidth
  const height = window.innerHeight

  return (
    <div className={styles.Canvas}>
      <Stage
        resizeTo={window}
        options={{
          backgroundColor: `${props.isDarkMode ? 0x202020 : 0xffffff}`,
          antialias: true,
          height: height,
          width: width,
        }}
      >
        <ProjectsWithApp {...props} />
      </Stage>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isDarkMode: state.darkMode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDarkModeToggle: () => dispatch({ type: "TOGGLE" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCanvas)
