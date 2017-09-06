import config from '../config'
import gun from '../guns'

import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let datas;

on('killPlane', function (motion) {
  datas[motion.detailType].totalNum--;
  datas[motion.detailType].existNum--;
});
on('gameStop', function () {
  datas = createLeaveData([9, 3, config.types.bmob.children.dot], [], [])
});

export default function () {
  let planeType = gun.planeType;
  let key, len, data, type,
    killAll = true;

  for (key in planeType) {
    if (planeType.hasOwnProperty(key)) {
      data = datas[planeType[key].type];

      if (data.existNum > 0 || data.totalNum > 0) {
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
        data = datas[type];
        for (len = Math.min(data.totalNum, data.maxShow) - data.existNum; len > 0; len--) {
          gun.createPlane(type, data.bmob);
          datas[type].existNum++;
        }
      }
    }
  }
}
