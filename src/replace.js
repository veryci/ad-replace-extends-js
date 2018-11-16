import $ from 'jquery';

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
  append: "var tii_uid ='2E44817D030C19282573C3DA26628B0E';var slot_tii_w=300;var slot_tii_h=250;",
  className: 'tii_agsc',
  src: 'https://se.jmf47.cn/dia_ti.js',
  ratio: 250 / 300,
}];
const pcreplaceArr = [{ // PC端替换的广告
  append: "var tii_uid ='2E44817D030C19282573C3DA26628B0E';var slot_tii_w=300;var slot_tii_h=250;",
  className: 'tii_agsc',
  src: 'https://se.jmf47.cn/dia_ti.js',
  size: '300:250',
  ceil: 100,
  status: 0,
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

function wrapIframe(target, obj, width, height) {
  const iframe = document.createElement('iframe');
  const scr1 = document.createElement('script');
  const scr2 = document.createElement('script');
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  iframe.marginwidth = '0';
  iframe.marginheight = '0';
  iframe.width = width;
  iframe.height = height;
  iframe.sandbox = 'allow-forms allow-scripts allow-same-origin allow-popups';
  scr1.innerHTML = obj.append;
  scr2.className = obj.className;
  scr2.src = obj.src;

  $(target).replaceWith($(iframe));
  const { body } = iframe.contentDocument;
  body.appendChild(scr1);
  body.appendChild(scr2);
}

function consumeMobile(target) {
  const adIndex = Math.floor(Math.random() * adreplaceArr.length);
  const ad = adreplaceArr[adIndex] || '';
  if (ad) {
    const p = target.offsetParent;
    const h = $(document).width() * ad.ratio;
    $(p).height(h);
    wrapIframe(target, ad, '100%', `${h}px`);
    console.log(h);
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
  for (let i = 0; i < onLabel.length; i++) {
    const labels = document.querySelectorAll(onLabel[i]);
    for (let j = 0; j < labels.length; j++) consumeMobile(labels[j]);
  }
  // 针对广告联盟域名在iframe内部的广告位
  const iframes = document.querySelectorAll('iframe');
  const ifrLen = iframes.length;
  for (let i = 0; i < ifrLen; i++) {
    for (let j = 0; j < inIframe.length; j++) {
      const isAd = iframes[i].contentDocument && iframes[i].contentDocument.querySelector(inIframe[j]);
      if (isAd) {
        consumeMobile(iframes[i]);
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
  // 针对iframe
  const iframes = document.querySelectorAll('iframe');
  const ifrLen = iframes.length;
  for (let i = 0; i < ifrLen; i++) consumePC(iframes[i]);
}

export { mobileReplace, PCReplace };
