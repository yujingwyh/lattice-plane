import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType, shapeType} from './base'
import {each} from "../units/helper";
import {colors} from "../config";

enum KINDS {
  line,
  horn,
  cross
}

interface constructorOptions extends substanceConstructorOptions {
  shape: shapeType,
  kind: KINDS,
  moveSpeed: moveSpeedType
}

//shape size必须大于2
const enlargeShape = (shape: shapeType, length) => {
  const shapeSize = Substance.calcShapeSize(shape);
  const eachStart = {x: 0, y: 0};
  const eachSize = {x: shapeSize.x * length, y: shapeSize.y + 2 * length};

  shape.splice(1, 0, (new Array(5)).fill(0))
};
const getInitShape = (kind: KINDS, source: Substance) => {
  const position = source.position;
  let shape: any = [];

  each(position, source.shapeSize, (x, y) => {
    shape[y] = shape[y] || [];
    shape[y][x] = 0;
  });

  if (kind === KINDS.line) {
    shape[position.y + source.shapeSize.y - 1][position.x + Math.floor(source.shapeSize.x / 2)] = 1;
  }
  else if (kind === KINDS.horn) {
    shape[position.y + source.shapeSize.y - 1][position.x] = 1;
    shape[position.y + source.shapeSize.y - 1][position.x + position.x - 1] = 1;
  }
  else if (kind === KINDS.cross) {
    shape[position.y][position.x] = 1;
    shape[position.y][position.x + position.x - 1] = 1;
    shape[position.y + source.shapeSize.y - 1][position.x] = 1;
    shape[position.y + source.shapeSize.y - 1][position.x + position.x - 1] = 1;
  }

  return enlargeShape(Substance.generateShape(shape, colors.bulletMap), 1);
};

export {KINDS as bulletKinds, constructorOptions as bulletConstructorOptions}
export default class Bullet extends Substance {
  readonly kind: KINDS;
  readonly moveSpeed: moveSpeedType;

  constructor(options: constructorOptions, source) {
    options.shape = [['#333']];
    super(options)

  }

  run() {

  }
}
