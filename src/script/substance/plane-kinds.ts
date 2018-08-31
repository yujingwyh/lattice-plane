import Substance from "./base";
import {colors} from "../config";
import {bulletKinds} from "./bullet";

enum KINDS {
  small,
  medium,
  large
}

const handleOptions = (kind,planeOptions,bulletOptions) => {
  if (kind === KINDS.small) {
    planeOptions.shape = Substance.generateShape([
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKinds.line;
  }
  if (kind === KINDS.medium) {
    planeOptions.shape = Substance.generateShape([
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKinds.horn;
  }
  if (kind === KINDS.large) {
    planeOptions.shape = Substance.generateShape([
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ], colors.planeMap);
    bulletOptions.kind = bulletKinds.horn;
  }
};

export {KINDS,handleOptions}
