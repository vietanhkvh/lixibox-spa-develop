import * as ORDER_TRACKINGS_API_PATH from '../../api/order-trackings';
import * as ORDER_TRACKINGS_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch order trackings by code
 *
 * @param {string} code ex: EA9F8521
 */
export const fetchOrderTrackingByCodeAction =
  ({ code }) =>
  (dispatch, getState) =>
    dispatch({
      type: ORDER_TRACKINGS_ACTION_TYPE.FETCH_ORDER_TRACKINGS,
      payload: {
        promise: ORDER_TRACKINGS_API_PATH.fetchOrderTrackingByCode({ code }).then((res) => res)
      },
      meta: { code },
      group: REDUCER_GROUP.ORDER_TRACKINGS
    });
