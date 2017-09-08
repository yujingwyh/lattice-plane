import config from '../config'
import Plane from './plane'

const planeType = config.types.plane;

export default function (bmob) {
  return new Plane({
    bmob,
    score:planeType.children.medium.score,
    map: [
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ],
    colors: {
      1: '#333'
    },
    type: planeType.type,
    detailType: planeType.children.medium.type,
  })
}
