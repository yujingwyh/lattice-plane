import Substance from './substance'

let motions = {};
let id = 0;

export {motions}
export default class Motion extends Substance {
  //运动相关
  motion = {
    //时间
    time: 0,
    //竖直加速度
    acceleration: 0,
    //水平速度
    hVelocity: 0,
    //垂直速度
    vVelocity: 0,
    //初始坐标
    hShift:0,
    //初始坐标
    vShift:0
  };
  //详细类型
  detailType;
  //回调
  onRun;
  onRemoveMotion;

  static onRemove() {
    const {detailType, onRemoveMotion} = this;
    let len, motion;

    for (len = motions[detailType].length - 1 ; len >= 0; len--) {
      motion = motions[detailType][len];

      if (motion._id === this._id) {
        motions[detailType].splice(len, 1);
        break;
      }
    }

    onRemoveMotion && onRemoveMotion.apply(this);
  };
  constructor(options) {
    const {detailType, onRemove} = options;

    options.onRemove = Motion.onRemove;

    super(options);

    this._id = id++;
    this.detailType = detailType;
    this.onRemoveMotion = onRemove;

    Object.assign(this.motion, options.motion || {});

    this.onRun = options.onRun || this.onRun;

    motions[detailType].push(this);
  }

  run() {
    if (this.onRun) {
      if (this.onRun()) {
        return;
      }
    }

    this.motion.time++;
    //计算位移
    this.setCoordinate({
      x: this.motion.hShift + parseInt(this.motion.hVelocity * this.motion.time),
      y: this.motion.vShift + parseInt(this.motion.vVelocity * this.motion.time + (this.motion.acceleration * this.motion.time * this.motion.time) / 2)
    });
  }
}
