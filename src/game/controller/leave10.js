import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([],[],[45,9,config.types.bmob.scattering])
});

export default function () {

}
