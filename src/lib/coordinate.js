import config from '../game/config'
import {canvas} from "./canvas";

/**
 * 对地址进行超出修正
 * @param coordinate {{x:number,y:number}} 地址
 * @param size {{x:number,y:number}} 尺寸
 * @returns {{x: number, y: number}}
 */
export function correction(coordinate, size) {
  let newCd = {x:0,y:0};

  newCd.x = Math.min(Math.max(1, coordinate.x), canvas.numX - size.x + 1);
  newCd.y = Math.min(Math.max(1, coordinate.y), canvas.numY - size.y + 1);

  return newCd;
}
/**
 * 获得偏移地址
 * @param size {{x:number,y:number}} 尺寸
 * @param xDirection {string | number} x方向
 * @param yDirection {string | number} y方向
 * @returns {{x:number,y:number}}
 */
export function getOffset(size, xDirection,yDirection) {
  let result = {x: 0, y: 0};

  switch (xDirection){
    case 'left':
      result.x = 1;
      break;
    case 'right':
      result.x = canvas.numX;
      break;
    case 'center':
      result.x = canvas.centerX - Math.floor(size.x / 2);
      break;
    default:
      result.x = xDirection;
  }
  switch (yDirection){
    case 'top':
      result.y=1;
      break;
    case 'bottom':
      result.y=canvas.numY;
      break;
    case 'middle':
      result.y = canvas.centerY - Math.floor(size.y / 2);
      break;
    default:
      result.y = yDirection;
  }

  return correction(result, size);
}

/**
 * 像素转地址    地址有可能超出
 * @param pixel {{x:number,y:number}} 像素
 * @returns {{x: number, y: number}}
 */
export function pixelToCoordinate(pixel) {
  const latticeSize = config.latticeSize;

  return {
    x: Math.ceil((pixel.x - canvas.startX) / latticeSize),
    y: Math.ceil((pixel.y - canvas.startY) / latticeSize)
  };
}
