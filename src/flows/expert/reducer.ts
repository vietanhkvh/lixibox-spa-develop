import { REDUCER_GROUP } from '../reducer.group';
import * as EXPERT_ACTION_TYPE from './type';

import { objectToHash, stringToHash } from '../../utils/encode';
import { FULFILLED_TYPE } from '../action.config';

export const INITIAL_STATE_EXPERT = {
  expertInfo: {},
  listExpert: {},
  listExpertVideo: [],
  productByExpert: {},
  expertTrackingList: {}
};

function expertReducer(
  state = INITIAL_STATE_EXPERT,
  action = {
    type: '',
    payload: null,
    meta: {
      code: '',
      idExpert: '',
      metaFilter: ''
    },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.EXPERT) {
    return state;
  }

  const { expertInfo, productByExpert } = state;

  switch (action.type) {
    case FULFILLED_TYPE(EXPERT_ACTION_TYPE.GET_EXPERT_INFO):
      const expertHash = stringToHash(action.meta.idExpert);
      const expertInfoItem = { [expertHash]: action.payload };
      const expertInfoList = Object.assign({}, expertInfo, expertInfoItem);

      return Object.assign({}, state, { expertInfo: expertInfoList });

    case FULFILLED_TYPE(EXPERT_ACTION_TYPE.FETCH_PRODUCT_BY_EXPERT):
      productByExpert[objectToHash(action.meta.metaFilter)] = action.payload;

      return Object.assign({}, state, { productByExpert });

    case EXPERT_ACTION_TYPE.CLEAR_DATA_EXPERT_INFO:
      return Object.assign({}, state, { expertInfo: {} });

    case EXPERT_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_EXPERT:
      return Object.assign({}, state, { productByExpert: [] });

    default:
      return state;
  }
}

export default expertReducer;
