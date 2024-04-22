import { ReportCallback } from 'web-vitals';
import { gaEventTracking } from 'tracking/google-analytic/ga-event-tracking';
import { GA_TRACKING_EVENT_CATEGORY } from 'tracking/google-analytic/type';

// Info: https://bit.ly/CRA-vitals
export const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export function sendWebVitalsToGoogleAnalytics({ name, delta, id }) {
  gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.WEB_VITALS,
    action: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    label: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true
  });
}
