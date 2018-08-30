const $ = (<any>window).Zepto;

const isMobile: boolean = (function () {
  const mobileAgent = [
    'phone', 'pad', 'pod', 'iPhone', 'iPod', 'ios', 'iPad',
    'Android', 'Mobile', 'BlackBerry', 'IEMobile', 'MQQBrowser', 'JUC',
    'Fennec', 'wOSBrowser', 'BrowserNG', 'WebOS', 'Symbian', 'Windows Phone'
  ];

  return !!mobileAgent.filter(item => navigator.userAgent.indexOf(item) > -1).length
}());

const toast = (text: string, {
  callback = null,
  time = 3000
} = {}) => {
  const $toast = $('.toast');

  $toast.text(text).css('marginLeft', -$toast.width() / 2).show();

  time && setTimeout(() => {
    $toast.hide();
    callback && callback()
  }, time)
};

const cookie = (name: string, value?: any) => {
  if (value === undefined) {
    const cookieArr = document.cookie.split('; ');

    for (let i = 0; i < cookieArr.length; i++) {
      const index = cookieArr[i].indexOf(encodeURIComponent(name) + "=");

      if (index > -1) {

        return encodeURIComponent(cookieArr[i].substr(index));
      }
    }

    return '';
  }
  else {
    const contentText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    const pathText = ';path=/';

    document.cookie = `${contentText}${pathText}`;
  }
};

//requestAnimationFrame
let requestAnimationFrame = window['requestAnimationFrame'] ||
  window['webkitRequestAnimationFrame'] ||
  window['mozRequestAnimationFrame'];
let cancelAnimationFrame = window['cancelAnimationFrame'] ||
  window['webkitCancelAnimationFrame'] ||
  window['mozCancelAnimationFrame'] ||
  window['webkitCancelRequestAnimationFrame'] ||
  window['mozCancelRequestAnimationFrame'];

if (!requestAnimationFrame) {
  let lastTime = 0;

  requestAnimationFrame = callback => {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));

    lastTime = currTime + timeToCall;

    return window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
  };
  cancelAnimationFrame = id => clearTimeout(id);
}

export {$, isMobile, toast, cookie, requestAnimationFrame, cancelAnimationFrame}
