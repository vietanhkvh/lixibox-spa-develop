import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../../tracking/google-analytic/ga-event-tracking';

export const navigationTracking = (type = 'block', value) => {
  if ('function' !== typeof gaEventTracking) return;

  const labelType = {
    block: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.PAYMENT_NEXT_STEP_NAVIGATION.CLICK_ON_BLOCK,
    button: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.PAYMENT_NEXT_STEP_NAVIGATION.CLICK_ON_NAVIGATE_BUTTON
  };

  const label = labelType[type] + ` - ${value}`;

  return gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
    action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.PAYMENT_NEXT_STEP_NAVIGATION,
    label,
    value: 1
  });
};
