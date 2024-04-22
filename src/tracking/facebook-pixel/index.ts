import { generateUniqueID } from '../../utils/random';
import { sendFacebookPixelTrackingEvent } from '../../api/tracking';
import { reportException } from '../../tracking/sentry';
import { storageKey } from '../../constants/application/client-storage';

declare global {
  interface Window {
    fbq: any;
    IS_PIXEL_INIT: boolean;
  }
}

export const trackingFacebookPixel = (type, data?: any) => {
  if (['staging', 'production'].includes(process.env.REACT_APP_ENV)) {
    let isInstallLibInterval = setInterval(() => {
      if (!!type && !!window.fbq) {
        clearInterval(isInstallLibInterval);

        if (!window.IS_PIXEL_INIT) {
          let isInstallLibInterval = setInterval(() => {
            clearInterval(isInstallLibInterval);
            handleTrackingIfExist(type, data);
          }, 500);
        } else {
          handleTrackingIfExist(type, data);
        }
      }
    }, 100);
  }
};

const handleTrackingIfExist = (type, data?: any) => {
  const uuid = localStorage.getItem(storageKey.UUID);
  const eventID = generateUniqueID();

  sendFacebookPixelTrackingEvent({ externalID: uuid, eventID, name: type, value: data })
    .then((_) => {})
    .catch((eventInfo) =>
      reportException(
        new Error(`[API] POST /web/trackings/events (Failed to send Facebook Pixel tracking event to server)`),
        { eventInfo, eventInfoDetail: eventInfo?.detail || {}, eventInfoError: eventInfo?.error || {} }
      )
    );

  if (data) {
    window.fbq('track', type, data, { eventID });
    return;
  }

  window.fbq('track', type, {}, { eventID });
};

export const initFacebook = () => {
  (function (f: any, b: any, e, v) {
    if (f.fbq) return;
    let n, t, s;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.9.18';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  if (['staging', 'production'].includes(process.env.REACT_APP_ENV)) {
    initTrackingFacebookPixel();
  }
};

export const initTrackingFacebookPixel = () => {
  window.IS_PIXEL_INIT = false;
  if (!window.fbq) {
    setTimeout(initTrackingFacebookPixel, 100);
    return;
  }

  const uuid = localStorage.getItem(storageKey.UUID);
  window.fbq && window.fbq('init', process.env.REACT_APP_FB_PIXEL_ID, { external_id: uuid });
  window.IS_PIXEL_INIT = true;
  trackingFacebookPixel('PageView');
};
