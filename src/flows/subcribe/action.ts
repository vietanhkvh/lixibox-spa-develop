import * as SUBCRIBE_API_PATH from '../../api/subcribe';
import * as SUBCRIBE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Send subcribe email info
 *
 * @param {string} contact ex: email | phone number
 *
 */
export const sendSubcribeInfoAction =
  ({ contact }) =>
  (dispatch, getState) =>
    dispatch({
      type: SUBCRIBE_ACTION_TYPE.SEND_SUBCRIBE_INFO,
      payload: {
        promise: SUBCRIBE_API_PATH.sendSubcribeInfo({ contact }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.SUBCRIBE
    });
