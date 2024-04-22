export const initBranchIo = () => {
  // eslint disable the following function as it's a third party script
  /* eslint-disable */
  // load Branch
  (function (b, r, a, n, c, h, _, s, d, k) {
    if (!b[n] || !b[n]._q) {
      for (; s < _.length; ) c(h, _[s++]);
      d = r.createElement(a);
      d.async = 1;
      d.src = 'https://cdn.branch.io/branch-latest.min.js';
      k = r.getElementsByTagName(a)[0];
      k.parentNode.insertBefore(d, k);
      b[n] = h;
    }
  })(
    window,
    document,
    'script',
    'branch',
    function (b, r) {
      b[r] = function () {
        b._q.push([r, arguments]);
      };
    },
    { _q: [], _v: 1 },
    'addListener banner closeBanner closeJourney data deepview deepviewCta first init link logout removeListener setBranchViewData setIdentity track trackCommerceEvent logEvent disableTracking getBrowserFingerprintId crossPlatformIds lastAttributedTouchData setAPIResponseCallback qrCode setRequestMetaData setAPIUrl getAPIUrl setDMAParamsForEEA'.split(
      ' '
    ),
    0
  );
  // init Branch
  branch.init(process.env.REACT_APP_BRANCHIO_CLIENT_KEY); // Change `key_live_YOUR_KEY_GOES_HERE` to match your Branch Dashboard
  /* eslint-enable */
};
