import $ from 'jquery';

const adArr = [{
  append: "<script>var dxx_uid ='74837FAD4DE4DAAF73AB46BB66D819B3';var slot_dxx_w=640;var slot_dxx_h=100;</script>",
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];
const pcArr = [{
  append: "<script>var dxx_uid ='83F011A60375F67918A80FAA968D45EB';var slot_dxx_w=300;var slot_dxx_h=250;</script>",
  type: 'text/javascript',
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
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
  // 唤醒广告位
  const scr = document.createElement('script');
  scr.src = 'https://se.jmf47.cn/dia_ti_ne.js?slid=63E6DF89DE96C6C28CF2CF3F0E8EDD50&w=0&h=0';
  document.body.appendChild(scr);
}

function getPc() {
  const pcIndex = Math.floor(Math.random() * pcArr.length);
  // const blackIndex = Math.floor(Math.random() * injectArr.length);

  const adBottom = pcArr[pcIndex] || '';

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
}

export { getAd, getPc };
