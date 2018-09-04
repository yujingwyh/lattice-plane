import {Plane, substances} from "../substance/index";

import {toast} from "../units/dom";
import {leave, speed} from "../config";
import {getRandomNum} from "../units/helper";

const maxCount = leave.time * 60 * 60;
const planeIncreaseInterval = 20 * 60;
const mostPlaneNum = 20;
const bufferPlaneCount = 40 * 60;
const planeNumMiddle = (maxCount - bufferPlaneCount) / (mostPlaneNum * mostPlaneNum)

const main = count => {
  if (count > maxCount) {
    toast('你赢了');

    return true;
  }
  if (substances.planes.length < getPlaneNum(count)) {
    new Plane(getPlaneKind(count), getSpeed(count));
  }

  return false;
};

function getSpeed(count) {
  return count / (maxCount / (speed.planeMaxMove - speed.planeMinMove)) + speed.planeMinMove;
}

function getPlaneKind(count) {
  return getRandomNum(0, Math.min(Math.ceil(count / planeIncreaseInterval), 3) - 1)
}

function getPlaneNum(count) {
  if (count <= bufferPlaneCount) return 1;
  return Math.floor(Math.sqrt((count - bufferPlaneCount) / planeNumMiddle))
}

export default main;
