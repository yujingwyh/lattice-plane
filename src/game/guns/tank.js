import Motion from '../../lib/motion'
import config from "../config";
import Bmob from '../bmob/index'

import {correction, getOffset, pixelToCoordinate} from '../../lib/coordinate'
import {canvas, userCtrl} from "../../lib/canvas";
import {stopGame} from "../index";
import {on} from '../../lib/event'


let tank;
let tankCtrl = {
  ableMove: false,
  //单位像素
  position: {
    x: 0,
    y: 0
  }
};

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
      const {_coordinate} = this;

      let newCoordinate;
      //发射子弹
      this.bmob.launch(this);

      if (!tankCtrl.ableMove) {
        return true;
      }
      newCoordinate = correction(pixelToCoordinate(tankCtrl.position), this.size);
      this.motion.time = 0;
      this.motion.hVelocity = getCoordinate(_coordinate.x, newCoordinate.x, canvas.maxMoveX);
      this.motion.vVelocity = getCoordinate(_coordinate.y, newCoordinate.y, canvas.maxMoveY);
    },
    onError(errors) {
      const planeType = config.types.plane;

      if (errors.impact[planeType.type] || errors.impact[planeType.bmob.type]) {
        stopGame(true);
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

//初始
(function () {
  const isSupportTouch = "ontouchstart" in document;
  const eventName = getEventName();
  //监听事件
  $(document)
    .on(eventName[0], function (evt) {
      tankCtrl.ableMove = true;
      evt.preventDefault();
      setPosition(evt);
    })
    .on(eventName[1], function (evt) {
      if (tankCtrl.ableMove) {
        setPosition(evt);
      }
    })
    .on(eventName[2], function () {
      tankCtrl.ableMove = false;
    });
  $('.info')
    .on(eventName[0], function (evt) {
      tankCtrl.ableMove = false;

      evt.stopPropagation();
    });

  function setPosition(evt) {
    const positon = isSupportTouch ? evt.originalEvent.targetTouches[0] : evt;

    tankCtrl.position.x = positon.clientX;
    tankCtrl.position.y = positon.clientY;
  }

  function getEventName() {
    return isSupportTouch ?
      ['touchstart', 'touchmove', 'touchend'] :
      ['mousedown', 'mousemove', 'mouseup'];
  }
}());
