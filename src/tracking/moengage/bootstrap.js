export const initMoEngage = () => {
  // eslint disable the following function as it's a third party script
  /* eslint-disable */
  (function (i, s, o, g, r, a, m, n) {
    i.moengage_object = r;
    const t = {};
    const q = function (f) {
      return function () {
        (i.moengage_q = i.moengage_q || []).push({ f: f, a: arguments });
      };
    };
    const f = [
        'track_event',
        'add_user_attribute',
        'add_first_name',
        'add_last_name',
        'add_email',
        'add_mobile',
        'add_user_name',
        'add_gender',
        'add_birthday',
        'destroy_session',
        'add_unique_user_id',
        'moe_events',
        'call_web_push',
        'track',
        'location_type_attribute'
      ],
      h = { onsite: ['getData', 'registerCallback'] };
    for (const k in f) {
      t[f[k]] = q(f[k]);
    }
    for (const k in h)
      for (const l in h[k]) {
        null == t[k] && (t[k] = {});
        t[k][h[k][l]] = q(k + '.' + h[k][l]);
      }
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
    i.moe =
      i.moe ||
      function () {
        n = arguments[0];
        return t;
      };
    a.onload = function () {
      if (n) {
        i[r] = window.moe(n);
      }
    };
  })(window, document, 'script', 'https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js', 'Moengage');
  /* eslint-enable */

  window.Moengage = window.moe({
    app_id: process.env.REACT_APP_MOENGAGE_APP_ID,
    debug_logs: process.env.REACT_APP_ENV === 'production' ? 0 : 1
  });

  window.addEventListener('MOE_AUTOMATED_EVENTS', function (event) {
    const campaignName =
      (event?.detail?.data || []).find((attribute) => attribute?.key === 'campaign_name')?.value || '';
    const campaignId = (event?.detail?.data || []).find((attribute) => attribute?.key === 'campaign_id')?.value || '';
    window.campaignIframeId = `moe-onsite-campaign-${campaignId}`;
    const isStickyTopBanner = !!campaignName?.match(/stickytop/i);

    // Sticky Top Banner opened
    if (event?.detail?.name === 'MOE_ONSITE_MESSAGE_SHOWN' && isStickyTopBanner) {
      const bannerElement = document.getElementById(window.campaignIframeId);
      if (bannerElement) {
        const bannerHeight = bannerElement?.offsetHeight || 0;

        // FIXME: For some reason, the variable is being removed automatically from the DOM after a while of being set, when
        //        applied to the <html> element. So, we're applying it to the <body> element instead.
        // document.documentElement?.style?.setProperty('--sticky-top-banner-height', `${bannerHeight}px`);
        document.body?.style?.setProperty('--sticky-top-banner-height', `${bannerHeight}px`);
      }
    }

    // NOTE: 'MOE_ONSITE_MESSAGE_DISMISSED' and 'MOE_ONSITE_MESSAGE_AUTO_DISMISS' event can not be use here, since there's
    //       a delay between the event and the actual removal of the sticky iframe from DOM. This is not ideal for usage
    //       in our case, since there'll be an empty space at the top of the page for some time, resulting in a bad UX.
  });

  if (MutationObserver) {
    try {
      // Observes when sticky iframe is removed from DOM
      const stickyTopBannerObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
            const removedNode = mutation.removedNodes[0];
            if (removedNode?.id === window.campaignIframeId) {
              // Sticky Top Banner closed
              document.documentElement?.style?.setProperty('--sticky-top-banner-height', `0px`);
            }
          }
        });
      });

      stickyTopBannerObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch (e) {}
  }
};
