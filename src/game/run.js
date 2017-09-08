import config from './config'

import {on,trigger} from "../lib/event";
import status, {state} from "./status";
import {motions} from "../lib/motion";


let timeIndex;
/**
 * 运行
 */
on('gameRun', function run() {
  let typeMotion, i, len;

  timeIndex= setInterval(function () {
    for (let key in motions) {
      if (motions.hasOwnProperty(key)) {
        typeMotion = motions[key];

        for (i = 0, len = typeMotion.length; i < len; i++) {
          if (status.state !== state.RUNING) return;

          typeMotion[i].run();

          //run后remove
          if (len !== typeMotion.length) {
            len = typeMotion.length;
            i--;
          }
        }
      }
    }
    if (status.state === state.RUNING){
      trigger('run');
    }
  }, config.interval);
});
on('gamePause', function () {
  clearInterval(timeIndex);
});
on('gameStop',function () {
  setMotion(config.types);

  function setMotion(types) {
    for(let keys in types){
      if(types.hasOwnProperty(keys)){
        setMotion(types[keys]);
      }
    }
    if(types.type){
      motions[types.type] = [];
    }
  }
});
