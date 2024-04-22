import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

export const navigationTracking = (value) =>
  gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
    action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_MAIN_BANNER,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_MAIN_BANNER.NAVIGATION + value,
    value: 1
  });

export const onClickTracking = (value) =>
  gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
    action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_MAIN_BANNER,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_MAIN_BANNER.ON_CLICK + value,
    value: 1
  });
