/**
 * 创建随机数
 * @param min {number} 最小值
 * @param max {number} 最大值
 * @returns {number}
 */
export function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
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
