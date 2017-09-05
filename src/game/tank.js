import Motion from '../lib/motion'
import config from "./config";
import Bmob from './bmob'

import {correction, getOffset} from '../lib/coordinate'
import {userCtrl} from "../lib/canvas";
import {stopGame} from "./index";
import {on} from '../lib/event'
import {canvas} from "../lib/canvas";


let tank;

function getCoordinate(cd1, cd2, step) {
  let val = cd1 - cd2;
  let abs = Math.abs(val);
  let cd = abs > step ? step : abs;

  return val > 0 ? cd1 - cd : cd1 + cd;
}

//添加事件
on('gameStop', function () {
  let newCoordinate;

  tank = new Motion({
    map: [
      [0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ],
    colors: {
      1: '#222'
    },
    type: config.types.tank.type,
    detailType: config.types.tank.type,
    onRun() {
      const newCoordinate = correction(userCtrl.coordinate, this.size);
      const {_coordinate} = this;
      //发射子弹
      this.bmob.launch(this);

      if (!userCtrl.ableMove) {
        return true;
      }
      this.motion.time = 0;
      this.motion.hVelocity = getCoordinate(_coordinate.x, newCoordinate.x, canvas.maxMoveX);
      this.motion.vVelocity = getCoordinate(_coordinate.y, newCoordinate.y, canvas.maxMoveY);
    },
    onError(errors) {
      const planeType = config.types.plane;

      if (errors.impact[planeType.type] || errors.impact[planeType.bmob.type]) {
        stopGame();
        return true;
      }
    }
  });
  tank.bmob = new Bmob({
    kind: config.types.bmob.children.scattering.type,
    type: config.types.tank.bmob.type
  });

  newCoordinate = getOffset(tank.size,'center','bottom');

  newCoordinate.y -= 1;
  tank.setCoordinate(newCoordinate);
});
