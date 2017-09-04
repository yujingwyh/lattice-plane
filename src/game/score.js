import {on} from '../lib/event'

const $dom = $('.score>span');

const score = new (class Score {
  //级别
  leave = 1;
  //距离下一级别剩余分数 会从全部分数计算
  surplusScore;
  //实际分数
  _nowScore = 0;
  //全部分数 未消灭的敌人也会计入
  _allScore = 0;

  constructor() {
    this.nowScore = 0;
    this.surplusScore = Score.getScoreByLeave(this.leave);
  }

  static getScoreByLeave(leave) {
    leave++;

    return leave * (leave - 1) * 25;
  }
  set nowScore(val) {
    this._nowScore = val;
    this.leave += val >= Score.getScoreByLeave(this.leave + 1) ? 1 : 0;

    $dom.eq(0).text(val);
    $dom.eq(1).text(this.leave);
  }

  get nowScore() {
    return this._nowScore || 0;
  }

  set allScore(val) {
    this._allScore = val;

    this.surplusScore = Score.getScoreByLeave(this.leave) - this._allScore;
  }

  get allScore() {
    return this._allScore || 0;
  }
});

on('gameStop', function () {
  score.nowScore = 0;
  score.allScore = 0;
});

export default {
  score,
  addScore: (scoreNum) => {
    score.nowScore += scoreNum;
  },
  addToAllScore: (scoreNum) => {
    score.allScore += scoreNum;
  }
}
