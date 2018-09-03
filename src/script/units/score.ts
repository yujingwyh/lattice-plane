import {$, cookie} from './dom'

const $dom = $('.score>span');

class Score {
  private maxScore = 0;

  constructor() {
    this.maxScore = parseInt(cookie('maxScore')) || 0;
    $dom.eq(1).text(this.maxScore);
  }

  private _score = 0;

  get score() {
    return this._score;
  }

  set score(num) {
    this._score = num;
    $dom.eq(0).text(this._score);
  }

  reset() {
    this.score = 0;
  }

  add(plane) {
    this.score += 3;

    this.maxScore = Math.max(this.maxScore, this.score);
    $dom.eq(1).text(this.maxScore);
  }
}

const score = new Score();

export default score;
