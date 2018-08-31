import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType, shootSpeedType} from './base'
import {lattice} from '../config'
import {getRandomNum} from "../units/helper";
import {constructorOptions as bulletConstructorOptions} from './bullet'

enum KINDS{
  small,
  medium,
  large
}

interface constructorOptions extends substanceConstructorOptions {
  kind: KINDS,
  moveSpeed: moveSpeedType,
  shootSpeed: shootSpeedType
}

export {KINDS as planeKinds,constructorOptions as planeConstructorOptions}
export default class Plane extends Substance {
  readonly kind: KINDS;
  readonly shootSpeed: shootSpeedType;
  readonly moveSpeed: moveSpeedType;

  private yPosition: number;
  private bulletOptions: bulletConstructorOptions;

  constructor(planeOptions: constructorOptions, bulletOptions: bulletConstructorOptions) {
    super(planeOptions);

    this.kind = planeOptions.kind;
    this.moveSpeed = planeOptions.moveSpeed;
    this.shootSpeed = planeOptions.shootSpeed;
    this.bulletOptions = bulletOptions;

    this.position = this.getInitPosition();
    this.yPosition = this.position.y;

    if (this.checkCollide()) {
      this.status = Substance.status.collide;
    }
  }

  run() {
    this.removeFormLayer();

    this.yPosition += this.moveSpeed;
    this.position.y = Math.floor(this.yPosition);

    //判断超出范围
    const insidePosition = this.getInsidePosition(this.position);
    if (this.position.x !== insidePosition.x || this.position.y !== insidePosition.y) {
      return this.status = Substance.status.outSide
    }
    //判断碰到其他飞机
    if (this.checkCollide()) {
      this.yPosition -= this.moveSpeed;
      this.position.y = Math.floor(this.yPosition);
    }

    this.addToLayer();
  }

  private getInitPosition() {
    return {
      x: getRandomNum(1, lattice.xNumber - this.shapeSize.x + 1),
      y: 1
    }
  }
}
