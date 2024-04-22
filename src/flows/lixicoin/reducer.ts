import { REDUCER_GROUP } from '../reducer.group';
import * as LIXICOIN_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { LixicoinState } from './types';

export const INITIAL_STATE_LIXICOIN: LixicoinState = {
  membershipInfo: null,
  isFetchMembershipInfo: false
};

const feedbackReducer = (
  state = INITIAL_STATE_LIXICOIN,
  action = {
    type: '',
    payload: {
      levels: []
    },
    meta: {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.LIXICOIN) return state;

  switch (action.type) {
    /** Fetch feedbacks */
    case PENDING_TYPE(LIXICOIN_ACTION_TYPE.GET_MEMBERSHIP):
      return Object.assign({}, state, {
        membershipInfo: null,
        isFetchMembershipInfo: true
      });

    case FULFILLED_TYPE(LIXICOIN_ACTION_TYPE.GET_MEMBERSHIP):
      return Object.assign({}, state, {
        membershipInfo: action.payload.levels,
        isFetchMembershipInfo: false
      });

    case REJECTED_TYPE(LIXICOIN_ACTION_TYPE.GET_MEMBERSHIP):
      return Object.assign({}, state, {
        membershipInfo: null,
        isFetchMembershipInfo: false
      });

    default:
      return state;
  }
};

export default feedbackReducer;
