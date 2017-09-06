export default {
  stepRate: 10,
  //执行时间间隔
  interval: 40,
  //单个格子所占的像素
  latticeSize:6,
  //格子直接的间距(像素)
  spaceLattice:2,
  //进入新等级时飞机多长时间出现
  waitTime:2000,
  colors:{
    //背景颜色
    bg:'#969e89',
    //坦克炮弹颜色
    tankBmob:'#00f',
    //飞机炮弹颜色
    planeBmob:'#0ff'
  },
  //物体类型
  types:{
    bg: {type: 0},
    tank: {
      type: 1,
      bmob: {type: 2}
    },
    plane: {
      type: 3,
      bmob: {type: 4},
      children: {
        small: {type: 5, score: 10},
        medium: {type: 6, score: 12},
        large: {type: 7, score: 16}
      }
    },
    bmob: {
      type: 20,
      children: {
        dot: {type: 21, score: 1},
        scattering: {type: 22, score: 2.5},
      }
    }
  }
}
