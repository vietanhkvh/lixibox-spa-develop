import { REDUCER_GROUP } from '../reducer.group';
import * as ORDER_TRACKINGS_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_ORDER_TRACKINGS = { orderTrackings: {} };

const orderTrackingsReducer = (
  state = INITIAL_STATE_ORDER_TRACKINGS,
  action = {
    type: '',
    payload: { order: {} },
    meta: {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.ORDER_TRACKINGS) {
    return state;
  }

  const { orderTrackings } = state;
  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  switch (action.type) {
    /** Fetch order trackings by code */
    case PENDING_TYPE(ORDER_TRACKINGS_ACTION_TYPE.FETCH_ORDER_TRACKINGS):
      return state;

    case FULFILLED_TYPE(ORDER_TRACKINGS_ACTION_TYPE.FETCH_ORDER_TRACKINGS):
      const orderTrackingItem = { [generationHash]: action.payload.order };
      const newOrderTrackings = Object.assign({}, orderTrackingItem, orderTrackings);

      return Object.assign({}, state, { orderTrackings: newOrderTrackings });

    case REJECTED_TYPE(ORDER_TRACKINGS_ACTION_TYPE.FETCH_ORDER_TRACKINGS):
      return state;

    default:
      return state;
  }
};

export default orderTrackingsReducer;
