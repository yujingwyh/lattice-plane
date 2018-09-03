import {planeKindCounts, PlaneKinds} from "../substance/index";
import Plane from "../substance/plane";

const main = count => {
  if (planeKindCounts[PlaneKinds.large] < 1) {
    new Plane(PlaneKinds.large, 0.2);
  }
};

export default main;
