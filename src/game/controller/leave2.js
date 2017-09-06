import config from '../config'
import {on} from "../../lib/event";
import {createLeaveData} from "./index";

let data;

on('gameStop',function () {
  data = createLeaveData([],[9,3,config.types.bmob.dot],[])
});

export default function () {

}
