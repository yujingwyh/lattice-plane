import Substance from './base'

import {substanceType} from "../units/config";

interface dataInterface {
  [key: string]: Substance[]
}

interface poolInterface {
  add(substance: Substance): void;

  get(): Substance[][];

  get(type: substanceType): Substance[];

  get(type: substanceType.tank): Substance;

  destroy(): void;

  destroy(type: substanceType): void;

  destroy(substance: Substance): void
}

const pool = new class Pool implements poolInterface {
  private data: dataInterface;

  constructor() {
    this.data = {};
  }

  add(substance: Substance) {
    this.data[substance.type] = this.data[substance.type] || [];
    this.data[substance.type].push(substance);
  }

  get(type?: substanceType): any {
    if (type === substanceType.tank) {
      return this.data[substanceType.tank][0];
    }
    else if (type) {
      return this.data[type] || [];
    }
    else {
      return Object.keys(this.data).map(item => this.data[item]);
    }
  }

  destroy(param?: substanceType | Substance) {
    if (param instanceof Substance) {
      this.data[param.type].splice(this.data[param.type].indexOf(param), 1);
    }
    else if (param) {
      this.data[param] = [];
    }
    else {
      this.data = {};
    }
  }
};


export default pool
