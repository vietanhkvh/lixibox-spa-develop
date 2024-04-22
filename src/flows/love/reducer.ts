import { REDUCER_GROUP } from '../reducer.group';
import * as LOVE_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';
import { isExistError, formatErrorMessage } from '../../utils/exception';

import { openAlertAction } from '../alert/action';
import { ALERT_GENERAL_ERROR, ALERT_GENERAL_SUCCESS } from '../../constants/application/alert';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_LOVE = {
  addLove: {},
  loveBox: {},
  loveList: {},
  loveDetail: {},
  isAddLoveWaiting: true,
  isAddLoveSuccess: false,
  isFetchLoveListSuccess: false
};

const loveReducer = (
  state = INITIAL_STATE_LOVE,
  action = {
    type: '',
    payload: { loves: {}, error: '', errors: [] },
    meta: {},
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.LOVE) {
    return state;
  }

  const { loveList, loveDetail, loveBox } = state;
  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  switch (action.type) {
    /** Fetch love list */
    case PENDING_TYPE(LOVE_ACTION_TYPE.FETCH_LOVE_LIST):
      loveList[generationHash] = {};
      return Object.assign({}, state, {
        loveList,
        isFetchLoveListSuccess: false
      });

    case FULFILLED_TYPE(LOVE_ACTION_TYPE.FETCH_LOVE_LIST):
      loveList[generationHash] = action.payload;
      return Object.assign({}, state, {
        loveList,
        isFetchLoveListSuccess: true
      });

    case REJECTED_TYPE(LOVE_ACTION_TYPE.FETCH_LOVE_LIST):
      loveList[generationHash] = {};
      return Object.assign({}, state, {
        loveList,
        isFetchLoveListSuccess: false
      });

    /** Get love detail */
    case PENDING_TYPE(LOVE_ACTION_TYPE.GET_LOVE_DETAIL):
      loveDetail[generationHash] = [];
      return Object.assign({}, state, { loveDetail });

    case FULFILLED_TYPE(LOVE_ACTION_TYPE.GET_LOVE_DETAIL):
      loveDetail[generationHash] = action.payload;
      return Object.assign({}, state, { loveDetail });

    case REJECTED_TYPE(LOVE_ACTION_TYPE.GET_LOVE_DETAIL):
      loveDetail[generationHash] = {};
      return Object.assign({}, state, { loveDetail });

    /** Like product */
    case PENDING_TYPE(LOVE_ACTION_TYPE.ADD_LOVE):
      return Object.assign({}, state, {
        isAddLoveWaiting: true,
        isAddLoveSuccess: false
      });

    case FULFILLED_TYPE(LOVE_ACTION_TYPE.ADD_LOVE):
      action.asyncDispatch(
        openAlertAction(
          ALERT_GENERAL_SUCCESS({
            content: `Chúc mừng! Bạn đã chia sẻ link thành công.`
          })
        )
      );

      return Object.assign({}, state, {
        isAddLoveSuccess: true,
        isAddLoveWaiting: false
      });

    case REJECTED_TYPE(LOVE_ACTION_TYPE.ADD_LOVE):
      if (isExistError(action.payload.error, action.payload.errors)) {
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload.error || action.payload.errors)
            })
          )
        );
      }

      return Object.assign({}, state, {
        isAddLoveSuccess: false,
        isAddLoveWaiting: false
      });

    /** Get love detail */
    case PENDING_TYPE(LOVE_ACTION_TYPE.GET_LOVE_BOX):
      return state;

    case FULFILLED_TYPE(LOVE_ACTION_TYPE.GET_LOVE_BOX):
      loveBox[generationHash] = action.payload.loves;
      return Object.assign({}, state, { loveBox });

    case REJECTED_TYPE(LOVE_ACTION_TYPE.GET_LOVE_BOX):
      return state;

    default:
      return state;
  }
};

export default loveReducer;
