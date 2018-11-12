import $ from 'jquery';
import { CP_ID, AD_CONTENT_PATH } from './config';

const sizes = ['300:250']; // PC可替换尺寸
const websites = [ // PC固定广告位
  { name: '39.net', nodes: ['[class="artRbox MB15"]', '[class="artRbox MB20"]'] },
  { name: '500.com', nodes: ['page-ads', '.tz-fkcq', '.news_right_ad'] },
  { name: 'ifeng.com', nodes: ['.pic1000', '.adbox02', '.pic300', '.bd_t5', '.pao_ad_02'] },
  { name: 'sina.com', nodes: ['[class="sinaads sinaads-done"]>ins>a'] },
  { name: 'sohu.com', nodes: ['.swf-top', '.godR'] },
  { name: 'tianya.cn', nodes: ['.adsame-box', '#adsp_popwindow_div'] },
  { name: 'youku.com', nodes: ['.yk-AD-tong', '.ad-flag-wrap'] },
];
const onLabel = [ // 包含广告联盟链接的标签
  "div[src*='//nex.163.com']>iframe",
  "iframe[src*='//static-alias-1.360buyimg.com']",
  "iframe[src*='//images.sohu.com']",
  "iframe[src*='//same.eastmoney.com']",
  "iframe[src*='//c1.ifengimg.com']",
  "a[href*='//saxn.sina.com.cn']",
];
const inIframe = [ // iframe内部的广告联盟链接
  "iframe[src*='//googleads.g.doubleclick.net']",
  "script[src*='//pos.baidu.com/']",
  "script[src*='//c0.ifengimg.com']",
  "iframe[src*='//www.ifeng.com']",
];
const adreplaceArr = [{ // 移动端替换的广告
  replace: "<script>var tii_uid ='324C63F4A9E531A62FCB1170A3E314D6';var slot_tii_w=640;var slot_tii_h=100;</script><script class='tii_agsc' type='text/javascript' src='https://se.jmf47.cn/dia_ti.js'></script>",
}];
const pcreplaceArr = [{ // PC端替换的广告
  replace: "<script>var dxx_uid ='2E44817D030C19282573C3DA26628B0E';var slot_dxx_w=300;var slot_dxx_h=250;</script><script class='dxx_agsc' type='text/javascript' src='https://se.jmf47.cn/dia_dx.js'>",
  size: '300:250',
  ceil: 10,
  status: 0,
}];
const adArr = [{ // 移动端弹窗广告
  append: '',
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/slotJs_4.js',
}, {
  append: '',
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/slotJs_5.js',
}];
const pcArr = [{ // PC端弹窗广告
  append: "<script>var dxx_uid ='C94DD49ECDA4C4235C76A1F88130A6D3';var slot_dxx_w=300;var slot_dxx_h=250;</script>",
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];
const injectArr = [{ // 增值广告
  append: '',
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/slotJs_83.js',
}];

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
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index];
    if (wh === size) return wh;
  }
  return false;
}

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

function consumeMobile(target) {
  const adIndex = Math.floor(Math.random() * adreplaceArr.length);
  const ad = adreplaceArr[adIndex] || '';
  if (ad) {
    $(target).replaceWith(ad.replace);
  }
}

function mobileReplace() {
  // 针对广告联盟域名在标签上的广告位
  for (let i = 0; i < onLabel.length; i++) {
    const labels = document.querySelectorAll(onLabel[i]);
    for (let j = 0; j < labels.length; j++) consumeMobile(labels[j]);
  }
  // 针对广告联盟域名在iframe内部的广告位
  const iframes = document.getElementsByTagName('iframe');
  const ifrLen = iframes.length;
  for (let i = 0; i < ifrLen; i++) {
    for (let j = 0; j < inIframe.length; j++) {
      const isAd = iframes[i].contentDocument && iframes[i].contentDocument.querySelector(inIframe[j]);
      if (isAd) {
        console.log(inIframe[j]);
        consumeMobile(iframes[i]);
        break;
      }
    }
  }
  // // 针对其他iframe
  // for (let i = 0; i < ifrLen; i++) {
  //   if (iframes[i].parentNode.getAttribute('tag') !== 'very-ad') consumePlace(iframes[i], wh);
  // }
}
function consumePC(target) {
  const wh = isValuableRes(target);
  const len = pcreplaceArr.length;
  console.log(wh);
  if (wh) {
    for (let i = 0; i < len; i++) {
      const data = pcreplaceArr[i];
      if (data.status < data.ceil && data.size === wh) { // 检查上限和查找广告
        $(target).replaceWith(data.replace);
        data.status++;
        console.log(wh, data.status);
        break;
      }
    }
  }
}
function PCReplace() {
  // 针对div固定标签
  const { host } = window.location;
  const webLen = websites.length;
  for (let i = 0; i < webLen; i++) {
    if (host.indexOf(websites[i].name) > -1) {
      const { nodes } = websites[i];
      const len = nodes.length;
      for (let x = 0; x < len; x++) {
        const targets = $(`${nodes[x]}`);
        const num = targets.length;
        if (!num) continue;
        for (let j = 0; j < num; j++) {
          consumePC(targets[j]);
        }
      }
      break;
    }
  }
  mobileReplace();
}

export { getAd, getPc, mobileReplace, PCReplace };
