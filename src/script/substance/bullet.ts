import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType} from './base'
import substances from "./substances";
import {colors, speed} from "../config";
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
  direction: directionType,
  source: Substance
}

class Bullet extends Substance {
  readonly moveSpeed: moveSpeedType;
  private direction: directionType;
  private displacementX: number;
  private displacementY: number;
  public source: Substance;

  constructor(options: constructorOptions) {
    (options as any).shape = Substance.generateShape([[1]], colors.bulletMap);
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
      substances.bullets.push(this);
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
      if ((this.source as any).isTank) {
        const plane = this.getCollidePlane();

        score.add(plane.getScore());
        plane.destroy();
      }
      else {
        substances.tank.destroy();
      }

      return this.destroy(false);
    }
    this.addToLayer();
  }

  destroy(needRemoveLayer = true) {
    needRemoveLayer && this.removeFormLayer();
    substances.bullets = substances.bullets.filter(item => item !== this);
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

    return substances.planes.filter(plane => {
      x = this.position.x - plane.position.x;
      y = this.position.y - plane.position.y;

      return plane.shape[y] && plane.shape[y][x];
    })[0];
  }
}

//对应的是分数比例
enum bulletKinds {
  line = 1,
  horn = 2,
  cross = 4
}

interface bulletOptionsInterface extends constructorOptions {
  direction: null,
  source: null,
  kind: bulletKinds
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
        case bulletKinds.line:
          options.direction = `${this.isTank ? 'top' : 'bottom'}-center`;
          new Bullet(Object.assign(options));
          break;
        case bulletKinds.horn:
          options.direction = `${this.isTank ? 'top' : 'bottom'}-left`;
          new Bullet(Object.assign(options));
          options.direction = `${this.isTank ? 'top' : 'bottom'}-right`;
          new Bullet(Object.assign(options));
          break;
        case bulletKinds.cross:
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

export {Bullet, bulletKinds, bulletOptionsInterface, createLauncher}
