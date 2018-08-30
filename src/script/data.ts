import {Bullet, Plane, Tank} from './substance'
import {layerType} from "./units/helper";

const layerCompound: layerType = [];
const layerTank: layerType = [];
const layerPlane: layerType = [];
const layerTankBullet: layerType = [];

//坦克
const tank: Tank = null;
//所有飞机
const planes: Plane[] = [];
//所有子弹
const bullets: Bullet[] = [];

export default {
  //x轴格子数量
  latticeX: 0,
  //y轴格子数量
  latticeY: 0,

  layerCompound,
  layerTank,
  layerPlane,
  layerTankBullet,

  tank,
  planes,
  bullets
}
