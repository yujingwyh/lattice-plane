import data from '../data'

import {$, isMobile, toast} from './dom'
import {coordinateInterface, each} from './helper'
import {lattice} from '../config'

const canvas = $('canvas');
const ctx = canvas[0].getContext("2d");
//格子开始的位置 像素
const startPosition = {
  x: 0,
  y: 0
};

const init = () => {
  const $window = $(window);

  const width = $window.width();
  const height = $window.height();

  canvas.attr('width', width).attr('height', height);
  //处理格子数
  data.latticeX = Math.ceil(width / lattice.size) - lattice.space;
  data.latticeY = Math.ceil(height / lattice.size) - lattice.space;
  //保证x为奇数
  if (data.latticeX % 2 === 0) {
    data.latticeX -= 1;
    data.latticeY -= 1;
  }
  //处理开始位置
  startPosition.x = (width - data.latticeX * lattice.size) / 2;
  startPosition.y = (height - data.latticeY * lattice.size) / 2;
  //初始colors
  for (let x = data.latticeX; x > 0; x--) {
    data.layerCompound[x] = new Array(data.latticeY);
    data.layerTank[x] = new Array(data.latticeY);
    data.layerTankBullet[x] = new Array(data.latticeY);
    data.layerPlane[x] = new Array(data.latticeY);
  }

  if (!isMobile) {
    return toast('请在移动端打开', {time: 0});
  }
  if (data.latticeX < 15 || data.latticeY < 10) {
    return toast('您的屏幕太小', {time: 0});
  }
};
const render = () => {
  const {latticeX, latticeY, layerTank, layerTankBullet, layerPlane, layerCompound} = data;
  const actualSize = lattice.size - lattice.space;
  const eachStart = {x: 1, y: 1};
  const eachSize = {x: latticeX, y: latticeY};

  let color, pixelX, pixelY;

  each(eachStart, eachSize, (x, y) => {
    color = layerTankBullet[x][y] || layerPlane[x][y] || layerTank[x][y] || lattice.backgroundColor;

    if (color !== layerCompound[x][y]) {
      layerCompound[x][y] = color;

      pixelX = (x - 1) * lattice.size + startPosition.x;
      pixelY = (y - 1) * lattice.size + startPosition.y;

      ctx.fillStyle = color;
      ctx.fillRect(pixelX, pixelY, actualSize, actualSize);

    }
  });
};
/**
 * 像素转格子位置
 */
const pixelToCoordinate = (pixel: coordinateInterface) => {
  const size = lattice.size;

  return {
    x: Math.ceil((pixel.x - startPosition.x) / size),
    y: Math.ceil((pixel.y - startPosition.y) / size)
  };
};

//重置layer
function resetLayers() {
  const start = {x: 1, y: 1};
  const size = {x: data.latticeX, y: data.latticeY};

  each(start, size, (x, y) => {
    data.layerCompound[x][y] = 0;
    data.layerTank[x][y] = 0;
    data.layerTankBullet[x][y] = 0;
    data.layerPlane[x][y] = 0;
  })
}

export {pixelToCoordinate}
export default {
  init,
  render,
  resetLayers
}
