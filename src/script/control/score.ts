import {$, cookie} from '../units/dom'

const $dom = $('.score>span');

let maxScore = parseInt(cookie('maxScore')) || 0;
let score = 0;

$dom.eq(1).text(maxScore);

const reset = () => {
  score = 0;
  $dom.eq(0).text(score);
};
const add = plane => {
  score += 3;
  maxScore = Math.max(maxScore, score);

  $dom.eq(0).text(score);
  $dom.eq(1).text(maxScore);
};
const get = () => score;

export default {
  reset,
  add,
  get
}
