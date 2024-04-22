import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

const GENERAL_TRACKING_DATA = {
  category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
  action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.SHOP_MENU_DROPDOWN_VER_2,
  value: 1
};

const tracking = (category) =>
  'function' === typeof gaEventTracking &&
  gaEventTracking({
    ...GENERAL_TRACKING_DATA,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SHOP_MENU_DROPDOWN_VER_2.CLICK_ITEM + category
  });

export default tracking;
