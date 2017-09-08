import config from '../config'
import {createLeaveData} from "./index";

const bmobChildren = config.types.bmob.children;

function onWheel(wheel) {
  if (wheel === 1) {
    return createLeaveData([12,3,bmobChildren.dot],[8,2,bmobChildren.dot],[4,1,bmobChildren.dot])
  }
}

function onCreatePlane(options, wheel) {
  return options;
}

function onRun(wheel, planes) {

}


export default {
  onWheel,
  onCreatePlane,
  onRun
}

