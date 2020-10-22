import { CustomPIXIComponent } from "react-pixi-fiber"
import * as PIXI from "pixi.js"

const TYPE = "Rectangle"

export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function (instance, oldProps, newProps) {
    const { x, y, width, height } = newProps
    instance.clear()
    // instance.beginFill(fill);
    instance.drawRect(x, y, width, height)
    // instance.endFill();
  },
}

const FullScreen = CustomPIXIComponent(behavior, TYPE)

export default FullScreen
