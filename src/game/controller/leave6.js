import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([4,1,config.types.bmob.scattering],[20,5,config.types.bmob.dot],[])
});

export default function () {

}
