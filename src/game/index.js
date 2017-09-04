import status, {state} from './status'
import screen from '../lib/screen'

import {trigger} from '../lib/event'

import './tank'
import './planes'

let isInit = false;
let isStop = true;

//运行
function run() {
  if (!isInit) {
    isInit = true;
    //!screen.isFull && screen.requestFullScreen();
    trigger('gameInit');
    stop(true);
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
//停止
function stop(isInit) {
  pause();
  if(!isInit){
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
