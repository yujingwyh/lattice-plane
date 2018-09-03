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
  tankShoot: 80,
  //飞机射击速度
  planeShoot: 100,
  //子弹移动速度
  bulletMove: 0.3
};

export {lattice, colors, speed}
