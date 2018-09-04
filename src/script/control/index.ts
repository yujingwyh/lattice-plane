import {substances, Tank} from "../substance/index";
import leave from './leave';

import {lattice} from "../config";
import {each} from "../units/helper";
import {renderLayers} from "../units/canvas";

let count = 0;
//返回是否终止
const run = (): boolean => {
  count++;

  if (leave(count)) return true;
  //run tank
  substances.tank.run();
  //run plane
  substances.planes.forEach(item => item.run());
  //run bullet
  substances.bullets.forEach(item => item.run());
  if (substances.tank === null) return true;
};
const reset = () => {
  count = 0;
  //重置渲染层
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
};

export default {
  run,
  reset
};
