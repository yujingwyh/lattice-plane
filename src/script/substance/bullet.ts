import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType} from './base'
import pool from "./pool";

import {bulletKind, colors, speed, substanceType} from "../units/config";
import score from '../units/score'

type directionType = 'top-left' |
  'top-center' |
  'top-right' |
  'center-left' |
  'center-right' |
  'bottom-left' |
  'bottom-center' |
  'bottom-right';

interface constructorOptions extends substanceConstructorOptions {
  shape: null,
  type: null,
  direction: directionType,
  source: Substance
}

class Bullet extends Substance {
  readonly moveSpeed: moveSpeedType;
  public source: Substance;
  private direction: directionType;
  private displacementX: number;
  private displacementY: number;

  constructor(options: constructorOptions) {
    (options as any).shape = Substance.generateShape([[1]], colors.bulletMap);
    (options as any).type = options.source.type === substanceType.tank ? substanceType.tankBullet : substanceType.planeBullet;
    super(options);

    this.moveSpeed = speed.bulletMove;
    this.direction = options.direction;
    this.source = options.source;

    //初始位置
    this.position = this.getInitPosition();
    //判断超出范围
    const insidePosition = this.getInsidePosition(this.position);
    if (this.position.x === insidePosition.x && this.position.y === insidePosition.y) {
      this.displacementX = this.position.x;
      this.displacementY = this.position.y;

      this.isDestroy = false;
      pool.add(this);
    }
  }

  run() {
    this.removeFormLayer();
    this.calculationDisplacement();
    this.position.x = Math.floor(this.displacementX);
    this.position.y = Math.floor(this.displacementY);
    //判断超出范围
    const insidePosition = this.getInsidePosition(this.position);
    if (this.position.x !== insidePosition.x || this.position.y !== insidePosition.y) {
      return this.destroy(false);
    }
    //判断击杀
    if (this.checkCollide()) {
      if (this.source.type === substanceType.tank) {
        const plane = this.getCollidePlane();

        score.add(plane.getScore());
        plane.destroy();
      }
      else {
        pool.get(substanceType.tank).destroy();
      }

      return this.destroy(false);
    }
    this.addToLayer();
  }

  destroy(needRemoveLayer = true) {
    this.isDestroy = true;
    needRemoveLayer && this.removeFormLayer();

    pool.destroy(this);
  }


  private getInitPosition() {
    const direction = this.direction.split('-');
    const position = {x: 0, y: 0};

    switch (direction[0]) {
      case 'top':
        position.y = this.source.position.y - 1;
        break;
      case 'bottom':
        position.y = this.source.position.y + this.source.shapeSize.y;
        break;
      case 'center':
        position.y = this.source.position.y + Math.floor(this.source.shapeSize.y / 2);
        break;
    }
    switch (direction[1]) {
      case 'left':
        position.x = this.source.position.x - 1;
        break;
      case 'right':
        position.x = this.source.position.x + this.source.shapeSize.x;
        break;
      case 'center':
        position.x = this.source.position.x + Math.floor(this.source.shapeSize.x / 2);
        break;
    }

    return position;
  }

  private calculationDisplacement() {
    if (this.direction.indexOf('left') > -1) {
      this.displacementX -= this.moveSpeed;
    }
    if (this.direction.indexOf('right') > -1) {
      this.displacementX += this.moveSpeed;
    }
    if (this.direction.indexOf('top') > -1) {
      this.displacementY -= this.moveSpeed;
    }
    if (this.direction.indexOf('bottom') > -1) {
      this.displacementY += this.moveSpeed;
    }
  }

  private getCollidePlane() {
    let x, y;

    return pool.get(substanceType.plane).filter(plane => {
      x = this.position.x - plane.position.x;
      y = this.position.y - plane.position.y;

      return plane.shape[y] && plane.shape[y][x];
    })[0];
  }
}

interface bulletOptionsInterface extends constructorOptions {
  direction: null,
  source: null,
  kind: bulletKind
}

const createLauncher = () => {
  let count = 0;
  //要bind this
  return function (this: any) {
    count += 1;

    if (count >= this.shootSpeed) {
      const options = this.bulletOptions;

      options.source = this;
      switch (options.kind) {
        case bulletKind.line:
          options.direction = `${this.type === substanceType.tank ? 'top' : 'bottom'}-center`;
          new Bullet(Object.assign(options));
          break;
        case bulletKind.horn:
          options.direction = `${this.type === substanceType.tank ? 'top' : 'bottom'}-left`;
          new Bullet(Object.assign(options));
          options.direction = `${this.type === substanceType.tank ? 'top' : 'bottom'}-right`;
          new Bullet(Object.assign(options));
          break;
        case bulletKind.cross:
          options.direction = 'top-left';
          new Bullet(Object.assign(options));
          options.direction = 'top-right';
          new Bullet(Object.assign(options));
          options.direction = 'bottom-left';
          new Bullet(Object.assign(options));
          options.direction = 'bottom-right';
          new Bullet(Object.assign(options));
          break;
      }

      count = 0;
    }
  }
};

export {Bullet, bulletOptionsInterface, createLauncher}
