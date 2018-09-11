import $ from 'jquery';
import { CP_ID, AD_CONTENT_PATH } from './config';
import { randomId, guid } from './utils';

function insertDiv(uuid, location) {
  const divRandomId = `div7k7k${randomId()}`;
  const div = document.createElement('div');
  div.setAttribute('id', divRandomId);
  div.setAttribute('style', 'overflow:hidden;');
  $.ajax({
    url: AD_CONTENT_PATH,
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      format: 'json',
      pageId: `${guid()}`,
      uuid,
      cpId: CP_ID,
      divW: 640,
      divH: 350,
      device: window.device6xw4qsx || '',
      adWay: 'extends',
      title: document.title || '',
      keywords: $('meta[name=keywords]').attr('content') || '',
    },
    success: (resp) => {
      if (resp.html) {
        $(div).insertBefore(location);
        $(div).html(resp.html);
      }
    },
  });
}

function toutiao(uuid) {
  if (window.top !== window) return;
  const websiteReg = /open.toutiao.com/;
  const { host } = window.location;
  if (!websiteReg.test(host)) return;
  const locationDiv = $('.icon_ad');
  const len = locationDiv.length;
  for (let index = 0; index < len; index += 1) {
    const el = locationDiv[index];
    const elP = el.parentNode;
    insertDiv(uuid, elP);
  }
}

export default toutiao;
