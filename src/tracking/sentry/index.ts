import * as Sentry from '@sentry/react';
import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../tracking/google-analytic/type';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';

export const reportException = (error: Error, references?: { [key: string]: any }): void => {
  if (process.env.REACT_APP_ENV === 'development') {
    let localReport: Array<any> = ['[BUG TRACKING IN DEVELOPMENT]\n', error];
    references && localReport.push('\nReferences:\n', references);
    console.error(localReport);
  } else {
    Sentry.captureException(error, (scope) => {
      references && scope.setContext('references', references);
      return scope;
    });

    /** Just track bugs in Google Analytics for production */
    'function' === typeof gaEventTracking &&
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.EXCEPTION,
        action: GA_TRACKING_EVENT_ACTION.EXCEPTION.SENTRY,
        label: GA_TRACKING_EVENT_LABEL.EXCEPTION.SENTRY + error.message,
        value: 1,
        nonInteraction: true
      });
  }
};
