import { gatewayTrackCancelOrder } from 'tracking/gateway';
import * as ORDER_API_PATH from '../../api/order';
import * as ORDER_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Cancel order by number
 * @param {string} number
 */
export const cancelOrderAction = ({ order, number, cancelReasonId = 0 }) => {
  gatewayTrackCancelOrder({ order });

  return (dispatch, getState) =>
    dispatch({
      type: ORDER_ACTION_TYPE.CANCEL_ORDER,
      payload: {
        promise: ORDER_API_PATH.cancelOrder({ number, cancelReasonId }).then((res) => res)
      },
      meta: { order, number },
      group: REDUCER_GROUP.ORDER
    });
};

/**
 * Get order by number
 * @param {string} number
 */
export const getOrderAction =
  ({ number }) =>
  (dispatch, getState) =>
    dispatch({
      type: ORDER_ACTION_TYPE.FETCH_ORDER,
      payload: { promise: ORDER_API_PATH.getOrder({ number }).then((res) => res) },
      meta: { number },
      group: REDUCER_GROUP.ORDER
    });
export const getStoresOrderAction =
  ({ number }) =>
  (dispatch, getState) =>
    dispatch({
      type: ORDER_ACTION_TYPE.FETCH_ORDER,
      payload: { promise: ORDER_API_PATH.getStoresOrder({ number }).then((res) => res) },
      meta: { number },
      group: REDUCER_GROUP.ORDER
    });

/**
 * Update oder info
 */
export const updateOrderAction =
  ({ number, data }) =>
  (dispatch, getState) =>
    dispatch({
      type: ORDER_ACTION_TYPE.UPDATE_ODER,
      payload: data,
      meta: { number },
      group: REDUCER_GROUP.ORDER
    });

/**
 * Get order by number
 * @param {string} number
 */
export const getCancelOrderReasonAction = () => (dispatch, getState) =>
  dispatch({
    type: ORDER_ACTION_TYPE.FETCH_CANCEL_ORDER_REASON,
    payload: {
      promise: ORDER_API_PATH.getCancelOrderReason().then((res) => res)
    },
    group: REDUCER_GROUP.ORDER
  });

/**
 * Confirm order received
 */
export const confirmOrderReceivedAction =
  ({ orderId }) =>
  (dispatch, getState) =>
    dispatch({
      type: ORDER_ACTION_TYPE.CONFIRM_ORDER_RECEIVED,
      payload: {
        promise: ORDER_API_PATH.confirmOrderReceived({ orderId }).then((res) => res)
      },
      meta: { orderId },
      group: REDUCER_GROUP.ORDER
    });

/**
 * get birth day order count
 */
export const getOrderBirthdayReceived =
  ({ startAt, endAt }) =>
  (dispatch, getState) =>
    dispatch({
      type: ORDER_ACTION_TYPE.GET_BIRTHDAY_ORDER,
      payload: {
        promise: ORDER_API_PATH.getOrderBirthday({ startAt, endAt }).then((res) => res)
      },
      group: REDUCER_GROUP.ORDER
    });
