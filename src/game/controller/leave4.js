import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([8,2,config.types.bmob.children.dot],[],[8,2,config.types.bmob.children.dot])
});

export default function () {

}
