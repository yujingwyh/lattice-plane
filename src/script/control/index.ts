import {pool, Tank} from "../substance/index";
import leave from './leave';

import {common, lattice, substanceType} from "../units/config";
import {each} from "../units/helper";
import {renderLayers} from "../units/canvas";
import {toast} from "../units/dom";

let count = 0;
//返回是否终止
const run = (): boolean => {
  count++;

  leave(count);
  //run
  pool.get().forEach(item => item.forEach(substance => {
    !substance.isDestroy && substance.run();
  }));

  if (pool.get(substanceType.tank).isDestroy) {
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

  pool.destroy();
  new Tank();
};

export default {
  run,
  reset
};
