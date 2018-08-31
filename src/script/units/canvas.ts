import {$, isMobile, toast} from './dom'
import {each} from './helper'
import {lattice} from '../config'

const canvas = $('canvas');
const ctx = canvas[0].getContext("2d");

const renderLayers = {
  compound: [[]],
  tank: [[]],
  tankBullet: [[]],
  plane: [[]],
  planeBullet: [[]]
};
//格子开始的位置 像素
const latticeOrigin = {
  x: 0,
  y: 0
};

const init = () => {
  const $window = $(window);

  const width = $window.width();
  const height = $window.height();

  canvas.attr('width', width).attr('height', height);
  //处理格子数
  lattice.xNumber = Math.ceil(width / lattice.size) - lattice.space;
  lattice.yNumber = Math.ceil(height / lattice.size) - lattice.space;
  //保证x为奇数
  if (lattice.xNumber % 2 === 0) {
    lattice.xNumber -= 1;
    lattice.yNumber -= 1;
  }
  //处理开始位置
  latticeOrigin.x = (width - lattice.xNumber * lattice.size) / 2;
  latticeOrigin.y = (height - lattice.yNumber * lattice.size) / 2;
  //初始renderLayers
  for (let x = lattice.xNumber; x > 0; x--) {
    Object.keys(renderLayers).forEach(item=>{
      renderLayers[item][x] = new Array(lattice.yNumber)
    });
  }

  if (!isMobile) {
    return toast('请在移动端打开', {time: 0});
  }
  if (lattice.xNumber < 15 || lattice.yNumber < 10) {
    return toast('您的屏幕太小', {time: 0});
  }
};
const render = () => {
  const actualSize = lattice.size - lattice.space;
  const eachStart = {x: 1, y: 1};
  const eachSize = {x: lattice.xNumber, y: lattice.yNumber};

  let color, pixelX, pixelY;

  each(eachStart, eachSize, (x, y) => {
    color = renderLayers.tank[x][y] ||
      renderLayers.plane[x][y] ||
      renderLayers.tankBullet[x][y] ||
      renderLayers.planeBullet[x][y] ||
      lattice.backgroundColor;

    if (color !== renderLayers.compound[x][y]) {
      renderLayers.compound[x][y] = color;

      pixelX = (x - 1) * lattice.size + latticeOrigin.x;
      pixelY = (y - 1) * lattice.size + latticeOrigin.y;

      ctx.fillStyle = color;
      ctx.fillRect(pixelX, pixelY, actualSize, actualSize);
    }
  });
};
/**
 * 像素转格子位置
 */
const pixelToCoordinate = (pixel) => {
  const size = lattice.size;

  return {
    x: Math.ceil((pixel.x - latticeOrigin.x) / size),
    y: Math.ceil((pixel.y - latticeOrigin.y) / size)
  };
};

export {pixelToCoordinate, renderLayers}
export default {init, render};
