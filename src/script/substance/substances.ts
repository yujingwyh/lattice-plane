import Tank from "./tank";
import Plane from "./plane";
import Bullet from "./bullet";

interface planeKindCountsInterface {
  [kind: number]: number
}

interface substancesInterface {
  tank: null | Tank,
  planes: Plane[],
  bullets: Bullet[]
}

const planeKindCounts: planeKindCountsInterface = Object.keys(Plane.planeKinds)
  .reduce((prev: any, now) => {
    !isNaN(parseInt(now)) && (prev[now] = 0);

    return prev;
  }, {});
const substances: substancesInterface = {
  tank: null,
  planes: [],
  bullets: []
};


export {substances, planeKindCounts}
