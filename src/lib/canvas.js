import config from '../game/config'
import Exterior from './exterior'
import Substance from './substance'

import {on} from './event'
import {pixelToCoordinate} from "./coordinate";

const $canvas = $('#myCanvas');
const ctx = $canvas[0].getContext("2d");

let canvas = {
  //格子数量
  numX: 0,
  numY: 0,
  //中间的格子
  centerX: 0,
  centerY: 0,
  //开始位置（像素）
  startX: 0,
  startY: 0,
  //最大移动速度
  maxMoveX:0,
  maxMoveY:0
};
let userCtrl = {
  ableMove: false,
  //鼠标坐标
  coordinate: {
    x: 0,
    y: 0
  }
};
//画布颜色
let canvasColors;
//外观层 空为null 有占据为 substance
let substanceLayers = {};
//画格子
let drawLattice = (function () {
  const latticeSize = config.latticeSize;
  /**
   * 画对应的格子
   * @param x {number} x坐标
   * @param y {number} y坐标
   * @param color {number|string} 颜色 0为透明
   */
  function draw(x, y, color) {
    let size = latticeSize - config.spaceLattice;
    let pixelX, pixelY;


    if (canvasColors[y][x] !== color) {
      pixelX = (x - 1) * latticeSize + canvas.startX;
      pixelY = (y - 1) * latticeSize + canvas.startY;

      canvasColors[y][x] = color;

      ctx.fillStyle = color === 0 ? config.colors.bg : color;
      ctx.fillRect(pixelX, pixelY, size, size);
    }
  }

  /**
   * 画格子
   * @param substance {Object} Substance实例
   * @param isRemove {boolean} 移除还是显示
   */
  return function (substance, isRemove = false) {
    const {map, size, _coordinate} = substance;

    const coordinateX = _coordinate.x;
    const coordinateY = _coordinate.y;

    let color, cX, cY;
    if (coordinateX !== 0 && coordinateY !== 0) {
      for (let x = 0, xLen = x + size.x; x < xLen; x++) {
        for (let y = 0, yLen = y + size.y; y < yLen; y++) {
          color = map[y][x];

          if (color !== 0) {
            color = isRemove ? 0 : color;

            cX = x + coordinateX;
            cY = y + coordinateY;

            draw(cX, cY, color);

            substanceLayers[substance.type][cY][cX] = color ? substance : null;
          }
        }
      }
    }
  }
}());

//初始
on('gameInit', function () {
  const $window = $(window);
  const eventName = getEventName();

  const width = $window.width();
  const height = $window.height();

  $canvas
    .attr('width', width)
    .attr('height', height);
  //处理格子数
  canvas.numX = parseInt(width / config.latticeSize) - config.spaceLattice;
  canvas.numY = parseInt(height / config.latticeSize) - config.spaceLattice;
  //保证x为奇数
  if (canvas.numX % 2 === 0) {
    canvas.numX -= 1;
    canvas.numY -= 1;
  }
  //处理开始位置
  canvas.startX = (width - canvas.numX * config.latticeSize) / 2;
  canvas.startY = (height - canvas.numY * config.latticeSize) / 2;
  //处理center
  canvas.centerX = parseInt(canvas.numX / 2) + 1;
  canvas.centerY = parseInt(canvas.numY / 2) + 1;
  //处理step
  canvas.stepX = Math.ceil(canvas.numX / config.stepRate);
  canvas.stepY = Math.ceil(canvas.numY / config.stepRate);
  //处理maxMove
  canvas.maxMoveX = Math.ceil(canvas.numX / config.stepRate);
  canvas.maxMoveY = Math.ceil(canvas.numY / config.stepRate);

  if (canvas.numX < 15 || canvas.numY < 15) {
    $.alert('您的屏幕太小');
  }
  //监听事件
  $(document)
    .on(eventName[0], function (evt) {
      userCtrl.ableMove = true;
      setCoordinate(evt);
    })
    .on(eventName[1], function (evt) {
      if (userCtrl.ableMove) {
        setCoordinate(evt);
      }
    })
    .on(eventName[2], function () {
      userCtrl.ableMove = false;
    });
  $('.info')
    .on(eventName[0],function (evt) {
      userCtrl.ableMove = false;

      evt.stopPropagation();
    });
  function setCoordinate(evt) {
    userCtrl.coordinate = pixelToCoordinate({
      x: evt.clientX,
      y: evt.clientY
    });
  }
  function getEventName() {
    let isSupportTouch = "ontouchstart" in document;

    return isSupportTouch ?
      ['touchstart', 'touchmove', 'touchend'] :
      ['mousedown', 'mousemove', 'mouseup'];
  }
});
//添加事件
on('gameStop', function () {
  const types = config.types;
  const bgSubstance = new Substance({
    type: types.bg.type,
    map: createLayer(1),
    colors: {
      1: config.colors.bg
    }
  });
  canvasColors = (new Exterior({
    map: createLayer(0)
  })).map;
  //外观层
  substanceLayers[types.bg.type] = createLayer(null);
  substanceLayers[types.tank.type] = createLayer(null);
  substanceLayers[types.tank.bmob.type] = createLayer(null);
  substanceLayers[types.plane.type] = createLayer(null);
  substanceLayers[types.plane.bmob.type] = createLayer(null);
  //画背景
  bgSubstance._coordinate.x = 1;
  bgSubstance._coordinate.y = 1;
  bgSubstance.size.x -= 1;
  bgSubstance.size.y -= 1;

  drawLattice(bgSubstance);
});


/**
 * 创建层
 * @param value
 * @returns {Array}
 */
function createLayer(value) {
  let layer = [];

  for (let i = 0, iLen = canvas.numY; i <= iLen; i++) {
    let arr = [];

    for (let j = 0, jLen = canvas.numX; j <= jLen; j++) {
      arr[j] = value;
    }

    layer[i] = arr;
  }
  return layer;
}


export {canvas, drawLattice, userCtrl, substanceLayers};
