import { gaEventTracking } from '../tracking/google-analytic/ga-event-tracking';

const gaTrackingMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (!action.gaTracking) {
      return next(action);
    }

    !!gaEventTracking && gaEventTracking(action.gaTracking);

    next(action);
  };

export default gaTrackingMiddleware;
