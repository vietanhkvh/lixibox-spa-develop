import { formatPhoneNumberWithCountryPrefix } from '../../utils/format';

declare global {
  interface Window {
    ttq?: any;
    IS_TIKTOK_PIXEL_INIT: boolean;
  }
}

export const trackingTiktokPixel = (type, data?: any, trackingType = 'track') => {
  if (!type || !data) return;

  if (['staging', 'production'].includes(process.env.REACT_APP_ENV)) {
    let isInstallLibInterval = setInterval(() => {
      if (!!type && !!window.ttq) {
        clearInterval(isInstallLibInterval);

        if (!window.IS_TIKTOK_PIXEL_INIT) {
          let isInstallLibInterval = setInterval(() => {
            clearInterval(isInstallLibInterval);
            handleTrackingIfExist(type, data, trackingType);
          }, 500);
        } else {
          handleTrackingIfExist(type, data, trackingType);
        }
      }
    }, 100);
  }
};

const handleTrackingIfExist = (type, data?: any, trackingType = 'track') => {
  if (!type || !data) return;

  switch (trackingType) {
    case 'track':
      return window.ttq.track(type, data);
    case 'identify':
      return window.ttq.identify({
        ...data,
        external_id: type
      });
  }
};

export const initTrackingTiktokPixel = ({ id, email, phone }) => {
  if (['staging', 'production'].includes(process.env.REACT_APP_ENV)) {
    window.IS_TIKTOK_PIXEL_INIT = false;

    // eslint disable the function below because it's from Tiktok Pixel
    /* eslint-disable */
    (function (w: any, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      (ttq.methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie'
      ]),
        (ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        });
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      (ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      }),
        (ttq.load = function (e, n) {
          var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
          (ttq._i = ttq._i || {}),
            (ttq._i[e] = []),
            (ttq._i[e]._u = i),
            (ttq._t = ttq._t || {}),
            (ttq._t[e] = +new Date()),
            (ttq._o = ttq._o || {}),
            (ttq._o[e] = n || {});
          var o = document.createElement('script');
          (o.type = 'text/javascript'), (o.async = !0), (o.src = i + '?sdkid=' + e + '&lib=' + t);
          var a = document.getElementsByTagName('script')[0];
          a.parentNode.insertBefore(o, a);
        });

      ttq.load(process.env.REACT_APP_TIKTOK_PIXEL_ID);
      ttq.page();

      ttq.enableCookie();

      if (!!id && !!email) {
        trackingTiktokPixel(
          id,
          {
            email,
            phone_number: formatPhoneNumberWithCountryPrefix(phone)
          },
          'identify'
        );
      }
      window.IS_TIKTOK_PIXEL_INIT = true;
    })(window, document, 'ttq');
    /* eslint-enable */
  }
};
