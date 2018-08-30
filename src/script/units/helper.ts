type shapeType = string[][];
type layerType = (string | number)[][];
type kindType = string;
type speedType = number;

interface sizeInterface {
  x: number,
  y: number
}

interface coordinateInterface {
  x: number,
  y: number
}

const each = (start: coordinateInterface, size: sizeInterface, callback: (x: number, y: number) => void) => {
  for (let x = start.x, xLen = x + size.x; x < xLen; x++) {
    for (let y = start.y, yLen = y + size.y; y < yLen; y++) {
      callback(x, y)
    }
  }
};
const getRandomNum = (min, max) => {
  const num = Math.random() * (max - min) + min;

  return Math.round(num);
};
const generateShape = (shape, colorMap) => {
  return shape.map(x => x.map(y => colorMap[y] || y));
};

export {
  shapeType, kindType, layerType, speedType,
  sizeInterface, coordinateInterface,
  each, getRandomNum, generateShape
}
