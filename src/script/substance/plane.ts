import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType, shootSpeedType} from './base'
import {bulletOptionsInterface, createLauncher} from './bullet'
import pool from "./pool";

import {renderLayers} from "../units/canvas";
import {bulletKind, colors, lattice, planeKind, speed, substanceType} from '../units/config'
import {getRandomNum} from "../units/helper";

interface constructorOptions extends substanceConstructorOptions {
  kind: planeKind,
  moveSpeed: moveSpeedType,
  shootSpeed: shootSpeedType
}

const kindHandle = (kind, planeOptions, bulletOptions) => {
  if (kind === planeKind.small) {
    planeOptions.shape = Substance.generateShape([
      [2, 0, 2, 2, 2, 0, 2],
      [1, 2, 2, 2, 2, 2, 1],
      [2, 2, 2, 2, 2, 2, 2],
      [0, 2, 2, 2, 2, 2, 0],
      [0, 0, 2, 2, 2, 0, 0],
      [0, 0, 0, 2, 0, 0, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKind.horn;
  }
  if (kind === planeKind.medium) {
    planeOptions.shape = Substance.generateShape([
      [2, 0, 2, 0, 2],
      [2, 2, 2, 2, 2],
      [1, 1, 2, 1, 1],
      [2, 2, 2, 2, 2],
      [0, 0, 2, 0, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKind.horn;
  }
  if (kind === planeKind.large) {
    planeOptions.shape = Substance.generateShape([
      [2, 0, 2],
      [2, 2, 2],
      [0, 2, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKind.cross;
  }
};


export default class Plane extends Substance {
  readonly kind: planeKind;
  readonly shootSpeed: shootSpeedType;
  readonly moveSpeed: moveSpeedType;
  readonly launcher: () => void;
  readonly bulletOptions: bulletOptionsInterface;
  private displacement: number;

  constructor(kind, moveSpeed) {
    const planeOptions: constructorOptions = {
      shape: null,
      type: substanceType.plane,
      kind: kind,
      moveSpeed: moveSpeed,
      shootSpeed: speed.planeShoot,
      checkLayer: renderLayers[substanceType.plane],
    };
    const bulletOptions: bulletOptionsInterface = {
      shape: null,
      kind: null,
      direction: null,
      source: null,
      type: null,
      checkLayer: renderLayers[substanceType.tank]
    };
    kindHandle(kind, planeOptions, bulletOptions);

    super(planeOptions);

    this.kind = planeOptions.kind;
    this.moveSpeed = planeOptions.moveSpeed;
    this.shootSpeed = planeOptions.shootSpeed;
    this.bulletOptions = bulletOptions;

    this.launcher = createLauncher().bind(this);
    this.position = this.getInitPosition();
    this.displacement = this.position.y;

    if (!this.checkCollide()) {
      this.isDestroy = false;

      pool.add(this);
    }
  }

  run() {
    this.removeFormLayer();

    this.displacement += this.moveSpeed;
    this.position.y = Math.floor(this.displacement);

    //判断超出范围
    const insidePosition = this.getInsidePosition(this.position);
    if (this.position.x !== insidePosition.x || this.position.y !== insidePosition.y) {
      return this.destroy(false);
    }
    //判断碰到其他飞机
    if (this.checkCollide()) {
      this.displacement -= this.moveSpeed;
      this.position.y = Math.floor(this.displacement);
    }

    this.addToLayer();
    this.launcher();
  }

  destroy(needRemoveLayer = true) {
    needRemoveLayer && this.removeFormLayer();
    this.isDestroy = true;

    pool.destroy(this);
    pool.get(substanceType.planeBullet).forEach(item => {
      item.source === this && item.destroy();
    });
  }

  getScore() {
    const bulletScore = this.bulletOptions.kind * 20;
    const speedScore = this.moveSpeed * 50;
    const acreageScore = lattice.xNumber * lattice.yNumber / this.shapeSize.x / this.shapeSize.y;

    return Math.ceil(bulletScore + speedScore + acreageScore);
  }

  private getInitPosition() {
    return {
      x: getRandomNum(1, lattice.xNumber - this.shapeSize.x + 1),
      y: 1
    }
  }
}
