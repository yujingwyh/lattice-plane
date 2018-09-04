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
    1: '#111'
  }
};
const speed = {
  //坦克射击速度，速度/60秒射击一次
  tankShoot: 45,
  //飞机射击速度，速度/60秒射击一次
  planeShoot: 65,
  //子弹移动速度，1/60 秒移动格子数
  bulletMove: 1.2,
  //飞机最小移动速度，1/60 秒移动格子数
  planeMinMove: 0.05,
  //飞机最大移动速度，1/60 秒移动格子数
  planeMaxMove: 0.7,
};
//通用配置
const common = {
  //游戏终止时长，单位分钟 × 60 × 60
  time: 10 * 60 * 60
};

export {lattice, colors, speed, common}
