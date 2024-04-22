export const initMatomo = () => {
  // eslint disable the following function as it's a third party script
  /* eslint-disable */
  var _paq = (window._paq = window._paq || []);
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['enableLinkTracking']);
  (function () {
    var u = `//${process.env.REACT_APP_MATOMO_DOMAIN}/`;
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  })();
  /* eslint-enable */
};
