import React, { useContext, useEffect } from "react"
import { connect } from "react-redux"

import { Stage, Container, withApp } from "react-pixi-fiber"
import { CRTFilter } from "@pixi/filter-crt"
import { StateContext } from "../../layout"
import FullScreen from "../FullScreen"
import styles from "../../../styles/Canvas.module.css"
import CursorContainer from "../CursorContainer"
import Projects from "../Projects"

const MainCanvas = props => {
  const width = window.innerWidth
  const height = window.innerHeight

  const stateContext = useContext(StateContext)

  const crtFilter = new CRTFilter({
    noise: 0.6,
    vignetting: 0.45,
    noiseSize: null,
    lineWidth: 0.1,
  })

  if (props.isDarkMode) {
    crtFilter.noiseSize = 3
  } else {
    crtFilter.noiseSize = 1
  }

  useEffect(() => {
    const animate = () => {
      crtFilter.seed = Math.random()
      crtFilter.time += 0.3
    }

    props.app.ticker.add(animate)
  }, [crtFilter.seed, crtFilter.time, props.app.ticker])

  return (
    <>
      <Container interactive={true} filters={[crtFilter]}>
        <FullScreen x={0} y={0} width={width} height={height} />
        {props.location ? (
          <Projects isDarkMode={props.isDarkMode} app={props.app} />
        ) : null}
      </Container>
      <CursorContainer app={props.app} darkMode={props.isDarkMode} />
    </>
  )
}

const CanvasWithApp = withApp(MainCanvas)

const Canvas = props => {
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
        <CanvasWithApp {...props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
