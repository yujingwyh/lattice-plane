import Substance, {constructorOptions as substanceConstructorOptions, coordinateInterface, shootSpeedType} from './base'
import Bullet, {bulletConstructorOptions, bulletKinds} from "./bullet";
import {substances} from "./substances";

import {$} from '../units/dom'
import {colors, lattice, speed} from "../config";
import {pixelToCoordinate, renderLayers} from "../units/canvas";

interface constructorOptions extends substanceConstructorOptions {
  shootSpeed: shootSpeedType
}

const getPosition = evt => {
  const position = evt.targetTouches[0];

  return pixelToCoordinate({
    x: position.clientX,
    y: position.clientY
  });
};

export default class Tank extends Substance {
  readonly shootSpeed: shootSpeedType;
  readonly launcher: () => boolean;
  public bulletOptions: bulletConstructorOptions;
  private ableSetPosition: boolean;
  private pressPosition: coordinateInterface;

  constructor() {
    const tankOptions: constructorOptions = {
      shape: null,
      shootSpeed: speed.tankShoot,
      renderLayer: renderLayers.tank,
      checkLayer: renderLayers.plane,
    };
    const bulletOptions: bulletConstructorOptions = {
      shape: null,
      kind: bulletKinds.line,
      moveSpeed: speed.bulletMove,
      renderLayer: renderLayers.tankBullet,
      checkLayer: renderLayers.plane
    };

    tankOptions['shape'] = Substance.generateShape([
      [0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1]
    ], colors.tankMap);

    super(tankOptions);

    this.shootSpeed = tankOptions.shootSpeed;
    this.bulletOptions = bulletOptions;
    this.launcher = Substance.createLauncher().bind(this);

    this.ableSetPosition = false;
    this.pressPosition = {x: 0, y: 0};

    this.position = {
      x: Math.ceil((lattice.xNumber - this.shapeSize.x) / 2) + 1,
      y: lattice.yNumber - this.shapeSize.y
    };
    this.addToLayer();
    this.initEvent();
    substances.tank = this;
  }

  run() {
    if (this.ableSetPosition) {
      this.removeFormLayer();

      this.position = this.getInsidePosition(
        this.getCenterPosition(this.pressPosition)
      );

      this.addToLayer();
    }

    if (this.checkCollide()) {
      substances.tank = null;
    }
    else if (this.launcher()) {
      new Bullet(this.bulletOptions, this);
    }
  }

  private initEvent() {
    $(document)
      .on('touchstart', evt => {
        const position = getPosition(evt);
        //手指在坦克上
        if (
          position.x >= this.position.x &&
          position.x < this.position.x + this.shapeSize.x &&
          position.y >= this.position.y &&
          position.y < this.position.y + this.shapeSize.y
        ) {
          this.ableSetPosition = true;
          this.pressPosition = position;
        }

        evt.preventDefault();
      })
      .on('touchmove', evt => {
        if (this.ableSetPosition) {
          this.pressPosition = getPosition(evt);
        }

        evt.preventDefault();
      })
      .on('touchend', () => {
        this.ableSetPosition = false;
      });
  }

  //获得居中的位置
  private getCenterPosition(position) {
    return {
      x: position.x - Math.floor(this.shapeSize.x / 2),
      y: position.y - Math.floor(this.shapeSize.y / 2)
    }
  }
}
