import data from '../data'
import score from "./score";

let count = 0;

const run = () => {
  count++;

  if (data.planes.length === 0) {
    //new Plane(0.01);
  }
};
const reset = () => {
  count = 0;

  data.planes = [];
  data.bullets = [];

  score.reset();
};


export default {
  run,
  reset
};
