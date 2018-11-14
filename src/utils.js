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

// function guid() {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//   return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}-${s4()}${s4()}`;
// }


function getAd() {
  const adIndex = Math.floor(Math.random() * adArr.length);
  // const blackIndex = Math.floor(Math.random() * injectArr.length);

  const adInject = '';

  const adBottom = adArr[adIndex] || '';

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

export { getAd, getPc };
