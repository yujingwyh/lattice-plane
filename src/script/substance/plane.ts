import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType, shootSpeedType} from './base'
import {bulletKinds, bulletOptionsInterface, createLauncher} from './bullet'
import substances from "./substances";

import {renderLayers} from "../units/canvas";
import {colors, lattice, speed} from '../config'
import {getRandomNum} from "../units/helper";

enum KINDS {
  small,
  medium,
  large
}

interface constructorOptions extends substanceConstructorOptions {
  kind: KINDS,
  moveSpeed: moveSpeedType,
  shootSpeed: shootSpeedType
}

const kindHandle = (kind, planeOptions, bulletOptions) => {
  if (kind === KINDS.small) {
    planeOptions.shape = Substance.generateShape([
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKinds.horn;
  }
  if (kind === KINDS.medium) {
    planeOptions.shape = Substance.generateShape([
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKinds.horn;
  }
  if (kind === KINDS.large) {
    planeOptions.shape = Substance.generateShape([
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKinds.cross;
  }
};


export default class Plane extends Substance {
  static planeKinds = KINDS;
  readonly kind: KINDS;
  readonly shootSpeed: shootSpeedType;
  readonly moveSpeed: moveSpeedType;
  readonly launcher: () => void;
  readonly bulletOptions: bulletOptionsInterface;
  private displacement: number;

  constructor(kind, moveSpeed) {
    const planeOptions: constructorOptions = {
      shape: null,
      kind: kind,
      moveSpeed: moveSpeed,
      shootSpeed: speed.planeShoot,
      renderLayer: renderLayers.plane,
      checkLayer: renderLayers.plane,
    };
    const bulletOptions: bulletOptionsInterface = {
      shape: null,
      kind: null,
      direction: null,
      source: null,
      renderLayer: renderLayers.planeBullet,
      checkLayer: renderLayers.tank
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
      substances.planes.push(this);
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
    this.status = Substance.status.destroy;

    substances.bullets.forEach(item => item.source === this && item.destroy());
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
