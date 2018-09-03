import Tank from './tank'
import Plane from './plane'


const substances = {
  tank: Tank.tank,
  planes: Plane.planes,
  bullets: []
};
const planeKindCount = Plane.planeKindCounts;
const PlaneKinds = Plane.planeKinds;


export {Tank, Plane, substances, planeKindCount, PlaneKinds}
