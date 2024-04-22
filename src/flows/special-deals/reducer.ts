import { REDUCER_GROUP } from '../reducer.group';
import * as SPECIAL_DEALS_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_SPECIAL_DEALS = {
  specialDeal: {},
  specialDealList: []
};

const specialDealsReducer = (
  state = INITIAL_STATE_SPECIAL_DEALS,
  action = {
    type: '',
    payload: {
      special_deal: {},
      special_deals: {}
    },
    meta: {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.SPECIAL_DEALS) {
    return state;
  }

  const { specialDeal } = state;
  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  switch (action.type) {
    /** Fetch special deals list */
    case PENDING_TYPE(SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL_LIST):
      return state;

    case FULFILLED_TYPE(SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL_LIST):
      return Object.assign({}, state, {
        specialDealList: action.payload.special_deals
      });

    case REJECTED_TYPE(SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL_LIST):
      return state;

    /** Fetch special deals by slug or id */
    case PENDING_TYPE(SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL):
      return state;

    case FULFILLED_TYPE(SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL):
      const specialDealItem = { [generationHash]: action.payload.special_deal };
      const newSpecialDeal = Object.assign({}, specialDealItem, specialDeal);
      return Object.assign({}, state, { specialDeal: newSpecialDeal });

    case REJECTED_TYPE(SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL):
      return state;

    case SPECIAL_DEALS_ACTION_TYPE.CLEAR_DATA_SPECIAL_DEAL_LIST:
      return Object.assign({}, state, { specialDeal: {} });

    case SPECIAL_DEALS_ACTION_TYPE.CLEAR_DATA_SPECIAL_DEAL:
      return Object.assign({}, state, { specialDealList: [] });

    default:
      return state;
  }
};

export default specialDealsReducer;
