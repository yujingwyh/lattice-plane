const lattice = {
  //x轴格子数量 在canvas中初始
  xNumber: 0,
  //y轴格子数量
  yNumber: 0,
  //所占的像素
  size: 8,
  //之间的间距
  space: 2
};

const colors = {
  background: '#969e89',
  tankMap: {
    1: '#333'
  },
  planeMap: {
    1: '#333'
  },
  bulletMap: {
    1: '#555'
  }
};
const speed = {
  //坦克射击速度
  tankShoot: 160,
  //飞机射击速度
  planeShoot: 100,
  //子弹移动速度
  bulletMove: 0.3,
  //飞机最小移动速度
  planeMinMove: 0.2,
  //飞机最大移动速度
  planeMaxMove: 0.2,
};
const leave = {
  //游戏终止时长，单位分钟
  time: 10
};

export {lattice, colors, speed, leave}
