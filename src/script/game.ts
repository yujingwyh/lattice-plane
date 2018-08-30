import data from './data'
import level from './level'
import canvas from "./units/canvas";

import {Tank} from './substance'
import {toast} from "./units/dom";

export default class Game {
  private timer;
  private $control;

  constructor($control) {
    this.$control = $control;
    this.run = this.run.bind(this);

    data.tank = new Tank();
  }

  start() {
    this.timer = window.requestAnimationFrame(this.run);
    this.$control.eq(0).hide();
    this.$control.eq(1).show();
    this.$control.eq(2).show();
  }

  pause() {
    window.cancelAnimationFrame(this.timer);

    this.$control.eq(1).hide();
    this.$control.eq(0).show();
    this.$control.eq(2).show();
  }

  stop() {
    this.pause();

    level.reset();
    canvas.resetLayers();

    data.tank.position = {
      x: Math.ceil((data.latticeX - data.tank.shapeSize.x) / 2) + 1,
      y: data.latticeY - data.tank.shapeSize.y
    };
    data.tank.addToLayer();
    canvas.render();

    this.$control.eq(1).hide();
    this.$control.eq(2).hide();
    this.$control.eq(0).show();
  }

  //run
  private run() {
    level.run();
    //run bullet
    data.bullets.forEach(item => item.run());
    //run plane
    data.planes.forEach(item => item.run());
    //run tank 检测game over
    if (data.tank.run()) {
      toast('GAME OVER');
      return this.stop();
    }
    //render
    canvas.render();

    this.timer = window.requestAnimationFrame(this.run);
  }
}
