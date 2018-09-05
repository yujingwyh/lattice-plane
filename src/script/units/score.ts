import {$, cookie} from './dom'

const $dom = $('.score>span');

const score = new class Score {
  constructor() {
    this.maxScore = parseInt(cookie('maxScore')) || 0;
  }

  private _maxScore = 0;

  get maxScore() {
    return this._maxScore;
  }

  set maxScore(score) {
    this._maxScore = score;
    $dom.eq(1).text(score);
  }

  private _score = 0;

  get score() {
    return this._score;
  }

  set score(score) {
    this._score = score;
    $dom.eq(0).text(score);
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
};

export default score;
