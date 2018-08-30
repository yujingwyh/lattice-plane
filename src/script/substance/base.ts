import data from "../data";
import {coordinateInterface, each, layerType, shapeType, sizeInterface} from "../units/helper";

export default class Substance {
  public layer: layerType;
  public shape: shapeType;
  public shapeSize: sizeInterface;
  public position: coordinateInterface;

  constructor(shape: shapeType, layer: layerType, position?: coordinateInterface) {
    this.shape = shape;
    this.layer = layer;
    this.position = position || {x: 1, y: 1};

    this.shapeSize = {
      x: shape[0].length,
      y: shape.length
    };
  }

  removeFormLayer() {
    const position = this.position;

    each(position, this.shapeSize, (x, y) => {
      this.shape[y - position.y][x - position.x] && (this.layer[x][y] = 0);
    })
  }

  addToLayer() {
    let color;
    const position = this.position;

    each(position, this.shapeSize, (x, y) => {
      color = this.shape[y - position.y][x - position.x];

      color && (this.layer[x][y] = color);
    })
  };

  getInsidePosition(position: coordinateInterface): coordinateInterface {
    return {
      x: Math.max(Math.min(position.x, data.latticeX - this.shapeSize.x + 1), 1),
      y: Math.max(Math.min(position.y, data.latticeY - this.shapeSize.y + 1), 1)
    }
  }

  checkCollide(layer: layerType) {
    const position = this.position;

    let isCollide = false;

    each(position, this.shapeSize, (x, y) => {
      if (this.shape[y - position.y][x - position.x] && layer[x][y]) {
        isCollide = true;
      }
    });

    return isCollide;
  }
}
