import { REDUCER_GROUP } from '../reducer.group';
import * as NOTIFICATION_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_NOTIFICATION = {
  unreadCount: 0,
  notificationList: {},
  isFetchNotificationSuccess: false
};

const notificationReducer = (
  state = INITIAL_STATE_NOTIFICATION,
  action = {
    type: '',
    payload: { notifications: {}, unread_count: 0 },
    meta: {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.NOTIFICATION) {
    return state;
  }

  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  const { notificationList } = state;
  let notificationItem, notificationListNew;

  switch (action.type) {
    /** Fetch user notification list */
    case PENDING_TYPE(NOTIFICATION_ACTION_TYPE.FETCH_NOTIFICATION_LIST):
      notificationItem = { [generationHash]: [] };
      notificationListNew = Object.assign({}, notificationList, notificationItem);

      return Object.assign({}, state, {
        isFetchNotificationSuccess: false,
        notificationList: notificationListNew
      });

    case FULFILLED_TYPE(NOTIFICATION_ACTION_TYPE.FETCH_NOTIFICATION_LIST):
      notificationItem = { [generationHash]: action.payload };
      notificationListNew = Object.assign({}, notificationList, notificationItem);

      return Object.assign({}, state, {
        isFetchNotificationSuccess: true,
        notificationList: notificationListNew,
        unreadCount: action.payload.unread_count
      });

    case REJECTED_TYPE(NOTIFICATION_ACTION_TYPE.FETCH_NOTIFICATION_LIST):
      notificationItem = { [generationHash]: [] };
      notificationListNew = Object.assign({}, notificationList, notificationItem);

      return Object.assign({}, state, {
        isFetchNotificationSuccess: false,
        notificationList: notificationListNew
      });

    default:
      return state;
  }
};

export default notificationReducer;
