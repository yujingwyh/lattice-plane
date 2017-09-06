import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([8,2,config.types.bmob.dot],[],[8,2,config.types.bmob.dot])
});

export default function () {

}
