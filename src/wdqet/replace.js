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

const pcreplaceArr = [{ // PC端替换的广告
  src: 'https://vsx.vsx3e.cn/dia_ti_ne.js?slid=5F95E31689D77F5A7DF6BB005AC96C68&w=300&h=250',
  size: '300:250',
  ceil: 100,
  status: 0,
}];
const adreplaceArr = [{ // 移动端替换的广告
  src: 'https://vsx.vsx3e.cn/dia_ti_ne.js?slid=13EF6B319DB85165347CE51AFC1DE636&w=640&h=100',
  ratio: 100 / 640,
  ceil: 1,
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
  const h = parseInt(getComputedStyle(item).height, 10);
  const w = parseInt(getComputedStyle(item).width, 10);
  const wh = `${changeWH(w)}:${changeWH(h)}`;
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index];
    if (wh === size) return wh;
  }
  return false;
}

function wrapIframe(target, obj, width, height) {
  const iframe = document.createElement('iframe');
  const scr = document.createElement('script');
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  iframe.marginwidth = '0';
  iframe.marginheight = '0';
  iframe.setAttribute('adtype', 'ifrvb');
  iframe.style = `height:${parseInt(height, 10) < 100 ? '84px' : height};width:${width}`;
  iframe.sandbox = 'allow-forms allow-scripts allow-same-origin allow-popups';
  scr.src = obj.src;

  target.parentNode.replaceChild(iframe, target);
  const { body } = iframe.contentDocument;
  body.appendChild(scr);
}

function consumeMobile(target) {
  if (getComputedStyle(target) && getComputedStyle(target).display === 'none') return;
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
  for (let i = 0; i < onLabel.length; i++) {
    const labels = document.querySelectorAll(onLabel[i]);
    for (let j = 0; j < labels.length; j++) consumeMobile(labels[j]);
  }
  // 针对广告联盟域名在iframe内部的广告位
  const iframes = document.querySelectorAll('iframe');
  const ifrLen = iframes.length;
  console.log(iframes)
  for (let i = 0; i < ifrLen; i++) {
    if (iframes[i].getAttribute('adtype') === 'ifrvb') continue;
    console.log(iframes, getComputedStyle(iframes[i]).display)
    consumeMobile(iframes[i]);
    for (let j = 0; j < inIframe.length; j++) {
      if (iframes[i].getAttribute('adtype') === 'ifrvb') break;
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
        const targets = document.querySelectorAll(nodes[x]);
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
