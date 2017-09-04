import config from '../config'
import bmobDot from './dot'
import bmobScattering from './scattering'

import {canvas} from "../../lib/canvas";

const kindBmobs = {
  [config.types.bmob.children.dot.type]: bmobDot,
  [config.types.bmob.children.scattering.type]: bmobScattering,
};

export default class {
  count = 0;
  interval = 0;

  constructor({kind}) {
    this._kind = kind;
    this.interval = canvas.maxMoveY * 2;
  }
  /**
   * 改变子弹类型
   * @param kind {number}
   */
  changeKind = (kind) => {
    this._kind = kind;
  };
  /**
   * 发送子弹
   * @param motion {Object}
   */
  launch = (motion) => {
    if (this.count % this.interval === 0) {
      kindBmobs[this._kind](motion);
    }

    this.count = this.count +1 >= this.interval ? 0 : this.count + 1;
  };
}
