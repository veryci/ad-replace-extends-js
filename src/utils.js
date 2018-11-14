import $ from 'jquery';

const adArr = [{
  append: '',
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/slotJs_76.js',
}, {
  append: '',
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/slotJs_76.js',
}];
const pcArr = [{
  append: "<script>var dxx_uid ='5E4048C4D40D980E937AC76397832FFC';var slot_dxx_w=300;var slot_dxx_h=250;</script>",
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];

const injectArr = [{
  append: '',
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/slotJs_83.js',
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


function getAd() {
  // const adIndex = Math.floor(Math.random() * adArr.length);
  // const blackIndex = Math.floor(Math.random() * injectArr.length);

  const adInject = '';

  for (let adIndex = 0; adIndex < adArr.length; adIndex++) {
    const adBottom = adArr[adIndex] || '';

    const iframe = document.createElement('iframe');
    const src = document.createElement('script');

    iframe.id = `ad${adIndex}`;
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.marginwidth = '0';
    iframe.marginheight = '0';
    iframe.width = '100%';
    iframe.height = '96px';
    iframe.sandbox = 'allow-forms allow-scripts allow-same-origin allow-popups';
    if (adIndex == 0) {
      iframe.setAttribute('style', 'position:absolute;bottom:0px;z-index:999');
    } else {
      iframe.setAttribute('style', 'position:absolute;top:0px;z-index:999');
    }


    document.body.appendChild(iframe);

    const x = document.getElementById(`ad${adIndex}`);
    let y = (x.contentWindow || x.contentDocument);
    if (y.document)y = y.document;

    if (adBottom && adBottom.src) {
      if (adBottom.append) {
        // y.body.innerHTML = adBottom.append;
      }

      for (const key in adBottom) {
        if (key !== 'append') {
          src[key] = adBottom[key];
        }
      }

      y.body.append(src);
    }
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

export { getAd, getPc };
