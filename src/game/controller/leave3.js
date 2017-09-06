import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([6,2,config.types.bmob.dot],[6,2,config.types.bmob.dot],[])
});

export default function () {

}
