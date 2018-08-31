import score from "./score";
import {createPlane, planeKindNumbers,planeKinds} from "../substance";

let count = 0;

const run = () => {
  count++;
  if (planeKindNumbers[planeKinds.small] < 2) {
    createPlane(planeKinds.small, 0.2);
  }
};
const reset = () => {
  count = 0;
  score.reset();
};


export default {
  run,
  reset
};
