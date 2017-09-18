import config from '../config'

import {generateCoordinate, generateMotion, initGun} from "../guns";
import {createLeaveData} from "./index";

const bmobChildren = config.types.bmob.children;

function onWheel(wheel) {
  if (wheel === 1) {
    return createLeaveData([5,1,bmobChildren.dot],[5,2,bmobChildren.dot],[5,2,bmobChildren.dot])
  }
}

function onCreatePlane(plane, wheel, planes) {
  const position = generateCoordinate(plane.size);

  initGun(plane,position.coordinate, generateMotion(position.position,0.4))
}

function onRun(wheel, planes) {

}


export default {
  onWheel,
  onCreatePlane,
  onRun
}

