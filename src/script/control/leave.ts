import {Plane, pool} from "../substance/index";

import {common, planeKind, speed, substanceType} from "../units/config";
import {getRandomNum} from "../units/helper";

const planeIncreaseInterval = 20 * 60;
const mostPlaneNum = 20;
const bufferPlaneCount = 40 * 60;
const planeNumMiddle = (common.time - bufferPlaneCount) / (mostPlaneNum * mostPlaneNum);

const main = count => {
  if (pool.get(substanceType.plane).length < getPlaneNum(count)) {
    pool.add(new Plane(getPlaneKind(count), getSpeed(count)));
  }
};

function getSpeed(count) {
  return count / (common.time / (speed.planeMaxMove - speed.planeMinMove)) + speed.planeMinMove;
}

function getPlaneKind(count) {
  const kindLength = Object.keys(planeKind).length / 2;

  return getRandomNum(0, Math.min(Math.ceil(count / planeIncreaseInterval), kindLength) - 1)
}

function getPlaneNum(count) {
  if (count <= bufferPlaneCount) return 1;
  return Math.floor(Math.sqrt((count - bufferPlaneCount) / planeNumMiddle))
}

export default main;
