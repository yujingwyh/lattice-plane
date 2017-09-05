const types = {
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
};
const planeType = types.plane.children;
const bmobType = types.bmob.children;

function createLeaveData(plane1, plane2, plane3) {
  return {
    [planeType.small.type]: {
      totalNum: plane1[0] || 0,
      maxExist: plane1[1] || 0,
      bmob: plane1[2] || null
    },
    [planeType.medium.type]: {
      totalNum: plane2[0] || 0,
      maxExist: plane2[1] || 0,
      bmob: plane2[2] || null
    },
    [planeType.large.type]: {
      totalNum: plane3[0] || 0,
      maxExist: plane3[1] || 0,
      bmob: plane3[2] || null
    },
  };
}

export default {
  //物体类型
  types,
  stepRate: 10,
  //执行时间间隔
  interval: 30,
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
  leaveData: [
    //0
    {},
    //1
    createLeaveData([9,3,bmobType.dot],[],[]),
    //2
    createLeaveData([],[9,3,bmobType.dot],[]),
    //3
    createLeaveData([6,2,bmobType.dot],[6,2,bmobType.dot],[]),
    //4
    createLeaveData([8,2,bmobType.dot],[],[8,2,bmobType.dot]),
    //5
    createLeaveData([12,3,bmobType.dot],[8,2,bmobType.dot],[4,1,bmobType.dot]),
    //6
    createLeaveData([4,1,bmobType.scattering],[20,5,bmobType.dot],[]),
    //7
    createLeaveData([8,2,bmobType.scattering],[],[16,4,bmobType.dot]),
    //8
    createLeaveData([],[12,3,bmobType.scattering],[16,4,bmobType.dot]),
    //9
    createLeaveData([12,3,bmobType.scattering],[12,3,bmobType.scattering],[12,3,bmobType.scattering]),
    //10
    createLeaveData([],[],[45,9,bmobType.scattering]),
  ]
}
