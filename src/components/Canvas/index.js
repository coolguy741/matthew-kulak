import React, { useEffect } from "react"
import { connect } from "react-redux"

import { Stage, Container, withApp } from "react-pixi-fiber"
import { CRTFilter } from "@pixi/filter-crt"
import styles from "../../styles/Canvas.module.css"
import FullScreen from "../Canvas/FullScreen"

const Main = props => {
  const width = window.innerWidth
  const height = window.innerHeight

  const crtFilter = new CRTFilter({
    noise: 0.6,
    vignetting: 0.38,
    noiseSize: null,
    lineWidth: 0.1,
  })

  if (props.isDarkMode) {
    crtFilter.noiseSize = 3
  } else {
    crtFilter.noiseSize = 1
  }

  useEffect(() => {
    const animateFilter = () => {
      crtFilter.seed = Math.random()
      crtFilter.time += 0.3
    }

    props.app.ticker.add(animateFilter)
  }, [])

  return (
    <Container filters={[crtFilter]}>
      <FullScreen x={0} y={0} width={width} height={height} />
    </Container>
  )
}

const MainWithApp = withApp(Main)

const Canvas = props => {
  const width = window.innerWidth
  const height = window.innerHeight

  return (
    <div className={styles.Canvas}>
      <Stage
        options={{
          backgroundColor: `${props.isDarkMode ? 0x202020 : 0xffffff}`,
          antialias: true,
          height: height,
          width: width,
        }}
      >
        <MainWithApp {...props} />
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
