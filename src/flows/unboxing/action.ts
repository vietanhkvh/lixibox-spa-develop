import * as UNBOXING_API_PATH from '../../api/unboxing';
import * as UNBOXING_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const fetchUnboxingConfigAction = () => (dispatch, getState) =>
  dispatch({
    type: UNBOXING_ACTION_TYPE.FETCH_UNBOXING_CONFIG,
    payload: {
      promise: UNBOXING_API_PATH.fetchUnboxingConfig().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.UNBOXING
  });
