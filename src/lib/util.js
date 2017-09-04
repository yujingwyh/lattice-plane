/**
 * 创建随机数
 * @param min {number} 最小值
 * @param max {number} 最大值
 * @returns {number}
 */
export function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
