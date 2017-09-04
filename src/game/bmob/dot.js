import Bmob from './bmob'
import config from '../config'
//点状
export default function (motion) {
  new Bmob({
    motion,
    detailType: config.types.bmob.children.dot.type,
    offset: {
      x: 0,
      y: 0
    }
  });
}
