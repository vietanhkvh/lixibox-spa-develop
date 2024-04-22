import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION
} from 'tracking/google-analytic/type';
import { gaEventTracking } from 'tracking/google-analytic/ga-event-tracking';

const generalTrackingProps = {
  category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
  action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE,
  value: 1
};

export const tracking = {
  viewPage: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.VIEW_PAGE),

  clickOn: {
    infoBenefit: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_INFO_BENEFIT),
    infoExpirationDate: () =>
      gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_INFO_EXPIRATION_DATE),
    infoHistory: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_INFO_HISTORY),
    infoCoinSaving: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_INFO_COIN_SAVING),
    infoRedeem: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_INFO_REDEEM),
    infoUpLevel: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_INFO_UP_LEVEL),
    ///

    coinSavingShop: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_COIN_SAVING_SHOP),
    coinSavingUnboxing: () =>
      gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_COIN_SAVING_UNBOXING),
    coinSavingRating: () =>
      gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_COIN_SAVING_RATING),
    coinSavingInvite: () =>
      gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_COIN_SAVING_INVITE),
    faq: () => gaTracking(GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.LIXICOINS_PAGE.CLICK_FAQ)
  }
};

const gaTracking = (label) => {
  const trackingProps = {
    ...generalTrackingProps,
    label
  };

  gaEventTracking(trackingProps);
};
