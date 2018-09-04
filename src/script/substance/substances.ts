import Tank from "./tank";
import Plane from "./plane";
import {Bullet} from "./bullet";

interface substancesInterface {
  tank: Tank,
  planes: Plane[],
  bullets: Bullet[]
}

const substances: substancesInterface = {
  tank: null,
  planes: [],
  bullets: []
};


export default substances
