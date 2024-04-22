import { getCsrfToken } from '../utils/auth';
import { get, patch } from '../config/restful-method';
export const getOrderBirthday = ({ startAt, endAt }) =>
  get({
    path: `/orders/birthday?started_at=${startAt}&ended_at=${endAt}`,
    description: '[Order] User get order birth day /orders/getWebOrdersBirthday',
    errorMesssage: `Can't get order birth day. Please try again`
  });
export const getStoresOrder = ({ number }) =>
  get({
    path: `/store_orders/${number}`,
    description: '[Order] User get stores order /store_orders/:id',
    errorMesssage: `Can't get order with param. Please try again`
  });

export const getOrder = ({ number }) =>
  get({
    path: `/orders/${number}`,
    description: '[Order] User get order /orders/:id',
    errorMesssage: `Can't get order with param. Please try again`
  });

export const cancelOrder = ({ number, cancelReasonId }) => {
  const query = `?csrf_token=${getCsrfToken()}&cancel_reason_id=${cancelReasonId}`;

  return patch({
    path: `/orders/${number}${query}`,
    description: '[Order] User cancel order /orders/:id',
    errorMesssage: `Can't cancel order with param. Please try again`
  });
};

export const getCancelOrderReason = () =>
  get({
    path: `/orders/cancel_reasons`,
    description: '[Order] Get cancel order reasons /orders/cancel_reasons',
    errorMesssage: `Can't get cancel order reasons with param. Please try again`
  });

export const confirmOrderReceived = ({ orderId }) =>
  patch({
    path: `/orders/${orderId}/fulfill`,
    data: { csrf_token: getCsrfToken() },
    description: '[Order] Confirm order received /orders/:orderId/fulfill',
    errorMesssage: `Can't confirm order received. Please try again`
  });
