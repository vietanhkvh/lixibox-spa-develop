import { isSafari } from '../utils/responsive';

import {
  ROUTING_CHECK_OUT,
  ROUTING_CHECK_OUT_PAYMENT,
  ROUTING_CHECK_OUT_SUCCESS,
  ROUTING_AUTH_SIGN_IN,
  ROUTING_AUTH_SIGN_UP,
  ROUTING_AUTH_RESET_PASSWORD,
  ROUTING_AUTH_FORGOT_PASSWORD,
  ROUTING_MOBILE_BRAND_PATH,
  ROUTING_GAME,
  ROUTING_GAME_BEAUTY_HUNTER,
  ROUTING_GAME_BEAUTY_HUNTER_PLAY,
  ROUTING_GAME_BEAUTY_HUNTER_RESULT,
  ROUTING_AUTH_CHECKOUT_FAST_TRACK
} from '../routings/path';
import { ORDER_TYPE } from 'constants/application/order';

const WHITE_LIST_CHECK_OUT_CONTAINER = {
  DESKTOP: [ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT, ROUTING_CHECK_OUT_SUCCESS],
  MOBILE: [
    ROUTING_CHECK_OUT,
    ROUTING_CHECK_OUT_PAYMENT,
    ROUTING_CHECK_OUT_SUCCESS,
    ROUTING_AUTH_SIGN_IN,
    ROUTING_AUTH_SIGN_UP,
    ROUTING_AUTH_CHECKOUT_FAST_TRACK,
    ROUTING_AUTH_RESET_PASSWORD,
    ROUTING_AUTH_FORGOT_PASSWORD,
    ROUTING_MOBILE_BRAND_PATH
  ]
};

const BLACK_LIST_GAME_HEADER_MOBILE = [
  ROUTING_GAME,
  ROUTING_GAME_BEAUTY_HUNTER,
  ROUTING_GAME_BEAUTY_HUNTER_PLAY,
  ROUTING_GAME_BEAUTY_HUNTER_RESULT
];

/**
 * Attempts to copy the provided text to the system clipboard
 * @param text Text to copy
 * @param onSuccess Success callback
 * @param onFailure Failure callback
 */
export const copyTextToClipboard = (text: string, onSuccess = (param?: any) => {}, onFailure = (param?: any) => {}) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => onSuccess({ type: 'copy' }),
      () => onFailure({ type: 'copy' })
    );
  } else {
    alert('Rất tiếc, trình duyệt của bạn không hỗ trợ chức năng Copy');
    onFailure({ type: 'copy' });
  }
};

/**
 * Attempts to initiate a share (for mobile browsers)
 * @param link Link to share
 * @param onSuccess Success callback
 * @param onFailure Failure callback
 */
export const shareLink = (link: string, onSuccess = (param?: any) => {}, onFailure = (param?: any) => {}) => {
  if ((navigator as any).share) {
    (navigator as any)
      .share({ url: link })
      .then(() => onSuccess({ type: 'share' }))
      .catch(() => onFailure({ type: 'share' }));
  } else {
    onFailure({ type: 'share' });
  }
};

/**
 * Attempts to share a link, but if share fails, attempts to copy the link to system clipboard instead
 * @param link Link to share or copy
 */
export const shareOrCopyLink = (link: string, onSuccess = (param?: any) => {}, onFailure = (param?: any) => {}) => {
  shareLink(link, onSuccess, () => {
    copyTextToClipboard(link, onSuccess, () => onFailure({ type: 'all' }));
  });
};

export const checkBirthdayGift = (orders, storeOrders) => {
  if (orders?.length === 0 && storeOrders?.length === 0) {
    return false;
  } else {
    const _orders = orders?.filter((order) => order.status !== ORDER_TYPE.CANCELLED);
    const ordersCount = _orders?.length
      ? _orders.reduce((order, acc) => ({ count: order.count - acc.count })).count
      : 0;
    const storeCount = storeOrders?.length
      ? storeOrders.reduce((order, acc) => ({ count: order.count - acc.count })).count
      : 0;
    const total = ordersCount + storeCount;
    return total > 0 ? true : false;
  }
};

export const isShowDownloadAppBar = () => {
  const containPathList = WHITE_LIST_CHECK_OUT_CONTAINER.MOBILE.filter(
    (item) => window.location.pathname.indexOf(item) === 0
  );
  const isShowByGameContainer = BLACK_LIST_GAME_HEADER_MOBILE.indexOf(window.location.pathname) < 0;

  const isShowMobileNavigation =
    containPathList &&
    containPathList.length === 0 && // Some screen not show mobile nav: auth, checkout, brands
    isShowByGameContainer; // Not show if game

  return isShowMobileNavigation && !isSafari();
};
