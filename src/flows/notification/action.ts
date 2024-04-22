import * as NOTIFICATION_API_PATH from '../../api/notification';
import * as NOTIFICATION_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch user notification list action
 *
 * @param {number} page ex 1,2
 * @param {number} perPage ex 50,
 */

export const fetchNotificationListAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: NOTIFICATION_ACTION_TYPE.FETCH_NOTIFICATION_LIST,
      payload: {
        promise: NOTIFICATION_API_PATH.fetchNotificationList({
          page,
          perPage
        }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.NOTIFICATION
    });
