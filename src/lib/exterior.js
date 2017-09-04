const colorMap = {
  0: 0
};
const assign = Object.assign;

export default class {
  //图 0-表示透明，不占据位置
  map;
  //大小
  size;
  constructor({map, colors = {}}) {
    let colorMaps = new Array(map.length - 1);

    colors = assign(colors, colorMap);

    for (let xLen = map.length - 1; xLen >= 0; xLen--) {
      colorMaps[xLen] = new Array(map[0].length - 1);

      for (let yLen = map[0].length - 1; yLen >= 0; yLen--) {
        colorMaps[xLen][yLen] = colors[map[xLen][yLen]];
      }
    }
    this.size = {
      x: colorMaps[0].length,
      y: colorMaps.length
    };
    this.map = colorMaps;
  }
}
