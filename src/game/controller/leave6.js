import config from '../config'
import {createLeaveData} from "./index";

const bmobChildren = config.types.bmob.children;

function onWheel(wheel) {
  if (wheel === 1) {
    return createLeaveData([4, 1, bmobChildren.scattering], [20, 5, bmobChildren.dot], [])
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


