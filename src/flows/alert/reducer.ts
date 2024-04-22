import { REDUCER_GROUP } from '../reducer.group';
import * as ALERT_ACTION_TYPE from './type';

export const INITIAL_STATE_ALERT = {
  isShowMobileSignin: false,
  list: []
};

const defaultAlertItem = {
  id: 0,
  icon: '',
  title: '',
  content: '',
  type: ''
};

const alertReducer = (
  state = INITIAL_STATE_ALERT,
  action = {
    type: '',
    payload: null,
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.ALERT) {
    return state;
  }

  const { list } = state;

  switch (action.type) {
    /** Open new alert */
    case ALERT_ACTION_TYPE.OPEN_ALERT:
      const newItem = Object.assign({}, defaultAlertItem, action.payload);
      const newList = [...list, newItem];

      return Object.assign({}, state, {
        list: newList
      });

    /** close alert */
    case ALERT_ACTION_TYPE.CLOSE_ALERT:
      return Object.assign({}, state, {
        list: list.filter((item: any) => item.id !== action.payload)
      });

    case ALERT_ACTION_TYPE.OPEN_MOBILE_SIGNIN_ALERT:
      return Object.assign({}, state, {
        isShowMobileSignin: true
      });

    case ALERT_ACTION_TYPE.CLOSE_MOBILE_SIGNIN_ALERT:
      return Object.assign({}, state, {
        isShowMobileSignin: false
      });

    default:
      return state;
  }
};

export default alertReducer;
