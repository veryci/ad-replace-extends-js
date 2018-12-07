import { AD_FIXED640, AD_FIXED300, AD_0X0 } from "./config";

const adArr = [{
  append: AD_FIXED640,
  className: 'dxx_agsc',
  src: 'https://vsx.vsx3e.cn/dia_dx.js',
}];
const pcArr = [{
  append: AD_FIXED300,
  className: 'dxx_agsc',
  src: 'https://vsx.vsx3e.cn/dia_dx.js',
}];

function getAd(arr, num) {
  const adIndex = Math.floor(Math.random() * (arr.length - 1));
  const adBottom = arr[adIndex] || '';

  const scr1 = document.createElement('script');
  const scr2 = document.createElement('script');

  scr1.innerHTML = adBottom.append;
  scr2.className = adBottom.className;
  scr2.src = adBottom.src;
  document.body.appendChild(scr1);
  document.body.appendChild(scr2);
  // 唤醒广告位
  if (num === 1) {
    const scr = document.createElement('script');
    scr.src = AD_0X0;
    document.body.appendChild(scr);
  }
}

function mobileExtend() {
  getAd(adArr, 1);
}

function PCExtend() {
  getAd(pcArr, 0);
}

export { mobileExtend, PCExtend };
