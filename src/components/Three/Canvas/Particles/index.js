/* eslint-disable no-shadow */
import React, { useRef, useMemo } from "react"
import PropTypes from "prop-types"
import { AdditiveBlending } from "three"
import { useFrame, useThree } from "react-three-fiber"
import animate from "../../../../lib/animate"
import computeParticles from "../../../../lib/computeParticles"

// Default Cube dimensions
const r = 400

/**
 * Creates a particle cloud with various config options
 */
const ParticleField = ({
  particles,
  lines,
  direction,
  showCube,
  cameraControls,
  dimension,
  velocity,
  boundaryType,
}) => {
  //   const controlsRef = useRef(0)
  const animation = useRef(0)
  const group = useRef()

  const { gl, canvas, camera, size } = useThree()
  // Scale rendering automatically to window DPI
  // Pass this value to fragment shaders: gl_PointSize needs to scale against this value
  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio
  const devicePixelRatio = window.devicePixelRatio.toFixed(1)
  gl.setPixelRatio(devicePixelRatio)

  // Default distance from camera to particle field
  const distToParticles = 1750

  // Compute point cloud
  const [
    pointCloudGeometry,
    pointMaterial,
    particlesData,
    particlePositions,
    bounds,
  ] = useMemo(
    () =>
      computeParticles({
        particles,
        dimension,
        devicePixelRatio,
        direction,
        size,
        r,
        velocity,
      }),
    [particles, dimension, direction, devicePixelRatio, size, velocity]
  )

  // Assign state to animation ref
  // This object is passed to Animation.js in render loop
  animation.current = {
    particleCount: particles.count,
    bounds,
    pointCloudGeometry,
    particlesData,
    particlePositions,
    boundaryType,
  }

  // Direct access to render loop, executes on each frame
  // State changes must be passed into hook via refs
  // useRender() contents are called in a requestAnimationFrame()
  useFrame(() => {
    // Animate current state of particles + lines
    animate(animation.current)
    // console.log("use render")
  })

  return (
    <group ref={group}>
      {/* Bounding box that particles exist inside of */}
      {showCube && (
        <boxHelper>
          <mesh name="object">
            <meshBasicMaterial
              attach="material"
              color="white"
              blending={AdditiveBlending}
              wireframe
              transparent
            />
            <boxBufferGeometry attach="geometry" args={[r, r, r]} />
          </mesh>
        </boxHelper>
      )}

      {/* Particles */}
      {particles.visible && (
        <points geometry={pointCloudGeometry} material={pointMaterial} />
      )}
    </group>
  )
}

ParticleField.propTypes = {
  showCube: PropTypes.bool.isRequired,
  dimension: PropTypes.oneOf(["2D", "3D"]).isRequired,
  boundaryType: PropTypes.oneOf(["bounce", "passthru"]).isRequired,
  velocity: PropTypes.number.isRequired,
  direction: PropTypes.shape({
    xMin: PropTypes.number,
    xMax: PropTypes.number,
    yMin: PropTypes.number,
    yMax: PropTypes.number,
    zMin: PropTypes.number,
    zMax: PropTypes.number,
  }).isRequired,
  lines: PropTypes.shape({
    colorMode: PropTypes.oneOf(["rainbow", "solid"]),
    color: PropTypes.string,
    transparency: PropTypes.number,
    maxConnections: PropTypes.number,
    limitConnections: PropTypes.bool,
    minDistance: PropTypes.number,
    visible: PropTypes.bool,
  }).isRequired,
  particles: PropTypes.shape({
    count: PropTypes.number,
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
    boundingBox: PropTypes.oneOf(["canvas", "cube"]),
    shape: PropTypes.oneOf(["circle", "square"]),
    colorMode: PropTypes.oneOf(["rainbow", "solid"]),
    color: PropTypes.string,
    transparency: PropTypes.number,
    visible: PropTypes.bool,
  }).isRequired,
  cameraControls: PropTypes.shape({
    enabled: PropTypes.bool,
    enableDamping: PropTypes.bool,
    dampingFactor: PropTypes.number,
    enableZoom: PropTypes.bool,
    autoRotate: PropTypes.bool,
    autoRotateSpeed: PropTypes.number,
    resetCameraFlag: PropTypes.bool,
  }).isRequired,
}

export default ParticleField
