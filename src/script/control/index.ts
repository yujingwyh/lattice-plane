import {Plane, planeKindCounts, PlaneKinds, substances, Tank} from "../substance/index";
import score from "./score";

import {lattice} from "../config";
import {each} from "../units/helper";
import {renderLayers} from "../units/canvas";

let count = 0;
//返回game over
const run = () => {
  count++;

  if (planeKindCounts[PlaneKinds.small] < 2) {
    new Plane(PlaneKinds.small, 0.2);
  }
  //run bullet
  substances.bullets.forEach(item => item.run());
  //run plane
  substances.planes.forEach(item => item.run());
  //run tank
  substances.tank.run();

  return substances.tank === null;
};
const reset = () => {
  count = 0;

  const start = {x: 1, y: 1};
  const size = {x: lattice.xNumber, y: lattice.yNumber};

  each(start, size, (x, y) => {
    Object.keys(renderLayers).forEach(item => {
      renderLayers[item][x][y] = 0;
    });
  });

  new Tank();
  substances.planes = [];
  substances.bullets = [];
  Object.keys(planeKindCounts).forEach(item => {
    planeKindCounts[item] = 0;
  });

  score.reset();
};

export default {
  run,
  reset
};
