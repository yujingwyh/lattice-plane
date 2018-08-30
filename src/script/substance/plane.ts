import Substance from './base'
import data from '../data'

import {getRandomNum} from "../units/helper";

enum STATUS {
  normal,
  outSide,
  collideBullet,
  collidePlane
}

export default class Plane extends Substance {
  public speed;
  private yPosition: number;
  private isInit: boolean = false;

  constructor(speed) {
    super(Substance.generateShape([
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0]
    ], {
      1: '#333'
    }), data.layerPlane);

    this.speed = speed;
    this.position = this.getInitPosition();
    this.yPosition = this.position.y;

    if (this.checkAbnormal() === STATUS.normal) {
      data.planes.push(this);
    }
  }

  run() {
    this.yPosition += this.speed;
    this.position.y = Math.floor(this.yPosition);

    const status = this.checkAbnormal();

    if (status === STATUS.outSide || status === STATUS.collideBullet) {
      return this.destroy();
    }
    if (status === STATUS.collidePlane) {
      this.yPosition -= this.speed;
      this.position.y = Math.floor(this.yPosition);

      return;
    }

    this.addToLayer();
  }

  checkAbnormal() {
    const fixPosition = this.getFixPosition(this.position);
    //检测超出
    if (this.position.x !== fixPosition.x || this.position.y !== fixPosition.y) {
      return STATUS.outSide;
    }
    //检测被射击
    if (this.checkCollide(data.layerTankBullet)) {
      return STATUS.collideBullet;
    }
    //检测碰到其他飞机
    if (this.checkCollide(data.layerTankBullet)) {
      return STATUS.collidePlane;
    }

    return STATUS.normal;
  }

  destroy() {
    if (!this.isInit) return;

    this.removeFormLayer();
    data.planes = data.planes.filter(item => item !== this);
  }

  private getInitPosition() {
    return {
      x: getRandomNum(1, data.latticeX - this.shapeSize.x + 1),
      y: 1
    }
  }
}
