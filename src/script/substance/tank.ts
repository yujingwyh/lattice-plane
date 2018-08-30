import Substance from './base'
import data from "../data";

import {$} from '../units/dom'
import {coordinateInterface} from '../units/helper'
import {pixelToCoordinate} from "../units/canvas";
import {tank} from "../config";


const getPosition = evt => {
  const position = evt.targetTouches[0];

  return pixelToCoordinate({
    x: position.clientX,
    y: position.clientY
  });
};

export default class Tank extends Substance {
  private ableSetPosition: boolean;
  private pressPosition: coordinateInterface;

  constructor() {
    super(tank.shape, data.layerTank);

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


  run(): boolean {
    let isCollide = false;

    if (this.ableSetPosition) {
      this.removeFormLayer();

      this.position = this.getInsidePosition(
        this.getCenterPosition(this.pressPosition)
      );

      this.addToLayer();

      return this.checkCollide(data.layerPlane);
    }

    return isCollide;
  }


  //获得居中的位置
  private getCenterPosition(position) {
    return {
      x: position.x - Math.floor(this.shapeSize.x / 2),
      y: position.y - Math.floor(this.shapeSize.y / 2)
    }
  }
}
