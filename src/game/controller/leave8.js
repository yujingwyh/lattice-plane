import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([],[12,3,config.types.bmob.children.scattering],[16,4,config.types.bmob.children.dot])
});

export default function () {

}
