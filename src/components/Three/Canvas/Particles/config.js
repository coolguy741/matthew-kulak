/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
export default {
  showCube: false,
  dimension: "3D",
  velocity: 0.2,
  boundaryType: "bounce",
  antialias: false,
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1,
  },
  particles: {
    colorMode: "solid",
    color: "#2003fc",
    transparency: 1,
    shape: "circle",
    boundingBox: "canvas",
    count: 100,
    minSize: 1,
    maxSize: 10,
    visible: true,
  },
  cameraControls: {
    enabled: true,
    enableDamping: true,
    dampingFactor: 0.2,
    enableZoom: true,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    resetCameraFlag: false,
  },
}
