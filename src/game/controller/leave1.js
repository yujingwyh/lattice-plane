import config from '../config'
import gun from '../guns'

import {on} from "../../lib/event";
import {motions} from "../../lib/motion";
import {createLeaveData} from "./index";

let datas;

on('killPlane', function (motion) {
  datas[motion.detailType].totalNum--;
});
on('gameStop', function () {
  datas = createLeaveData([4, 3, config.types.bmob.children.dot], [], [])
});

export default function () {
  let planeType = gun.planeType;
  let hasCreate, key, type, data, len, hasExist;


  for (key in planeType) {
    if (planeType.hasOwnProperty(key)) {
      type = planeType[key].type;
      data = datas[type];

      for (len = Math.min(data.totalNum, data.maxShow) - motions[type].length; len > 0; len--) {
        gun.createPlane(type, data.bmob);

        hasCreate = true;
      }
    }
  }
  if (!hasCreate) {
    for (key in planeType) {
      if (planeType.hasOwnProperty(key)) {
        type = planeType[key].type;

        if (motions[type].length) {
          hasExist = true;
          break;
        }
      }
    }
    return !hasExist;
  }
}
