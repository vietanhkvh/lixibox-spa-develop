import * as ReactGA from 'react-ga';
import { matchPath } from 'react-router-dom';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import * as ROUTINGS from '../../../routings/path';
import { SIGN_IN_STATE } from '../../../constants/application/global';
import { trackableEnvironments } from '../../../constants/application/tracking';
import { PROMO_POPUP_ROUTE_BLACKLIST } from '../../../constants/application/path';
import { SIGN_IN_MODAL_DISPLAY_DELAY_MS } from '../../../constants/application/event';
import { isMobileVersion } from '../../../utils/responsive';
import { getUrlParameter } from '../../../utils/format';
import { auth } from '../../../utils/auth';
import { setReferrer } from 'utils/navigate';
import { PRIVATE_MODE_URL, IGNORE_DETECT_PRIVATE_MODE_URL } from '../../../constants/application/private-mode';
import { EXPS } from '../../../tracking/ab-testing';
import { storageKey } from 'constants/application/client-storage';

declare global {
  interface Window {
    DEVICE_VERSION: string;
    dataLayer: any;
    apiDetect: any;
  }
}

/**
 * Handle when any routing start load
 *
 * 1. fetch brand list
 * 2. fetch menu list (browser node)
 * 3. fetch theme list
 * 4. scroll to top
 * 5. close cart sumary
 * 6. close modal popup
 */
export const init = ({
  history,
  authStore,
  closeModalAction,
  getCartAction,
  clolseMobileSigninAlert,
  showHideInfoMobileMenuAction,
  showHideSpecialDealMenuAction,
  fetchSpecialDealList,
  showSignInModal,
  setIsShowCartSummary,
  location,
  checkBirthdayAction,
  fetchConstantsAction,
  fetchUserBoxesToFeedbackAction,
  updateUrlParamsAction,
  getUtmIdFromAffiliateTrackingAction,
  updatePrivateMode,
  fetchNotificationListAction,
  fetchStoresAction,
  updateABTestingModeAction,
  showHideCartSumaryLayoutAction
}) => {
  initListenChangeRouting({ history });

  setTimeout(() => {
    const isOnAllowedRoute = !PROMO_POPUP_ROUTE_BLACKLIST.find((route) =>
      matchPath(window.location.pathname, { path: route, exact: false })
    );
    if (!auth.loggedIn() && isOnAllowedRoute) {
      setReferrer();
      showSignInModal();
    }
  }, SIGN_IN_MODAL_DISPLAY_DELAY_MS);

  showHideCartSumaryLayoutAction?.(false);
  closeModalAction();
  clolseMobileSigninAlert();
  showHideInfoMobileMenuAction(false);
  showHideSpecialDealMenuAction(false);
  // fetchListMenuAction();
  initBugTracking();

  // Check show birthday modal
  const showedBirthday = localStorage.getItem(storageKey.HAS_SHOW_BIRTHDAY_MODAL) || '';
  setTimeout(() => {
    SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus && showedBirthday !== 'success' && checkBirthdayAction();
  }, 30000);

  setTimeout(() => {
    SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus && fetchUserBoxesToFeedbackAction({ page: 1, perPage: 30 });
  }, 5000);

  setTimeout(getCartAction, 2000);
  setTimeout(setIsShowCartSummary, 3000);

  fetchConstantsAction();

  initCalculateMobileWindowSize();

  initGlobalParams({ updateUrlParamsAction, getUtmIdFromAffiliateTrackingAction });

  detectPrivateMode({ updatePrivateMode });

  SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus &&
    isMobileVersion() &&
    fetchNotificationListAction({ page: 1, perPage: 10 });
  setTimeout(fetchStoresAction, 5000);

  try {
    window.gtag('event', 'optimize.callback', {
      name: EXPS.SELECT_PRODUCT_VARIANTS.EXP_ID,
      callback: () => {
        const variant = window?.google_optimize && window.google_optimize?.get(EXPS.SELECT_PRODUCT_VARIANTS.EXP_ID);
        updateABTestingModeAction({ selectProductVariants: variant });
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const detectPrivateMode = ({ updatePrivateMode }) => {
  const { pathname } = window.location;

  if (IGNORE_DETECT_PRIVATE_MODE_URL.indexOf(pathname) >= 0) return;

  const isPrivateMode = PRIVATE_MODE_URL.indexOf(pathname) >= 0;
  updatePrivateMode({ isPrivateMode, privateModeLink: pathname });
};

const initGlobalParams = ({ updateUrlParamsAction, getUtmIdFromAffiliateTrackingAction }) => {
  const mobileappWebview =
    getUrlParameter(window.location.search, 'mobileapp-webview') || getUrlParameter(window.location.search, 'webview');
  updateUrlParamsAction({ mobileappWebview });

  const utmSource = getUrlParameter(window.location.search, 'utm_source') || '';

  const sskey = getUrlParameter(window.location.search, 'sskey') || '';
  !!sskey && !!sskey.length && getUtmIdFromAffiliateTrackingAction(sskey, utmSource);

  const trafficId = getUrlParameter(window.location.search, 'traffic_id') || '';
  !!trafficId && !!trafficId.length && getUtmIdFromAffiliateTrackingAction(trafficId, utmSource);
};

const setFBPluginInitialVisibility = () => {
  if (window?.FB?.CustomerChat) {
    window.FB.Event.subscribe('customerchat.load', () => showHideFbCustomerChat());
    clearTimeout((window as any).pluginInitializerTimeout);
    return;
  }

  (window as any).pluginInitializerTimeout = setTimeout(() => {
    setFBPluginInitialVisibility();
  }, 100);
};

const initListenChangeRouting = ({ history }) => {
  supportMobleSafeArea();
  detectDuplicateApi();

  setFBPluginInitialVisibility();

  history.listen(() => {
    detectDuplicateApi();
    supportMobleSafeArea();
    showHideFbCustomerChat();
  });
};

const detectDuplicateApi = () => {
  checkDetectDuplicateApi();
  resetDetectDuplicateApi();
};

const showHideFbCustomerChat = () => {
  if (!window.FB?.CustomerChat) return;
  checkDisplayFbCustomerChat() ? window.FB.CustomerChat.show(false) : window.FB.CustomerChat.hide();
};

const checkDisplayFbCustomerChat = () => {
  const pathName = window.location.pathname;

  /* Check in white list: static routing link */
  const staticRoutingWhiteList = [
    ROUTINGS.ROUTING_SHOP_INDEX,
    ROUTINGS.ROUTING_MAGAZINE,
    ROUTINGS.ROUTING_COMMUNITY_PATH,
    ROUTINGS.ROUTING_COMMUNITY_UNBOXING_PATH,
    ROUTINGS.ROUTING_COMMUNITY_BEST_DEALS_PATH
  ];

  if (staticRoutingWhiteList.indexOf(pathName) >= 0) return true;

  /* Check in dynamic routing link */
  const dynamicRoutingWhiteList = [
    ROUTINGS.ROUTING_SEARCH_PATH,
    ROUTINGS.ROUTING_PRODUCT_CATEGORY_PATH,
    ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH,
    ROUTINGS.ROUTING_THEME_DETAIL_PATH,
    ROUTINGS.ROUTING_MAGAZINE,
    ROUTINGS.ROUTING_COMMUNITY_PATH,
    ROUTINGS.ROUTING_BRAND_DETAIL_PATH,
    ROUTINGS.ROUTING_INFO,
    ROUTINGS.ROUTING_PRODUCT_MANUAL,
    ROUTINGS.ROUTING_LIXI_COIN,
    ROUTINGS.ROUTING_SUPPORT_CENTER_PATH
  ];

  return dynamicRoutingWhiteList.find((route) => 0 === route.indexOf(pathName));
};

const checkDetectDuplicateApi = () => {
  try {
    if (!window.apiDetect || !window.apiDetect.url) return;
    const list = Object.keys(window.apiDetect.url);
    if (!list || !list.length) return;

    list.forEach((path) => {
      const count = window.apiDetect.url[path] * 1;

      if (count > 1) {
        gaEventTracking({
          category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
          action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DETECT_DUPLICATE_API,
          label: `${GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DETECT_DUPLICATE_API} : ${window.apiDetect.href} - ${path}`,
          value: count
        });
      }
    });
  } catch (e) {}
};

const resetDetectDuplicateApi = () => {
  window.apiDetect = {
    href: window.location.href,
    url: {}
  };
};

const supportMobleSafeArea = () => {
  if (!isMobileVersion()) return;

  const html = document.getElementsByTagName('html');
  html && html[0] && html[0].classList[!!checkRouting() ? 'add' : 'remove']('body-safe-area');
};

const checkRouting = () => {
  const { pathname } = window.location;

  if ('/' === pathname) return true;
  if (0 === pathname.indexOf('/shop/')) return true;
  if (0 === pathname.indexOf('/community')) return true;
  if (0 === pathname.indexOf('/magazine')) return true;
  if (0 === pathname.indexOf('/user')) return true;
  if (0 === pathname.indexOf('/mobile-promotion')) return true;
  if (0 === pathname.indexOf('/community/feedback/create')) return true;
  if (0 === pathname.indexOf('/community/')) {
    const splitName = pathname.split('/community/');
    if (2 === splitName.length && parseInt(splitName[1]) > 0) return true;
  }
  if (0 === pathname.indexOf('/halio/')) return true;

  return false;
};

const initCalculateMobileWindowSize = () => {
  calcWindowHiehgt();
  window.addEventListener('resize', calcWindowHiehgt);
};

const calcWindowHiehgt = () => {
  document.body?.style?.setProperty('--wh', window.innerHeight.toString() + 'px');
};

/**
 * Fecth list liked, when
 * - App Container will mount
 * - After login successful
 *
 * @param {any} authStore
 * @param {func} fetchListLikedBoxIdAction
 */
export const fetchListLiked = ({ authStore, fetchListLikedBoxIdAction }) => {
  setTimeout(() => {
    SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus && fetchListLikedBoxIdAction();
  }, 2000);
};

export const initTracking = ({
  history,
  changeRoutingAction,
  clearDataSearchAction,
  onTrackerLoadComplete
}: {
  history: any;
  changeRoutingAction: any;
  clearDataSearchAction: any;
  onTrackerLoadComplete?: any;
}) => {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j: any = d.createElement(s),
      dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    !!f.parentNode && f.parentNode.insertBefore(j, f);
    j.onload = () => {
      if (trackableEnvironments.includes(process.env.REACT_APP_ENV)) {
        window.dataLayer = window.dataLayer || [];

        const trackingPageView = () => {
          changeRoutingAction({ routing: history.location.pathname });
        };

        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, { debug: false });
        ReactGA.plugin.require('ec', { debug: false });

        trackingPageView();
        history.listen(trackingPageView);

        onTrackerLoadComplete?.();
      }
    };
  })(window, document, 'script', 'dataLayer', process.env.REACT_APP_GTM_ID);
};

function initBugTracking() {
  if (document.domain !== 'www.lixibox.com') {
    return;
  }
}
