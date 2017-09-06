import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([4,1,config.types.bmob.children.scattering],[20,5,config.types.bmob.children.dot],[])
});

export default function () {

}
