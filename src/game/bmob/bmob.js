import Motion from '../../lib/motion'
import config from '../config'
import score from '../score'

import {stopGame} from "../index";
import {canvas} from "../../lib/canvas";

export default class Bomb extends Motion {
  _isTank;

  static onError(errors) {
    const isTank = this._isTank;
    const types = config.types;

    let motion;

    if (isTank) {
      //击杀飞机
      motion = errors.impact[types.plane.type];
      if (motion) {
        score.addScore(motion.score);
        motion.remove();
      }
    }
    else {
      //击杀坦克
      motion = errors.impact[config.types.tank.type];
      if (motion) {
        stopGame();
      }
    }
    if (errors.out) {
      this.remove();

      return true;
    }
  }
  constructor(options) {
    const {motion, offset} = options;
    const {_coordinate} = motion;
    const types = config.types;
    const velocity = {
      x: Math.ceil(canvas.maxMoveX / 4),
      y: Math.ceil(canvas.maxMoveY / 4)
    };
    const isTank = motion.type === types.tank.type;

    options.map = [
      [1],
    ];
    options.colors = {
      1: isTank ? config.colors.tankBmob : config.colors.planeBmob
    };
    options.type = isTank ? types.tank.bmob.type : types.plane.bmob.type;

    super(options);

    this._isTank = isTank;
    let newCd = {
      x: Math.floor(_coordinate.x + motion.size.x / 2) - Math.floor(this.size.x / 2),
      y: this._isTank ? _coordinate.y - 1 : _coordinate.y + motion.size.y
    };
    newCd.x += offset.x;
    newCd.y += offset.y;
    //初始速度
    this.motion.hVelocity = offset.x * velocity.x;
    this.motion.vVelocity = this._isTank ? -velocity.y : velocity.y;
    //初始位置
    this.setCoordinate(newCd);
    this.motion.hShift = newCd.x;
    this.motion.vShift = newCd.y;


    this.onError = Bomb.onError;
  }
}
