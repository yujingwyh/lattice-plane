import {lattice} from "../config";
import {each} from "../units/helper";

type shapeType = string[][];
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

enum STATUS {
  normal,
  outSide,
  collide
}

export {shapeType, layerType, moveSpeedType, shootSpeedType, coordinateInterface, constructorOptions}
export default class Substance {
  readonly renderLayer: layerType;
  readonly checkLayer: layerType;

  public shape: shapeType;
  public position: coordinateInterface;
  public shapeSize: sizeInterface;
  public status: STATUS;

  static generateShape = (shape, colorMap): shapeType => {
    return shape.map(x => x.map(y => colorMap[y] || y));
  };

  static status = STATUS;

  constructor({shape, renderLayer, checkLayer}: constructorOptions) {
    this.shape = shape;
    this.renderLayer = renderLayer;
    this.checkLayer = checkLayer;

    this.status = STATUS.normal;
    this.position = {x: 0, y: 0};
    this.shapeSize = {
      x: shape[0].length,
      y: shape.length
    };
  }

  removeFormLayer() {
    const position = this.position;

    each(position, this.shapeSize, (x, y) => {
      this.shape[y - position.y][x - position.x] && (this.renderLayer[x][y] = 0);
    })
  }

  addToLayer() {
    let color;
    const position = this.position;

    each(position, this.shapeSize, (x, y) => {
      color = this.shape[y - position.y][x - position.x];

      color && (this.renderLayer[x][y] = color);
    })
  };

  getInsidePosition(position): coordinateInterface {
    return {
      x: Math.max(Math.min(position.x, lattice.xNumber - this.shapeSize.x + 1), 1),
      y: Math.max(Math.min(position.y, lattice.yNumber - this.shapeSize.y + 1), 1)
    }
  }

  checkCollide(): boolean {
    const position = this.position;

    let isCollide = false;

    each(position, this.shapeSize, (x, y) => {
      if (this.shape[y - position.y][x - position.x] && this.checkLayer[x][y]) {
        isCollide = true;
      }
    });

    return isCollide;
  }
}
