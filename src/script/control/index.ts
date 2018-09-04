import {status, substances, Tank} from "../substance/index";
import leave from './leave';

import {common, lattice} from "../config";
import {each} from "../units/helper";
import {renderLayers} from "../units/canvas";
import {toast} from "../units/dom";

let count = 0;
//返回是否终止
const run = (): boolean => {
  count++;

  leave(count);
  //run tank
  substances.tank.status === status.normal && substances.tank.run();
  //run plane
  substances.planes = substances.planes.filter(item => {
    item.status === status.normal && item.run();

    return item.status === status.normal;
  });
  //run bullet
  substances.bullets.forEach(item => {
    item.status === status.normal && item.run();

    return item.status === status.normal;
  });

  if (substances.tank.status === status.destroy) {
    toast('GAME OVER');
    return true;
  }
  if (count > common.time) {
    toast('你赢了');
    return true;
  }
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

  substances.tank = substances.tank || new Tank();
  substances.tank.reset();
  substances.planes = [];
  substances.bullets = [];
};

export default {
  run,
  reset
};
