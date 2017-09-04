import './style/index.scss'

import game from './game'

const $controlDom = $('.control>span');
//绑定事件
$controlDom.eq(0).on('click',game.run);
$controlDom.eq(1).on('click',game.pause);
$controlDom.eq(2).on('click',game.stop);
