import $ from 'jquery';
import { CP_ID, AD_CONTENT_PATH } from './config';
import { randomId, guid } from './utils';

const websites = [
  { name: '163.com', data: [{ node: '.gg300', divH: 400 }, { node: '.post_body', divH: 128, style: 'margin-bottom:20px;margin-top:20px;' }] },
  { name: '39.net', data: [{ node: '#art_right', divH: 400, style: 'margin-bottom:10px;' }, { node: '.art_info', divH: 128, style: 'margin-top: 15px;' }] },
  { name: '4399.com', data: [{ node: '#cnxhdiv', divH: 128 }, { node: '.fr-box', divH: 250 }] },
  { name: '500.com', data: [{ node: '.mar_b', divH: 400 }, { node: '.post_body', divH: 128, style: 'margin:20px auto;' }] },
  { name: '58.com', data: [{ node: '#ad18', divH: 200, style: 'margin-bottom:10px;' }] },
  { name: '7k7k.com', data: [{ node: '.webpage-game-box', divH: 128 }, { node: '#J-similar-game', divH: 400 }] },
  { name: 'eastmoney.com', data: [{ node: '.mar_b', divH: 128 }, { node: '.right-zjfw', divH: 300, style: 'margin-bottom:20px;' }] },
  { name: 'ifeng.com', data: [{ node: '.right', divH: 400 }, { node: '#js_cmtContainer', divH: 128, style: 'margin-bottom:20px;' }] },
  { name: 'iqiyi.com', data: [{ node: '#qitancommonarea', divH: 128, style: 'margin-bottom:20px;' }, { node: '#widget-tab-3', divH: 250, style: 'margin-bottom:20px;' }] },
  { name: 'jjwxc.net', data: [{ node: '#publishcomment', divH: 128, style: 'margin-bottom:20px;' }, { node: '#J-similar-game', divH: 400 }] },
  { name: 'pcauto.com', data: [{ node: '.artTit', divH: 128 }, { node: '#JserialBoxT', divH: 400 }] },
  { name: 'qq.com', data: [{ node: '.qq_comment', divH: 128, style: 'margin-left: 160px; margin-bottom: 20px;' }, { node: '.bar-con', divH: 250, style: 'margin-bottom:20px;' }] },
  { name: 'sina.com', data: [{ node: '#artibody', divH: 128, style: 'margin-bottom:20px; margin-top:20px;' }, { node: '.article-content-right', divH: 400, style: 'margin-bottom:20px;margin-top:20px;' }, { node: '#bottom_sina_comment', divH: 128, style: 'margin-bottom:20px;margin-top:20px;' }] },
  { name: 'sohu.com', data: [{ node: '#god_1', divH: 400 }, { node: '#pages-fun', divH: 400 }, { node: '#comment_area', divH: 128 }] },
  { name: 'tianya.cn', data: [{ node: '.headlines', divH: 128, style: 'margin-bottom: 20px;' }] },
  { name: 'youku.com', data: [{ node: '#module_basic_comment', divH: 128, style: 'margin-bottom: 20px;' }, { node: '#module_basic_relationright', divH: 250, style: 'margin-bottom:20px;margin-top: 20px;' }] },
  { name: 'zongheng.com', data: [{ node: '#guessbook', divH: 400 }] },
];
function insert(websit, uuid) {
  const { name, data } = websit;
  for (let i = 0; i < data.length; i += 1) {
    const { node, divH, style } = data[i];
    const divW = $(node).width();
    if (divW === 0 || divW === '' || divW === null) {
      console.log(`node "${node}" has no width`);
    }
    const divRandomId = `div${name.split('.')[0]}${randomId()}`;

    const div = document.createElement('div');
    div.setAttribute('id', divRandomId);
    div.setAttribute('style', `overflow: hidden;${style ? style : ''}`);
    $.ajax({
      url: AD_CONTENT_PATH,
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        format: 'json',
        uuid,
        cpId: CP_ID,
        divW,
        divH,
        pageId: `${guid()}`,
        device: window.device6xw4qsx || '',
        adWay: 'extends',
        title: document.title || '',
        keywords: $('meta[name=keywords]').attr('content') || '',
      },
      success: (resp) => {
        if (resp.html) {
          $(div).insertBefore($(node));
          $(div).html(resp.html);
        }
      },
    });
  }
}

function inPC(uuid) {
  const { host } = window.location;
  const len = websites.length;
  for (let i = 0; i < len; i += 1) {
    if (host.indexOf(websites[i].name) !== -1) {
      insert(websites[i], uuid);
      break;
    }
  }
}

function inMobile(uuid) {
  const div = document.createElement('div');
  const divP = document.createElement('div');
  const a = document.createElement('span');
  const ull = document.createElement('ul');
  $(a).html('x');
  divP.setAttribute('style', 'position:fixed;width:100%;max-height: 96px;min-height:80px;bottom:0;background:#fff;z-index:2147483647;');
  a.setAttribute('style', 'color:#fff;display:block;width:19px;height:19px;position:absolute;top:0;right:2px;z-index:2147483647;cursor:pointer;font-size:20px;border: 1px solid #e0e0e0;border-radius: 10px;background: #e0e0e0;text-align: center; line-height: 15px;');
  div.setAttribute('style', 'overflow:hidden;bottom:0;width:100%;z-index:2147483647;');
  $(divP).append($(a));
  $.ajax({
    url: AD_CONTENT_PATH,
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      format: 'json',
      uuid,
      cpId: CP_ID,
      divW: 640,
      divH: 96,
      n: 3,
      pageId: `${guid()}`,
      device: window.device6xw4qsx || '',
      adWay: 'extends',
      title: document.title || '',
      keywords: $('meta[name=keywords]').attr('content') || '',
    },
    success: (resp) => {
      if (resp.html) {
        $('body').append($(divP));
        $(div).html(resp.html);
        $(divP).append($(div));
        setTimeout(() => {
          if (window.mobileTopBannerShouldNotDisappear === true) return;
          $(divP).remove();
        }, 25 * 1000);
      } else if (resp.datas) {
        $(div).attr('style', 'overflow:hidden;position:absolute;bottom:0;width:100%;max-height:96px;min-height:80px;z-index:2147483647;');
        $(ull).attr('style', 'position:absolute;margin:0;padding:0; font-size:0;');
        $.each(resp.datas, (i, val) => {
          const picture = document.createElement('img');
          const href = document.createElement('a');
          const add = document.createElement('li');
          $(add).attr('style', 'float:left;list-style:none;width:100%;');
          $(href).attr('style', 'display:block;position:relative;width:100%;');
          $(picture).attr('style', 'width:100%;position:absolute;left:0;bottom:0;');
          if (val.html) {
            $(add).html(val.html);
            $(ull).append(add);
          } else {
            $(href).append($(picture));
            $(href).attr('href', val.imageHref);
            $(picture).attr('src', val.imageUrl);
            $(add).append(href);
            $(ull).append(add);
          }
          $(divP).append($(ull));
          $('body').append($(divP));
        });
        setTimeout(() => {
          if (window.mobileTopBannerShouldNotDisappear === true) return;
          $(divP).remove();
        }, 60 * 1000);
      }
      $(a).click(() => {
        $(divP).remove();
      });
    },
  });
}

export { inPC, inMobile };
