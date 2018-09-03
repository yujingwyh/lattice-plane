//循环
const each = (startCoordinate, size, callback: (x: number, y: number) => void) => {
  for (let x = startCoordinate.x, xLen = x + size.x; x < xLen; x++) {
    for (let y = startCoordinate.y, yLen = y + size.y; y < yLen; y++) {
      callback(x, y)
    }
  }
};
//获得随机数
const getRandomNum = (min, max) => {
  const num = Math.random() * (max - min) + min;

  return Math.round(num);
};


export {
  each, getRandomNum
}
