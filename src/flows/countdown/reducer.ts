import { REDUCER_GROUP } from '../reducer.group';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

import * as COUNTDOWN_ACTION_TYPE from './type';

export const INITIAL_STATE_COUNTDOWN = {
  list: [],
  isLoaded: false,
  isFetching: false,
  errored: false
};

export default function countdownReducer(
  state = INITIAL_STATE_COUNTDOWN,
  action = {
    type: '',
    payload: { countdowns: [] },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.COUNTDOWN) {
    return state;
  }

  switch (action.type) {
    case PENDING_TYPE(COUNTDOWN_ACTION_TYPE.FETCH_COUNTDOWN_LIST):
      return Object.assign({}, state, {
        list: [],
        isFetching: true,
        isLoaded: false,
        errored: false
      });

    case FULFILLED_TYPE(COUNTDOWN_ACTION_TYPE.FETCH_COUNTDOWN_LIST):
      return Object.assign({}, state, {
        list: action.payload.countdowns,
        isLoaded: true,
        isFetching: false,
        errored: false
      });

    case REJECTED_TYPE(COUNTDOWN_ACTION_TYPE.FETCH_COUNTDOWN_LIST):
      return Object.assign({}, state, {
        list: [],
        errored: true,
        isFetching: false,
        isLoaded: true
      });

    default:
      return state;
  }
}
