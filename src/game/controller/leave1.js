import config from '../config'
import gun from '../guns'

import {motions} from "../../lib/motion";
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('killPlane', function (motion) {
  data[motion.detailType].totalNum--;
});
on('gameStop', function () {
  data = createLeaveData([9, 3, config.types.bmob.children.dot], [], [])
});

export default function () {
  let planeType = gun.planeType;
  let key, len, type,
    killAll = true;

  for (key in planeType) {
    if (planeType.hasOwnProperty(key)) {
      type = planeType[key].type;
      if (motions[type].length > 0 || data[type].totalNum > 0) {
        killAll = false;
        break;
      }
    }
  }

  if (killAll) {
    return true;
  }
  else {
    for (key in planeType) {
      if (planeType.hasOwnProperty(key)) {
        type = planeType[key].type;

        for (len = Math.min(data[type].totalNum, data[type].showNum) - motions[type].length; len > 0; len--) {
          gun.createPlane(type,data[type].bmob);
        }
      }
    }
  }
}
