import config from '../config'
import {createLeaveData} from "./index";

const bmobChildren = config.types.bmob.children;

function onWheel(wheel) {
  if (wheel === 1) {
    return createLeaveData([],[10,3,bmobChildren.scattering],[10,3,bmobChildren.scattering])
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

