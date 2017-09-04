/**
 * 事件
 * gameInit gameStart gameRun gamePause gameRun gameStop
 */
let events = {};
//监听事件
export function on(name, fn) {
  let evt = events[name] || (events[name] = []);

  evt.push(fn);

  return this;
}
//触发事件
export function trigger(name, data) {
  let evt = events[name];

  for (let i = 0, len = evt ? evt.length : 0; i < len; i++) {
      evt[i](data);
  }
}
