const de = document.documentElement;
const doc = document;

//进入全屏
function requestFullScreen() {
  if (de.requestFullscreen) {
    de.requestFullscreen();
  }
  else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  }
  else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
}
//退出全屏
function exitFullscreen() {

  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  }
  else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  }
  else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
  }
}

export default {
  requestFullScreen,
  exitFullscreen
}
