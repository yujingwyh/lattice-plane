import Substance from './base'
import Tank, {tankConstructorOptions} from './tank'
import Plane, {planeConstructorOptions,planeKinds, planeKindsInterface} from "./plane";
import Bullet, {bulletConstructorOptions, bulletKinds} from "./bullet";

import {lattice,bullet, tank,plane} from "../config";
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
const planeKindNumbers: planeKindsInterface = {
  small: 0,
  medium: 0,
  large: 0
};

function createTank() {
  const tankOptions: tankConstructorOptions = {
    shape: null,
    shootSpeed: tank.shootSpeed,
    renderLayer: renderLayers.tank,
    checkLayer: renderLayers.plane,
  };
  const bulletOptions: bulletConstructorOptions = {
    kind: bulletKinds.line,
    moveSpeed: bullet.moveSpeed,
    renderLayer: renderLayers.tankBullet,
    checkLayer: renderLayers.plane,
    shape: null
  };

  tankOptions['shape'] = Substance.generateShape([
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1]
  ], {
    1: '#222'
  });

  substances.tank = new Tank(tankOptions, bulletOptions);
  substances.tank.bulletOptions.source = substances.tank;
}

function createPlane(kind, moveSpeed) {
  const planeOptions: planeConstructorOptions = {
    shape: null,
    kind:kind,
    moveSpeed:moveSpeed,
    shootSpeed: plane.shootSpeed,
    renderLayer: renderLayers.plane,
    checkLayer: renderLayers.plane,
  };
  const bulletOptions: bulletConstructorOptions = {
    kind: bulletKinds.line,
    moveSpeed: bullet.moveSpeed,
    renderLayer: renderLayers.tankBullet,
    checkLayer: renderLayers.plane,
    shape: null
  };

 /* const planeKindOption: planeOptionInterFace = (function () {
    const kindOption: planeOptionInterFace = {
      [planeKinds.small]: {},
      [planeKinds.medium]: {},
      [planeKinds.large]: {},
    };
    const colorMap = {
      1: '#333'
    };

    kindOption.shape = generateShape([
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 0]
    ], colorMap);
    kindOption.shape = generateShape([
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0]
    ], colorMap);
    kindOption.shape = generateShape([
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ], colorMap);


    return kindOption
  }());*/
}

function reset() {
  const start = {x: 1, y: 1};
  const size = {x: lattice.xNumber, y: lattice.yNumber};

  substances.planes = [];
  substances.bullets = [];
  Object.keys(planeKindNumbers).forEach(item=>{
    planeKindNumbers[item] = 0;
  });

  each(start, size, (x, y) => {
    Object.keys(renderLayers).forEach(item=>{
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
  //run bullet
  substances.bullets.forEach(item => item.run());
  //run plane
  substances.planes.forEach(item => item.run());
}

export {createPlane, planeKindNumbers}
export default {createTank, reset, run, substances, substanceStates}
