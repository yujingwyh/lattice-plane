import Substance, {constructorOptions as substanceConstructorOptions, coordinateInterface, shootSpeedType} from './base'

import {$} from '../units/dom'
import {pixelToCoordinate} from "../units/canvas";
import {constructorOptions as bulletConstructorOptions} from "./bullet";

interface constructorOptions extends substanceConstructorOptions {
  readonly shootSpeed: shootSpeedType
}

const getPosition = evt => {
  const position = evt.targetTouches[0];

  return pixelToCoordinate({
    x: position.clientX,
    y: position.clientY
  });
};

export {constructorOptions as tankConstructorOptions}
export default class Tank extends Substance {
  readonly shootSpeed: shootSpeedType;

  private ableSetPosition: boolean;
  private pressPosition: coordinateInterface;

  public bulletOptions: bulletConstructorOptions;

  constructor(tankOptions: constructorOptions, bulletOptions: bulletConstructorOptions) {
    super(tankOptions);

    this.shootSpeed = tankOptions.shootSpeed;
    this.ableSetPosition = false;
    this.bulletOptions = bulletOptions;
    //监听事件
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
      .on('touchend', evt => {
        this.ableSetPosition = false;
      });
  }

  run() {
    if (this.ableSetPosition) {
      this.removeFormLayer();

      this.position = this.getInsidePosition(
        this.getCenterPosition(this.pressPosition)
      );

      this.addToLayer();

      if (this.checkCollide()) {
        this.status = Substance.status.collide;
      }
    }
  }

  //获得居中的位置
  private getCenterPosition(position) {
    return {
      x: position.x - Math.floor(this.shapeSize.x / 2),
      y: position.y - Math.floor(this.shapeSize.y / 2)
    }
  }
}
