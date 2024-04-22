import * as LIXICOIN_API_PATH from '../../api/lixicoin';
import * as LIXICOIN_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Get membership lixicoin
 */
export const getMembershipAction = () => (dispatch, getState) =>
  dispatch({
    type: LIXICOIN_ACTION_TYPE.GET_MEMBERSHIP,
    payload: { promise: LIXICOIN_API_PATH.getLixicoinMembership().then((res) => res) },
    meta: {},
    group: REDUCER_GROUP.LIXICOIN
  });
