import { REDUCER_GROUP } from '../reducer.group';
import * as LOVE_ACTION_TYPE from './type';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_UNBOXING = {
  config: {
    detail: null,
    fetching: false,
    loaded: false,
    errored: false
  }
};

const unboxingReducer = (
  state = INITIAL_STATE_UNBOXING,
  action = {
    type: '',
    payload: {},
    meta: {},
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.UNBOXING) {
    return state;
  }

  switch (action.type) {
    /** Fetch love list */
    case PENDING_TYPE(LOVE_ACTION_TYPE.FETCH_UNBOXING_CONFIG):
      return Object.assign({}, state, {
        config: Object.assign({}, state.config, {
          fetching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(LOVE_ACTION_TYPE.FETCH_UNBOXING_CONFIG):
      return Object.assign({}, state, {
        config: Object.assign({}, state.config, {
          detail: action.payload,
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(LOVE_ACTION_TYPE.FETCH_UNBOXING_CONFIG):
      return Object.assign({}, state, {
        config: Object.assign({}, state.config, {
          fetching: false,
          errored: true
        })
      });

    default:
      return state;
  }
};

export default unboxingReducer;
