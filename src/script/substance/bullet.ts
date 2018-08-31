import Substance, {constructorOptions as substanceConstructorOptions, moveSpeedType} from './base'


enum KINDS {
  line,
  horn,
  cross
}

export interface constructorOptions extends substanceConstructorOptions {
  kind: KINDS,
  moveSpeed: moveSpeedType,
  source?: Substance,
}

export {KINDS as bulletKinds,constructorOptions as bulletConstructorOptions}
export default class Bullet extends Substance {
  constructor(options: constructorOptions) {
    options.shape = [[]];
    super(options)

  }

  run(){

  }
}
