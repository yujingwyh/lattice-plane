import Motion from '../../lib/motion'
import {addGold} from '../leave'
import config from '../config'
import Bmob from '../bmob'

import {trigger} from "../../lib/event";
import {stopGame} from "../index";

const types = config.types;

class Plane extends Motion {
  //分数
  score = 0;
  //炮弹
  bmob;

  static onRun() {
    this.bmob.launch(this);
  };

  static onError(errors) {
    const tankType = types.tank;

    if (errors.impact[tankType.type]) {
      stopGame(true);
      return true;
    }
    //被击杀
    if (errors.impact[tankType.bmob.type]) {
      addGold(this.score);
      trigger('killPlane', this);

      errors.impact[tankType.bmob.type].remove();
      this.remove();
      return true;
    }
    if (errors.impact[types.plane.type]) {
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

  constructor(options){
    options.onError = Plane.onError;
    options.onRun = Plane.onRun;
    options.onRemove = Plane.onRemove;

    super(options);

    this.score = options.score * options.bmob.score;
    this.bmob = new Bmob({
      kind: options.bmob.type,
      type: types.plane.bmob.type
    });

    trigger('createPlane', this);
  }
}

export default Plane;
