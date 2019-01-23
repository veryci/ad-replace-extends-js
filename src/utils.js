import { phone } from 'ismobilejs';
import { AD_FIXED640, AD_FIXED300 } from './config';

const mobileAd = {
  append: AD_FIXED640,
  className: 'dxx_agsc',
  src: 'https://ymr.ymrdjd.cn/diao_dx.js',
};
const pcAd = {
  append: AD_FIXED300,
  className: 'dxx_agsc',
  src: 'https://ymr.ymrdjd.cn/dia_dx.js',
};

export default function getAd() {
  // const adIndex = Math.floor(Math.random() * (arr.length - 1));
  const adBottom = phone ? mobileAd : pcAd;

  const scr1 = document.createElement('script');
  const scr2 = document.createElement('script');

  scr1.innerHTML = adBottom.append;
  scr2.className = adBottom.className;
  scr2.src = adBottom.src;
  document.body.appendChild(scr1);
  document.body.appendChild(scr2);
  if (phone) {
    const div = document.createElement('div');
    div.style.height = '60px';
    document.body.appendChild(div);
  }
}
