import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../flows/action.config';
import { cleanupSessionAction } from '../flows/auth/action';
import { storageKey } from '../constants/application/client-storage';
import { GA_TRACKING_EVENT_CATEGORY, GA_TRACKING_EVENT_ACTION } from '../tracking/google-analytic/type';
import { gaEventTracking } from '../tracking/google-analytic/ga-event-tracking';
import { reportException } from '../tracking/sentry';
import { isPromise } from '../utils/validate';
import { ALERT_GENERAL_ERROR } from '../constants/application/alert';
import { openAlertAction } from '../flows/alert/action';
import { setMaintenanceMode } from 'flows/maintenance/action';

export default function promiseMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    const { type, payload = {}, meta = {}, group = '' } = action;
    const { promise } = payload;

    const PENDING = PENDING_TYPE(type);
    const FULFILLED = FULFILLED_TYPE(type);
    const REJECTED = REJECTED_TYPE(type);

    /**
     * Dispatch the pending action
     */
    dispatch({
      type: PENDING,
      payload: {},
      meta,
      group
    });

    let syncActivityFinished = false;
    let actionQueue = [];

    const flushQueue = () => {
      actionQueue.forEach((a) => dispatch(a)); // flush queue
      actionQueue = [];
    };

    const asyncDispatch = (asyncAction) => {
      const asyncActionArray: any = [asyncAction];
      actionQueue = actionQueue.concat(asyncActionArray);

      if (syncActivityFinished) {
        flushQueue();
      }
    };

    /**
     * If successful, dispatch the fulfilled action, otherwise dispatch
     * rejected action.
     */

    return promise.then(
      ({ result, status, responseURL }) => {
        'function' === typeof action.onSuccess &&
          action.onSuccess({
            payload: result,
            meta
          });

        dispatch({
          type: FULFILLED,
          payload: result,
          meta,
          group,
          asyncDispatch
        });
        syncActivityFinished = true;
        flushQueue();
      },
      ({ error, status, responseURL, id, server, version, detail, t, c, e, f }) => {
        if (status === 503 && !getState()?.maintenance?.isMaintenance) {
          return dispatch(setMaintenanceMode({ info: error }));
        }

        if (status === 401) {
          gaEventTracking({
            category: GA_TRACKING_EVENT_CATEGORY.EXCEPTION,
            action: GA_TRACKING_EVENT_ACTION.EXCEPTION.UNEXPECTED_API_RESPONSE_401,
            label: responseURL,
            value: 1
          });
          reportException(error, {
            type: 'Expired/invalid API token',
            statusCode: status,
            responseURL
          });

          if (localStorage.getItem(storageKey.REFERRAL_REDIRECT) !== '/') {
            localStorage.setItem(storageKey.REFERRAL_REDIRECT, '/');
            // FIXME: Alert is being displayed multiple times
            // To reproduce: Login > tamper access_token > reload page
            // alert(
            //   'Thông báo:\nPhiên đăng nhập của bạn đã kết thúc. Vui lòng đăng nhập lại để tiếp tục trải nghiệm mua sắm tại Lixibox.'
            // );

            openAlertAction(
              ALERT_GENERAL_ERROR({
                content:
                  'Thông báo:\nPhiên đăng nhập của bạn đã kết thúc. Vui lòng đăng nhập lại để tiếp tục trải nghiệm mua sắm tại Lixibox.'
              })
            );
          }

          if (sessionStorage.getItem(storageKey.LOGOUT_401_IN_PROGRESS) !== 'true') {
            sessionStorage.setItem(storageKey.LOGOUT_401_IN_PROGRESS, 'true');
            dispatch(cleanupSessionAction());
          }
          return;
        }

        // Handle statuses outside of the range [1 - 399]

        'function' === typeof action.onReject &&
          action.onReject({
            payload: error,
            meta
          });

        dispatch({
          type: REJECTED,
          payload: error,
          meta,
          group,
          asyncDispatch
        });
        syncActivityFinished = true;
        flushQueue();
      }
    );
  };
}
