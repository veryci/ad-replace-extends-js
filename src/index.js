import { phone } from 'ismobilejs';
import { anylaseResource } from './utils';
import toutiao from './toutiao';
import { inPC, inMobile } from './inPlatform';
import { name, version } from '../package.json';

const blackWebsite = /\.edu|\.org|12306\.com|\.gov|^192\.168/;
const { host } = window.location;
let ready = false;

function extend() {
  if (window.adExtendsJS || window.top !== window || blackWebsite.test(host)) return;
  window.adExtendsJS = `${name}-${version}`;
  if (window.Fingerprint2) {
    new Fingerprint2().get((uuid) => {
      if (phone) {
        inMobile(uuid);
        toutiao(uuid);
      } else inPC(uuid);
    });
    return;
  }
  if (phone) {
    inMobile('-');
    toutiao('-');
  } else inPC('-');
}

function replace() {
  if (window.adReplaceJS || window.top !== window || blackWebsite.test(host)) return;
  window.adReplaceJS = `${name}-${version}`;
  if (window.Fingerprint2) new Fingerprint2().get(uuid => anylaseResource(uuid));
  else anylaseResource('-');
}

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
