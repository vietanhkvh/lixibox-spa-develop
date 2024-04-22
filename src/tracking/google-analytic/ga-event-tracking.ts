import * as ReactGA from 'react-ga';
import { isSafeFunction } from '../../utils/check-safe-data';
import { trackableEnvironments } from '../../constants/application/tracking';

export const gaEventTracking = ({ category, action, label = '', value = 0, nonInteraction = false }) => {
  /** Just call GA on production */
  if (trackableEnvironments.includes(process.env.REACT_APP_ENV)) {
    isSafeFunction(ReactGA, ['event']) &&
      ReactGA.event({
        category: category.toString(),
        action: action.toString(),
        label: label.toString(),
        value: value * 1,
        nonInteraction
      });
  }

  /** Log error in console when withour production */
  if (process.env.REACT_APP_ENV !== 'production') {
    console.warn('GA WITHOUT PRODUCTION', {
      category,
      action,
      label,
      value,
      nonInteraction
    });
  }
};
