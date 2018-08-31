import level from './level'
import substance from './substance'
import canvas from "./units/canvas";

import {toast} from "./units/dom";

export default class Game {
  private timer;
  private $control;

  constructor($control) {
    this.$control = $control;
    this.run = this.run.bind(this);

    canvas.init();
    substance.createTank();
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
    substance.reset();

    canvas.render();

    this.$control.eq(1).hide();
    this.$control.eq(2).hide();
    this.$control.eq(0).show();
  }

  private run() {
    level.run();
    substance.run();

    if (substance.substances.tank.status !== substance.substanceStates.normal) {
      toast('GAME OVER');
      return this.stop();
    }
    //render
    canvas.render();

    this.timer = window.requestAnimationFrame(this.run);
  }
}
