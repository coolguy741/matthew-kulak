import { CustomPIXIComponent } from "react-pixi-fiber"
import * as PIXI from "pixi.js"
import { TweenLite } from "gsap"

const TYPE = "Cursor"

export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function (g, _, props) {
    const { x, y, seed, darkMode } = props
    g.clear()
    g.beginFill(darkMode ? 0x7225e6 : 0xd3fc03, 1)
    g.drawCircle(
      x + Math.random() * 12 * (Math.random() < 0.5 ? -1 : 1),
      y + Math.random() * 12 * (Math.random() < 0.5 ? -1 : 1),
      seed
    )
    TweenLite.to(g, {
      delay: 5,
      duration: 3,
      alpha: 0,
    })
    g.endFill()
  },
}

const Cursor = CustomPIXIComponent(behavior, TYPE)

export default Cursor
