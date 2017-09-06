import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([12,3,config.types.bmob.scattering],[12,3,config.types.bmob.scattering],[12,3,config.types.bmob.scattering])
});

export default function () {

}
