import Substance from './base'
import Tank, {tankConstructorOptions} from './tank'
import Plane, {planeConstructorOptions} from "./plane";
import Bullet, {bulletConstructorOptions, bulletKinds} from "./bullet";
import {handleOptions, KINDS as planeKinds} from "./plane-kinds";

import {colors, lattice, speed} from "../config";
import {renderLayers} from "../units/canvas";
import {each} from "../units/helper";

interface substancesInterface {
  tank: Tank,
  planes: Plane[],
  bullets: Bullet[]
}

const substanceStates = Substance.status;
const substances: substancesInterface = {
  tank: null,
  planes: [],
  bullets: []
};
const planeKindNumbers = Object.keys(planeKinds).reduce((prev: any, now) => {
  !isNaN(parseInt(now)) && (prev[now] = 0);

  return prev;
}, {});

function createTank() {
  const tankOptions: tankConstructorOptions = {
    shape: null,
    shootSpeed: speed.tankShoot,
    renderLayer: renderLayers.tank,
    checkLayer: renderLayers.plane,
  };
  const bulletOptions: bulletConstructorOptions = {
    kind: bulletKinds.line,
    moveSpeed: speed.bulletMove,
    renderLayer: renderLayers.tankBullet,
    checkLayer: renderLayers.plane,
    shape: null
  };

  tankOptions['shape'] = Substance.generateShape([
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1]
  ], colors.tankMap);

  substances.tank = new Tank(tankOptions, bulletOptions);
}

function createPlane(kind, moveSpeed) {
  const planeOptions: planeConstructorOptions = {
    shape: null,
    kind: kind,
    moveSpeed: moveSpeed,
    shootSpeed: speed.planeShoot,
    renderLayer: renderLayers.plane,
    checkLayer: renderLayers.plane,
  };
  const bulletOptions: bulletConstructorOptions = {
    moveSpeed: speed.bulletMove,
    renderLayer: renderLayers.tankBullet,
    checkLayer: renderLayers.plane,
    kind: null,
    shape: null
  };
  handleOptions(kind, planeOptions, bulletOptions);

  const newPlane = new Plane(planeOptions, bulletOptions);

  if (newPlane.status === substanceStates.normal) {
    substances.planes.push(newPlane);
    planeKindNumbers[newPlane.kind] += 1;
  }
}

function reset() {
  const start = {x: 1, y: 1};
  const size = {x: lattice.xNumber, y: lattice.yNumber};

  substances.planes = [];
  substances.bullets = [];
  Object.keys(planeKindNumbers).forEach(item => {
    planeKindNumbers[item] = 0;
  });

  each(start, size, (x, y) => {
    Object.keys(renderLayers).forEach(item => {
      renderLayers[item][x][y] = 0;
    });
  });

  substances.tank.position = {
    x: Math.ceil((lattice.xNumber - substances.tank.shapeSize.x) / 2) + 1,
    y: lattice.yNumber - substances.tank.shapeSize.y
  };
  substances.tank.addToLayer();
}

function run() {
  substances.tank.run();

  //run plane
  substances.planes = substances.planes.filter(item => {
    item.run();

    if (item.status !== substanceStates.normal) {
      planeKindNumbers[item.kind] -= 1;

      return false;
    }
    return true;
  });
  //run bullet
  substances.bullets.forEach(item => item.run());
}

export {createPlane, planeKinds, planeKindNumbers}
export default {createTank, reset, run, substances, substanceStates}
