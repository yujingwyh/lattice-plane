import config from "../game/config";
import Exterior from './exterior'

import {drawLattice, substanceLayers} from "./canvas";
import {correction} from './coordinate';

/**
 * 物体类
 */
export default class extends Exterior {
  //类型
  type;
  //坐标
  _coordinate = {x:0,y:0};
  //在超出范围或者碰撞时回调 返回{boolean}
  onError;
  //在移除是回调
  onRemove;

  /**
   * 设置新坐标是验证  会不会超出和碰撞
   * @param newCoordinate {{x:number,y:number}} 新地址
   * @returns {boolean} 是否碰撞
   */
  _checkError(newCoordinate) {
    const {map, size} = this;
    const bgType = String(config.types.bg.type);

    let numKey,x,xLen,y,yLen, isBreak = false;
    let errors = {
      out: '',
      impact: {},
      happen: false
    };
    //首先验证超出
    let correctionCoordinate = correction(newCoordinate, this.size);

    if (correctionCoordinate.x !== newCoordinate.x) {
      errors.happen = true;
      errors.out = 'x';
    }
    if (correctionCoordinate.y !== newCoordinate.y) {
      errors.happen = true;
      errors.out = 'y';
    }
    //验证碰撞
    if(!errors.happen){
      for (let key in substanceLayers) {
        if (substanceLayers.hasOwnProperty(key) && key !== bgType) {
          numKey = parseInt(key);
          isBreak = false;
          for (x = newCoordinate.x, xLen = x + size.x; x < xLen; x++) {
            if (isBreak) {
              break;
            }
            for (y = newCoordinate.y, yLen = y + size.y; y < yLen; y++) {
              if (map[y - newCoordinate.y][x - newCoordinate.x] !== 0 && substanceLayers[key][y][x]) {
                errors.happen = true;
                errors.impact[numKey] = substanceLayers[key][y][x];
                isBreak = true;
                break;
              }
            }
          }
        }
      }
    }
    //触发回调
    if (errors.happen && this.onError) {
      errors.happen = this.onError(errors);
    }

    return errors.happen;
  }

  constructor({type, map, colors, coordinate, onError,onRemove}) {
    super({
      map, colors
    });

    this.type = type;
    this.onError = onError;
    this.onRemove = onRemove;


    coordinate && this.setCoordinate(coordinate);
  }

  /**
   * 设置坐标
   * @param newCoordinate {{x:number,y:number}} 新坐标
   */
  setCoordinate(newCoordinate) {
    if (newCoordinate.x === this._coordinate.x && newCoordinate.y === this._coordinate.y) return;
    //验证会不会出错
    if (!this._checkError(newCoordinate)) {
      //移除之前图形
      drawLattice(this, true);
      //设置地址
      this._coordinate = newCoordinate;
      //画当前图形
      drawLattice(this);
    }
  }
  /**
   * 移除
   */
  remove() {
    //移除显示
    drawLattice(this,true);
    //回调
    this.onRemove();
  }
}
