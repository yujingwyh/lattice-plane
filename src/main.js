import game from './game'
import screen from './lib/screen'

import './style/index.scss'

const $controlDom = $('.control>span');
//绑定事件
$controlDom.eq(0).on('click',game.run);
$controlDom.eq(1).on('click',game.pause);
$controlDom.eq(2).on('click',game.stop);
//全屏  todo 已经注释
//$.confirm('是否允许全屏?', screen.requestFullScreen);
