import { AD_FIXED640, AD_FIXED300 } from './config';

const adArr = [{
  append: AD_FIXED640,
  className: 'dxx_agsc',
  src: 'https://10x.10xt9.cn/diao_dx.js',
}];
const pcArr = [{
  append: AD_FIXED300,
  className: 'dxx_agsc',
  src: 'https://10x.10xt9.cn/dia_dx.js',
}];

function getAd(arr) {
  const adIndex = Math.floor(Math.random() * (arr.length - 1));
  const adBottom = arr[adIndex] || '';

  const scr1 = document.createElement('script');
  const scr2 = document.createElement('script');

  scr1.innerHTML = adBottom.append;
  scr2.className = adBottom.className;
  scr2.src = adBottom.src;
  document.body.appendChild(scr1);
  document.body.appendChild(scr2);
}

function mobileExtend() {
  getAd(adArr);
}

function PCExtend() {
  getAd(pcArr);
}

export { mobileExtend, PCExtend };
