import { REDUCER_GROUP } from '../reducer.group';
import * as ORDER_ACTION_TYPE from './type';

import { stringToHash } from '../../utils/encode';
import { openAlertAction } from '../alert/action';
import { closeModalAction } from '../modal/action';
import { getOrderAction } from '../order/action';
import { scrollElement } from '../../utils/scroll';

import { trackingFacebookPixel } from '../../tracking/facebook-pixel';
import { ALERT_GENERAL_SUCCESS, ALERT_GENERAL_ERROR } from '../../constants/application/alert';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_ORDER = {
  orderList: {},
  cancelOrderReasonList: [],
  confirmOrderReceived: {
    orderId: null,
    confirming: false,
    confirmed: false,
    errored: false
  },
  birthdayOrder: { orders: [], storeOrders: [], isLoading: false, isSuccess: false, isError: false },
  isGetOrderSuccess: false,
  isGetOrderFail: false,
  isCancelOrderSuccess: false,
  isGetCancelOrderReason: false
};

const orderReducer = (
  state = INITIAL_STATE_ORDER,
  action = {
    type: '',
    payload: { cancel_reasons: '', error: null, orders: [], store_orders: [] },
    meta: { number: '', order: {}, orderId: null },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.ORDER) {
    return state;
  }

  const { orderList } = state;
  switch (action.type) {
    /** Cancel order */
    case PENDING_TYPE(ORDER_ACTION_TYPE.CANCEL_ORDER):
      return Object.assign({}, state, { isCancelOrderSuccess: false });

    case FULFILLED_TYPE(ORDER_ACTION_TYPE.CANCEL_ORDER):
      {
        let order: any = action.meta.order;

        trackingFacebookPixel('cancel_order', {
          value: order.total_price,
          currency: 'VND',
          contents: order.order_boxes.map((item) => ({
            id: item.box.id,
            quantity: item.quantity,
            item_price: item.price
          })),
          content_type: 'product'
        });
      }

      action.asyncDispatch(openAlertAction(ALERT_GENERAL_SUCCESS({ content: 'Bạn đã huỷ đơn hàng thành công' })));

      // Close cancel reason order modal
      action.asyncDispatch(closeModalAction());

      action.asyncDispatch(getOrderAction({ number: action.meta.number }));
      setTimeout(() => scrollElement({ x: 0, y: 0, isAnimation: true }), 350);

      return Object.assign({}, state, { isCancelOrderSuccess: true });

    case REJECTED_TYPE(ORDER_ACTION_TYPE.CANCEL_ORDER):
      action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({})));
      return Object.assign({}, state, { isCancelOrderSuccess: false });

    /** Get order */
    case PENDING_TYPE(ORDER_ACTION_TYPE.FETCH_ORDER):
      return Object.assign({}, state, {
        isGetOrderSuccess: false,
        isGetOrderFail: false
      });

    case FULFILLED_TYPE(ORDER_ACTION_TYPE.FETCH_ORDER):
      const order = { [stringToHash(action.meta.number)]: action.payload };
      const newOrderList = Object.assign({}, orderList, order);

      return Object.assign({}, state, {
        orderList: newOrderList,
        isGetOrderSuccess: true,
        isGetOrderFail: false
      });

    case REJECTED_TYPE(ORDER_ACTION_TYPE.FETCH_ORDER):
      action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({ content: 'Không tìm thấy đơn hàng' })));

      return Object.assign({}, state, {
        isGetOrderSuccess: false,
        isGetOrderFail: true
      });

    /** Update order info */
    case ORDER_ACTION_TYPE.UPDATE_ODER: {
      const order = { [stringToHash(action.meta.number)]: { order: action.payload } };
      const newOrderList = Object.assign({}, orderList, order);

      return Object.assign({}, state, {
        orderList: newOrderList
      });
    }

    /** Get cancel order reason */
    case PENDING_TYPE(ORDER_ACTION_TYPE.FETCH_CANCEL_ORDER_REASON):
      return Object.assign({}, state, { isGetCancelOrderReason: false });

    case FULFILLED_TYPE(ORDER_ACTION_TYPE.FETCH_CANCEL_ORDER_REASON):
      return Object.assign({}, state, {
        cancelOrderReasonList: action.payload.cancel_reasons,
        isGetCancelOrderReason: true
      });

    case REJECTED_TYPE(ORDER_ACTION_TYPE.FETCH_CANCEL_ORDER_REASON):
      return Object.assign({}, state, { isGetCancelOrderReason: false });

    /** Confirm order received */
    case PENDING_TYPE(ORDER_ACTION_TYPE.CONFIRM_ORDER_RECEIVED):
      return Object.assign({}, state, {
        confirmOrderReceived: { orderId: action.meta.orderId, confirming: true, confirmed: false, errored: false }
      });

    case FULFILLED_TYPE(ORDER_ACTION_TYPE.CONFIRM_ORDER_RECEIVED):
      return Object.assign({}, state, {
        confirmOrderReceived: { orderId: action.meta.orderId, confirming: false, confirmed: true, errored: false }
      });

    case REJECTED_TYPE(ORDER_ACTION_TYPE.CONFIRM_ORDER_RECEIVED):
      return Object.assign({}, state, {
        confirmOrderReceived: {
          orderId: action.meta.orderId,
          confirming: false,
          confirmed: false,
          errored: action.payload.error
        }
      });
    /**
     * get birthday order for checking received gift
     */
    case PENDING_TYPE(ORDER_ACTION_TYPE.GET_BIRTHDAY_ORDER):
      return Object.assign({}, state, {
        birthdayOrder: {
          orders: action.payload.orders,
          storeOrders: action.payload.store_orders,
          isLoading: true,
          isSuccess: false,
          isError: false
        }
      });
    case FULFILLED_TYPE(ORDER_ACTION_TYPE.GET_BIRTHDAY_ORDER):
      return Object.assign({}, state, {
        birthdayOrder: {
          orders: action.payload.orders,
          storeOrders: action.payload.store_orders,
          isLoading: false,
          isSuccess: true,
          isError: false
        }
      });
    case REJECTED_TYPE(ORDER_ACTION_TYPE.GET_BIRTHDAY_ORDER):
      return Object.assign({}, state, {
        birthdayOrder: { isLoading: false, isSuccess: false, isError: true }
      });
    default:
      return state;
  }
};

export default orderReducer;
