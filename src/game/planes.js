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
    create: small
  },
  [mediumType]: {
    create: medium
  },
  [largeType]: {
    create: large
  },
};

function setLeave(leave) {
  Object.assign(planes[smallType], config.leaveData[leave][smallType]);
}
function create(force) {
  let len, plane, leave;

  if (score.score.surplusScore === 0 && !force) {
    if (
      motions[smallType].length === 0 &&
      motions[mediumType].length === 0 &&
      motions[largeType].length === 0
    ) {
      leave = score.score.leave + 1;
      if (leave >= 10) {
        $.alert('您赢了');
        return;
      }
      $.toast("leave " + leave, config.waitTime);
      setTimeout(function () {
        setLeave(leave);
        create(true);
      }, config.waitTime + 200);
    }
    return;
  }
  plane = planes[smallType];
  for (len = Math.min(1, plane.totalNum, plane.maxExist) - motions[smallType].length; len > 0; len--) {
    plane.create(plane.bmob);
  }
  plane = planes[mediumType];
  for (len = Math.min(plane.totalNum, plane.maxExist) - motions[mediumType].length; len > 0; len--) {
    plane.create(plane.bmob);
  }
  plane = planes[largeType];
  for (len = Math.min(plane.totalNum, plane.maxExist - motions[largeType].length); len > 0; len--) {
    plane.create(plane.bmob);
  }
}

on('gameStart', function () {
  setLeave(1);

  setTimeout(create, config.waitTime);
});
on('removePlane', create);
on('killPlane', function (motion) {
  planes[motion.detailType].totalNum--;
});
