const adArr = [{
  append: "var dxx_uid ='B541A624F68268DE133B47DC80D25485';var slot_dxx_w=640;var slot_dxx_h=100;",
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];
const pcArr = [{
  append: "var dxx_uid ='6A3484448C7650EBE707B526EF4ED4EE';var slot_dxx_w=300;var slot_dxx_h=250;",
  className: 'dxx_agsc',
  src: 'https://se.jmf47.cn/dia_dx.js',
}];

function getAd(arr, num) {
  const adIndex = Math.floor(Math.random() * (arr.length - 1));
  const adBottom = arr[adIndex] || '';
  const scr1 = document.createElement('script');
  const scr2 = document.createElement('script');

  scr1.innerHTML = adBottom.append;
  scr2.className = adBottom.className;
  scr2.src = adBottom.src;
  document.body.appendChild(scr1);
  document.body.appendChild(scr2);
  // 唤醒广告位
  if (num === 1) {
    const scr = document.createElement('script');
    scr.src = 'https://se.jmf47.cn/dia_ti_ne.js?slid=63E6DF89DE96C6C28CF2CF3F0E8EDD50&w=0&h=0';
    document.body.appendChild(scr);
  }
}

function mobileExtend() {
  getAd(adArr, 1);
}

function PCExtend() {
  getAd(pcArr, 0);
}

export { mobileExtend, PCExtend };
