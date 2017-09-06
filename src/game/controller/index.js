import config from '../config'
import {addLeave, leave} from "../leave";
import {on} from "../../lib/event";

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

let stopRun = true;

function ctrl() {
  let isUpgrade;

  if (!stopRun) {
    isUpgrade = leaves[leave]();
  }
  if (isUpgrade || stopRun) {
    stopRun = true;

    if (!addLeave()) {
      $.toast("leave " + leave, config.waitTime);
      setTimeout(function () {
        stopRun = false;
        ctrl();
      }, config.waitTime + 200);
    }
  }
}

on('gameStart',ctrl);
on('gameStop',function () {
  stopRun = true;
});
on('removePlane', ctrl);


function createLeaveData(plane1, plane2, plane3) {
  return {
    [planeType.small.type]: {
      totalNum: plane1[0] || 0,
      showNum: plane1[1] || 0,
      bmob: plane1[2] || null
    },
    [planeType.medium.type]: {
      totalNum: plane2[0] || 0,
      showNum: plane2[1] || 0,
      bmob: plane2[2] || null
    },
    [planeType.large.type]: {
      totalNum: plane3[0] || 0,
      showNum: plane3[1] || 0,
      bmob: plane3[2] || null
    },
  };
}


export {createLeaveData}
