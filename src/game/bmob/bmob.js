import Motion from '../../lib/motion'
import config from '../config'
import {addGold} from '../leave'

import {stopGame} from "../index";
import {canvas} from "../../lib/canvas";
import {trigger} from "../../lib/event";

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
        addGold(motion.score);
        this.remove();
        motion.remove();

        trigger('killPlane',motion);
        return true;
      }
    }
    else {
      //击杀坦克
      motion = errors.impact[config.types.tank.type];
      if (motion) {
        stopGame(true);
        return true;
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
      x: Math.ceil(canvas.maxMoveX / 8),
      y: Math.ceil(canvas.maxMoveY / 8)
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
