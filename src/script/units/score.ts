import {$, cookie} from './dom'

const $dom = $('.score>span');

class Score {
  private _maxScore = 0;
  private _score = 0;

  constructor() {
    this.maxScore = parseInt(cookie('maxScore')) || 0;
  }

  get score() {
    return this._score;
  }

  set score(score) {
    this._score = score;
    $dom.eq(0).text(score);
  }

  get maxScore() {
    return this._maxScore;
  }

  set maxScore(score) {
    this._maxScore = score;
    $dom.eq(1).text(score);
  }

  //重置
  reset() {
    this.score = 0;
  }

  //添加
  add(score) {
    this.score += score;

    this.maxScore = Math.max(this.maxScore, this.score);
    cookie('maxScore', this.maxScore);
  }
}

const score = new Score();

export default score;
