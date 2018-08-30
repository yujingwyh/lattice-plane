import Substance from './base'
import Tank from './tank'
import Plane from './plane'
import Bullet from './bullet'
import {shapeType} from "../units/helper";

interface planeOptionInterFace {
  shape?: shapeType
}

const planeOption = (function () {
  const small: planeOptionInterFace = {},
    medium: planeOptionInterFace = {},
    large: planeOptionInterFace = {};
  const colorMap = {
    1: '#333'
  };

  small.shape = Substance.generateShape([
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 0]
  ], colorMap);
  medium.shape = Substance.generateShape([
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0]
  ], colorMap);
  large.shape = Substance.generateShape([
    [1, 0, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
  ], colorMap);


  return {
    small,
    medium,
    large
  }
}());


export {Substance, Tank, Plane, Bullet}
