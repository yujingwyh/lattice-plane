import {lattice} from "../config";
import {each} from "../units/helper";

type shapeType = (string | number)[][];
type layerType = (string | number)[][];
type moveSpeedType = number;
type shootSpeedType = number;

interface sizeInterface {
  x: number,
  y: number
}

interface coordinateInterface {
  x: number,
  y: number
}

interface constructorOptions {
  shape: shapeType,
  readonly renderLayer: layerType,
  readonly checkLayer: layerType
}

export {shapeType, layerType, moveSpeedType, shootSpeedType, coordinateInterface, constructorOptions}
export default class Base {
  //生成shape
  static generateShape = (shape, colorMap): shapeType => {
    return shape.map(x => x.map(y => colorMap[y] || y));
  };

  readonly renderLayer: layerType;
  readonly checkLayer: layerType;
  readonly shape: shapeType;
  readonly shapeSize: sizeInterface;
  public position: coordinateInterface;

  constructor({shape, renderLayer, checkLayer}: constructorOptions) {
    this.position = {x: 0, y: 0};
    this.shape = shape;
    this.shapeSize = {
      x: shape[0].length,
      y: shape.length
    };
    this.renderLayer = renderLayer;
    this.checkLayer = checkLayer;
  }

  //从渲染中移除
  removeFormLayer() {
    const position = this.position;

    each(position, this.shapeSize, (x, y) => {
      this.shape[y - position.y][x - position.x] && (this.renderLayer[x][y] = 0);
    });
  }

  //添加到渲染中
  addToLayer() {
    let color;
    const position = this.position;

    each(position, this.shapeSize, (x, y) => {
      color = this.shape[y - position.y][x - position.x];

      color && (this.renderLayer[x][y] = color);
    })
  };

  //获得地址（超出将以边缘为准）
  getInsidePosition(position): coordinateInterface {
    return {
      x: Math.max(Math.min(position.x, lattice.xNumber - this.shapeSize.x + 1), 1),
      y: Math.max(Math.min(position.y, lattice.yNumber - this.shapeSize.y + 1), 1)
    }
  }

  //检测是否碰撞
  checkCollide(): boolean {
    const position = this.position;

    let isCollide = false;

    each(position, this.shapeSize, (x, y) => {
      isCollide = isCollide || !!(this.shape[y - position.y][x - position.x] && this.checkLayer[x][y])
    });

    return isCollide;
  }
}
