import {on} from '../lib/event'
import {stopGame} from "./index";

const $dom = $('.score>span');
const maxLeave = 10;

//等级
let leave = 0;
//金币
let gold = 0;


function addLeave() {
  leave++;
  if(leave > maxLeave){
    $.toast('您赢了');
    stopGame();
    return true;
  }
  $dom.eq(0).text(leave);
}

function addGold(val) {
  gold += val;

  $dom.eq(1).text(gold);
}

on('gameStop', function () {
  leave = -1;
  gold = 0;

  addLeave();
  addGold(0);
});

export {leave,gold,addGold, addLeave}
