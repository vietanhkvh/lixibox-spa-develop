import * as COUNTDOWN_API_PATH from '../../api/countdown';
import * as COUNTDOWN_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/** Fetch Countdown List */
export const fetchCountdownListAction = () => (dispatch, getState) =>
  dispatch({
    type: COUNTDOWN_ACTION_TYPE.FETCH_COUNTDOWN_LIST,
    payload: {
      promise: COUNTDOWN_API_PATH.fetchCountdowndList().then((res) => res)
    },
    group: REDUCER_GROUP.COUNTDOWN
  });
