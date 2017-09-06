/**
 * 创建随机数
 * @param min {number} 最小值
 * @param max {number} 最大值
 * @param isFloat {boolean} 是否是1位浮点型
 * @returns {number}
 */
export function getRandomNum(min, max, isFloat) {
  let val = Math.random() * (max - min) + min;


  return isFloat ? val.toFixed(1) : Math.round(val);
}

/**
 * 进入全屏
 * @param element 元素
 */
export function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
