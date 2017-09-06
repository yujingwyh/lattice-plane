import status, {state} from './status'

import {trigger} from '../lib/event'

import './controller'

let isInit = false;
let isStop = true;

//运行
function run() {
  if (!isInit) {
    isInit = true;
    trigger('gameInit');
    stop();
  }
  status.state = state.RUNING;
  if(isStop){
    trigger('gameStart');
  }
  isStop = false;
  trigger('gameRun');
}
//暂停
function pause() {
  status.state = state.PARSEING;
  trigger('gamePause');
}
/**
 * 停止
 * @param isFaile 失败
 */
function stop(isFaile = false) {
  pause();
  if(isFaile){
    $.toast('游戏结束');
  }
  status.state = state.STOPING;
  isStop = true;
  trigger('gameStop');
}

export {stop as stopGame}
export default {
  run,
  pause,
  stop
}
