import config from '../config'

import './tank'

import small from './planeSmall'
import medium from './planeMedium'
import large from './planeLarge'

const planeType = config.types.plane.children;

const typePlane = {
  [planeType.small.type]: small,
  [planeType.medium.type]: medium,
  [planeType.large.type]: large,
};


export default {
  planeType,
  //创建飞机
  createPlane: function (type, bmob) {
    return typePlane[type](bmob);
  }
}
