import config from '../config'
import Plane from './plane'

const planeType = config.types.plane;

export default function (bmob) {
  new Plane({
    bmobKind: bmob.type,
    score: planeType.children.small.score * bmob.score,
    map: [
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 0]
    ],
    colors: {
      1: '#333'
    },
    type: planeType.type,
    detailType: planeType.children.small.type,
  })
}
