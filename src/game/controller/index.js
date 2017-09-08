import config from '../config'
//run 必须在最前面
import '../run'
import gun from '../guns'

import status, {state} from "../status";
import {addLeave, leave} from "../leave";
import {on} from "../../lib/event";
import {motions} from "../../lib/motion";
/*
* onWheel,onRun,onCreatePlane
* */
import leave1 from './leave1'
import leave2 from './leave2'
import leave3 from './leave3'
import leave4 from './leave4'
import leave5 from './leave5'
import leave6 from './leave6'
import leave7 from './leave7'
import leave8 from './leave8'
import leave9 from './leave9'
import leave10 from './leave10'

const planeType = config.types.plane.children;
const leaves = {
  [1]: leave1,
  [2]: leave2,
  [3]: leave3,
  [4]: leave4,
  [5]: leave5,
  [6]: leave6,
  [7]: leave7,
  [8]: leave8,
  [9]: leave9,
  [10]: leave10,
};

let leaveCtrl;
let stopRun = true;
let wheel = 0;
let planes = createLeaveData([], [], []);

function ctrl() {
  let hasCreate, key, data, len, hasExist, options;

  if (!stopRun) {
    for (key in planes) {
      if (planes.hasOwnProperty(key)) {
        data = planes[key];

        for (len = Math.min(data.totalNum, data.maxShow) - motions[key].length; len > 0; len--) {
          options = {};
          options.type = key;
          options.bmob = data.bmob;

          gun.createPlane(leaveCtrl.onCreatePlane(options,wheel));

          hasCreate = true;
        }
      }
    }
    if (!hasCreate) {
      for (key in planes) {
        if (planes.hasOwnProperty(key)) {
          if (motions[key].length) {
            hasExist = true;
            break;
          }
        }
      }
      if (!hasExist) {
        //增加新的轮数
        wheel++;

        data = leaveCtrl ? leaveCtrl.onWheel(wheel) : null;

        if (data) {
          Object.assign(planes, data);
          ctrl();
        }
        //增加新等级
        else {
          stopRun = true;

          if (!addLeave()) {
            $.toast("leave " + leave, config.waitTime);
            setTimeout(function () {
              wheel = 0;
              leaveCtrl = leaves[leave];
              planes = createLeaveData([], [], []);
              stopRun = false;

              if (state.RUNING === status.state) {
                ctrl();
              }
            }, config.waitTime + 200);
          }
        }
      }
    }
  }
}

on('gameStart', function () {
  stopRun = false;
});
on('gameRun', ctrl);
on('gameStop',function () {
  stopRun = true;
});
on('removePlane', ctrl);
on('killPlane', function (motion) {
  if(!stopRun){
    planes[motion.detailType].totalNum--;
    ctrl();
  }
});
on('run', function () {
  leaveCtrl && leaveCtrl.onRun(wheel, planes);
});


function createLeaveData(plane1, plane2, plane3) {
  return {
    [planeType.small.type]: {
      totalNum: plane1[0] || 0,
      maxShow: plane1[1] || 0,
      bmob: plane1[2] || null
    },
    [planeType.medium.type]: {
      totalNum: plane2[0] || 0,
      maxShow: plane2[1] || 0,
      bmob: plane2[2] || null
    },
    [planeType.large.type]: {
      totalNum: plane3[0] || 0,
      maxShow: plane3[1] || 0,
      bmob: plane3[2] || null
    },
  };
}


export {createLeaveData}
