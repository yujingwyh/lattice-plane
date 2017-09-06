import Motion from '../../lib/motion'
import {addGold} from '../leave'
import config from '../config'
import Bmob from '../bmob'

import {trigger} from "../../lib/event";
import {canvas} from "../../lib/canvas";
import {stopGame} from "../index";
import {getOffset} from "../../lib/coordinate";
import {getRandomNum} from "../../lib/util";

export default class Plane extends Motion{
  //分数
  score = 0;
  //炮弹
  bmob;

  static onRun() {
    this.bmob.launch(this);
  };

  static onError(errors) {
    const tankType = config.types.tank;

    if (errors.impact[tankType.type]) {
      stopGame(true);
      return true;
    }
    //被击杀
    if (errors.impact[tankType.bmob.type]) {
      addGold(this.score);

      errors.impact[tankType.bmob.type].remove();
      this.remove();

      trigger('killPlane', this);
      return true;
    }
    if (errors.impact[config.types.plane.type]) {
      return true
    }

    if (errors.out) {
      this.remove();

      return true;
    }
  };

  static onRemove() {
    trigger('removePlane');
  };
  /**
   * 初始地址
   * @param size {{x:number,y:number}}  尺寸
   * @returns {{coordinate: {x: number, y: number}, position: string}}
   */
  static initCoordinate(size) {
    let position = ['left', 'top', 'top', 'right'][getRandomNum(0, 3)];
    let coordinate = {x: 0, y: 0};
    let ciY = Math.ceil(canvas.numY / 3);

    if (position === 'left' || position === 'right') {
      coordinate = getOffset(size, position, getRandomNum(1, ciY));
    }
    else if (position === 'top') {
      coordinate = getOffset(size, getRandomNum(1, canvas.numX), position);
    }

    return {
      coordinate,
      position
    };
  }

  /**
   * 初始速度
   * @param position {string} 位置
   * @returns {{acceleration: number, hVelocity: number, vVelocity: number}}
   */
  static initVelocity(position) {

    return {
      acceleration: 0,
      hVelocity: position === 'right' ? -0.2 : 0.2,
      vVelocity: 0.5
    }
  }
  constructor(options){
    options.onError = Plane.onError;
    options.onRun = Plane.onRun;
    options.onRemove = Plane.onRemove;

    super(options);

    const types = config.types;
    const position = Plane.initCoordinate(this.size);

    this.score = options.score;

    this.setCoordinate(position.coordinate);
    this.motion.hShift = this._coordinate.x;
    this.motion.vShift = this._coordinate.y;

    Object.assign(this.motion, Plane.initVelocity(position.position));

    addGold(this.score);

    this.bmob = new Bmob({
      kind: options.bmobKind,
      type: types.plane.bmob.type
    });
  }
}
