import config from '../config'

import {canvas} from "../../lib/canvas";
import {getOffset} from "../../lib/coordinate";
import {getRandomNum} from "../../lib/util";

import small from './planeSmall'
import medium from './planeMedium'
import large from './planeLarge'

import './tank'

const planeType = config.types.plane.children;

const typePlane = {
  [planeType.small.type]: small,
  [planeType.medium.type]: medium,
  [planeType.large.type]: large,
};

/**
 * 生成初始地址
 * @param size {{x:number,y:number}}  尺寸
 * @returns {{coordinate: {x: number, y: number}, position: string}}
 */
function generateCoordinate(size) {
  let position = ['left', 'top', 'top', 'right'][getRandomNum(0, 3)];
  let coordinate = {x: 0, y: 0};
  let ciY = Math.ceil(canvas.numY / 3);

  if (position === 'left' || position === 'right') {
    coordinate = getOffset(size, position, getRandomNum(1, ciY));
  }
  else if (position === 'top') {
    coordinate = getOffset(size, getRandomNum(1, canvas.numX), position);
  }

  return {
    coordinate,
    position
  };
}

/**
 * 生成运动参数
 * @param position {string} 位置
 * @returns {{acceleration: number, hVelocity: number, vVelocity: number}}
 */
function generateMotion(position) {
  return {
    acceleration: 0,
    hVelocity: position === 'right' ? -0.2 : 0.2,
    vVelocity: 0.5
  }
}

/**
 * 初始 gun
 * @param gun
 * @param coordinate
 * @param motion
 */
function initGun(gun, coordinate, motion) {
  gun.setCoordinate(coordinate);

  gun.motion.hShift = gun._coordinate.x;
  gun.motion.vShift = gun._coordinate.y;

  Object.assign(gun.motion, motion);
}

export {generateCoordinate, generateMotion, initGun}
export default {
  planeType,
  //创建飞机
  createPlane: function (type, bmob) {
    return typePlane[type](bmob);
  }
}
