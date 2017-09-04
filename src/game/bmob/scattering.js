import Bmob from './bmob'
import config from '../config'
//散射
export default function (motion) {
  createBmob({x: -1, y: 0});
  createBmob({x: 0, y: 0});
  createBmob({x: 1, y: 0});


  function createBmob(offset) {
    return new Bmob({
      motion, offset,
      detailType: config.types.bmob.children.scattering.type
    });
  }
}
