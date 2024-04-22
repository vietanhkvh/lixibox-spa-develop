import { REDUCER_GROUP } from '../reducer.group';
import * as SUBCRIBE_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { openAlertAction } from '../alert/action';
import { closeModalAction } from '../modal/action';

import { isExistError, formatErrorMessage } from '../../utils/exception';
import { ALERT_GENERAL_ERROR, ALERT_GENERAL_SUCCESS } from '../../constants/application/alert';

export const INITIAL_STATE_NOTIFICATION = { isLoading: false, isSuccess: false, isError: false };

const subcribeReducer = (
  state = INITIAL_STATE_NOTIFICATION,
  action = {
    type: '',
    payload: {
      error: '',
      errors: []
    },
    meta: {},
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.SUBCRIBE) {
    return state;
  }

  switch (action.type) {
    case PENDING_TYPE(SUBCRIBE_ACTION_TYPE.SEND_SUBCRIBE_INFO):
      return Object.assign({}, state, { isLoading: true, isSuccess: false, isError: false });

    case FULFILLED_TYPE(SUBCRIBE_ACTION_TYPE.SEND_SUBCRIBE_INFO):
      const successMessage = ALERT_GENERAL_SUCCESS({
        content: 'Đăng ký thông tin thành công.'
      });
      action.asyncDispatch(openAlertAction(successMessage));
      action.asyncDispatch(closeModalAction());

      return Object.assign({}, state, { isLoading: false, isSuccess: true, isError: false });

    case REJECTED_TYPE(SUBCRIBE_ACTION_TYPE.SEND_SUBCRIBE_INFO):
      if (isExistError(action.payload.error, action.payload.errors)) {
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload.error || action.payload.errors)
            })
          )
        );
      }

      return Object.assign({}, state, { isLoading: false, isSuccess: false, isError: true });

    default:
      return state;
  }
};

export default subcribeReducer;
