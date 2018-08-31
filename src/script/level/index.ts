import score from "./score";

let count = 0;

const run = () => {
  count++;
};
const reset = () => {
  count = 0;
  score.reset();
};


export default {
  run,
  reset
};
