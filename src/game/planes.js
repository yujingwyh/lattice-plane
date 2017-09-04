import config from './config'
import score from './score'

import {on} from '../lib/event'
import {motions} from "../lib/motion";

import small from './planes/small'
import medium from './planes/medium'
import large from './planes/large'

const planeType = config.types.plane.children;
const smallType = planeType.small.type;
const mediumType = planeType.medium.type;
const largeType = planeType.large.type;

let planes = {
  [smallType]: {
    create: small,
    totalNum: 0,
    maxExist: 0,
    bmob: null
  },
  [mediumType]: {
    create: medium,
    totalNum: 0,
    maxExist: 0,
    bmob: null
  },
  [largeType]: {
    create: large,
    totalNum: 0,
    maxExist: 0,
    bmob: null
  },
};

function setLeave(leave) {
  Object.assign(planes, config.leaveData[leave]);
}
function create() {
  let len, plane, leave;

  if (score.score.surplusScore === 0) {
    if (
      motions[smallType].length === 0 &&
      motions[mediumType].length === 0 &&
      motions[largeType].length === 0
    ) {
      leave = score.score.leave + 1;
      $.toast("leave " + leave);
      setTimeout(setLeave(leave), 2000);
    }
    else {
      return;
    }
  }
  plane = planes[smallType];
  for (len = Math.min(plane.totalNum, plane.maxExist); len > 0; len--) {
    planes[smallType].totalNum--;
    plane.create(plane.bmob);
  }
  plane = planes[mediumType];
  for (len = Math.min(plane.totalNum, plane.maxExist); len > 0; len--) {
    planes[mediumType].totalNum--;
    plane.create(plane.bmob);
  }
  plane = planes[largeType];
  for (len = Math.min(plane.totalNum, plane.maxExist); len > 0; len--) {
    planes[largeType].totalNum--;
    plane.create(plane.bmob);
  }
}

on('gameStart', function () {
  setLeave(1);
  create();
});
on('removePlane', create);
