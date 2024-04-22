import { matchPath } from 'react-router-dom';

import { isMobileVersion } from 'utils';
import { PROMO_POPUP_ROUTE_BLACKLIST } from 'constants/application/path';
import { ROUTING_SHOP_INDEX } from 'routings/path';
import { storageKey } from 'constants/application/client-storage';

export const getIsDisplayable = ({ location }): boolean => {
  let isOnAllowedList = true;
  if (isMobileVersion()) {
    if (location.pathname !== ROUTING_SHOP_INDEX) {
      isOnAllowedList = false;
    }
  } else {
    isOnAllowedList = !PROMO_POPUP_ROUTE_BLACKLIST.find((route) =>
      matchPath(location.pathname, { path: route, exact: false })
    );
  }
  return isOnAllowedList;
};

export const getIsWelcomeGiftPopupDisplayedToday = (): boolean => {
  const lastMaximizedAtStr = localStorage.getItem(storageKey.WELCOME_GIFT_LAST_AUTO_MAXIMIZED_AT);

  try {
    if (!lastMaximizedAtStr) {
      localStorage.setItem(storageKey.WELCOME_GIFT_LAST_AUTO_MAXIMIZED_AT, new Date().toString());
      return false;
    } else {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastMaximizedAt = new Date(lastMaximizedAtStr);
      if (lastMaximizedAt < startOfToday) {
        // not opened today
        localStorage.setItem(storageKey.WELCOME_GIFT_LAST_AUTO_MAXIMIZED_AT, new Date().toString());
        return false;
      } else {
        // opened today
        return true;
      }
    }
  } catch (e) {
    return false;
  }
};
