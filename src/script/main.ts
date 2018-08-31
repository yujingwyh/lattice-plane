import 'babel-polyfill'

import Game from './game'
import {$} from "./units/dom";

$(() => {
  const $control = $('.control>span');
  const game = new Game($control);

  game.stop();
  //阻止上下拉滑动
  window.addEventListener(
    'touchmove',
    evt => evt.preventDefault(),
    {passive: false}
  );
  //绑定事件
  $control.eq(0).on('click', game.start.bind(game));
  $control.eq(1).on('click', game.pause.bind(game));
  $control.eq(2).on('click', game.stop.bind(game));
});
