import canvas from "./units/canvas";
import score from './units/score'
import control from './control/index'

export default class Game {
  private timer;
  private $control;

  constructor($control) {
    this.$control = $control;
    this.run = this.run.bind(this);

    canvas.init();
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

    control.reset();
    score.reset();
    canvas.render();

    this.$control.eq(1).hide();
    this.$control.eq(2).hide();
    this.$control.eq(0).show();
  }

  private run() {
    if (control.run()) {
      return this.stop();
    }
    //render
    canvas.render();

    this.timer = window.requestAnimationFrame(this.run);
  }
}
