import * as ReactGA from 'react-ga';
import { matchPath } from 'react-router-dom';

import { formatErrorMessage } from '../utils/exception';

import { CHANGE_ROUTING } from '../constants/api/tracking';
import { trackableEnvironments, deferredPageviewRoutes } from '../constants/application/tracking';
import { ACTION_TYPE, PROMISE_ACTION_TYPE } from '../constants/api/action.config';

const trackingMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (!trackableEnvironments.includes(process.env.REACT_APP_ENV)) {
      return next(action);
    }
    try {
      let GATrackingData: any = null;

      switch (action.type) {
        case CHANGE_ROUTING:
          /** ROUTING TRACKING // PAGA VIEW */
          GATrackingData = {
            category: ACTION_TYPE.ROUTING_ACTION,
            action: `${ACTION_TYPE.ROUTING_ACTION}/${action.payload.routing}`,
            label: ''
          };
      }

      if (action.type && action.type.indexOf(ACTION_TYPE.API_ACTION) === 0) {
        if (action.type.indexOf(PROMISE_ACTION_TYPE.FULFILLED) >= 0) {
          /** FULFILLED API TRACKING */
          GATrackingData = {
            category: ACTION_TYPE.API_ACTION,
            action: action.type,
            label: ''
          };
        }

        if (action.type.indexOf(PROMISE_ACTION_TYPE.REJECTED) >= 0) {
          /** REJECTED API TRACKING */
          GATrackingData = {
            category: ACTION_TYPE.API_ACTION,
            action: action.type,
            label: formatErrorMessage(action.payload.error || action.payload.errors)
          };
        }
      }

      if (action.type && action.type.indexOf(ACTION_TYPE.INTERACTION_ACTION) === 0) {
        /** INTERACTION ACTION TRACKING */
        GATrackingData = {
          category: ACTION_TYPE.INTERACTION_ACTION,
          action: action.type,
          label: ''
        };
      }

      if (action.type && action.type.indexOf(ACTION_TYPE.BACKGROUND_ACTION) === 0) {
        /** BACKGROUND ACTION TRACKING */
        GATrackingData = {
          category: ACTION_TYPE.BACKGROUND_ACTION,
          action: action.type,
          label: ''
        };
      }

      if (null !== GATrackingData) {
        if (GATrackingData.category === ACTION_TYPE.ROUTING_ACTION) {
          /** Tracking PAGE VIEW for Google analytic */
          const ga = ReactGA.ga();
          if (ga) {
            // NOTE: SPA virtual pageview tracking: https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications#tracking_virtual_pageviews
            ga('set', 'page', action.payload.routing || '');

            const shouldDeferPageviewTracking = deferredPageviewRoutes.find((route) =>
              matchPath(window.location.pathname, { path: route, exact: true })
            );
            shouldDeferPageviewTracking || ga('send', 'pageview');
          }
        }

        /** Tracking EVENT for Google analytic */
        // ReactGA.event(GATrackingData);
      }

      next(action);
    } catch (e) {
      next(action);
    }
  };

export default trackingMiddleware;
