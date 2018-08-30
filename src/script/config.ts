import {generateShape} from "./units/helper";

const lattice = {
  //所占的像素
  size: 8,
  //之间的间距
  space: 2,
  //格子背景色
  backgroundColor: '#969e89',
};
const tank = {
  shape: generateShape([
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1]
  ], {
    1: '#222'
  })
};

const plane = {};
const bullet = {};

export {lattice, tank}
