import config from '../config'

import {generateCoordinate, generateMotion, initGun} from "../guns";
import {createLeaveData} from "./index";

const bmobChildren = config.types.bmob.children;

function onWheel(wheel) {
  if (wheel === 1) {
    return createLeaveData([4, 1, bmobChildren.scattering], [20, 5, bmobChildren.dot], [])
  }
}

function onCreatePlane(plane, wheel, planes) {
  const position = generateCoordinate(plane.size);

  initGun(plane,position.coordinate, generateMotion(position.position))
}

function onRun(wheel, planes) {

}


export default {
  onWheel,
  onCreatePlane,
  onRun
}


