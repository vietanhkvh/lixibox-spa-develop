import { REDUCER_GROUP } from '../reducer.group';
import { loadGameAction } from './action';
import * as GAME_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_LOVE = {
  loadGame: null,
  isLoadingGame: false,
  userGift: [],
  isLoadingUserGift: false,
  todayGift: [],
  isLoadingTodayGift: false,
  playGame: {},
  isLoadingPlayGame: false,
  isLoadingRedeemPlayTimes: false,
  redeemResult: false
};

const loveReducer = (
  state = INITIAL_STATE_LOVE,
  action = {
    type: '',
    payload: { play: {}, rewards: [], boxes: [], profile: {} },
    meta: {},
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.GAME) {
    return state;
  }

  switch (action.type) {
    case PENDING_TYPE(GAME_ACTION_TYPE.LOAD_GAME):
      return Object.assign({}, state, { loadGame: null, isLoadingGame: true });

    case FULFILLED_TYPE(GAME_ACTION_TYPE.LOAD_GAME):
      return Object.assign({}, state, {
        loadGame: action.payload.play,
        playGame: action.payload.play,
        isLoadingGame: false
      });

    case REJECTED_TYPE(GAME_ACTION_TYPE.LOAD_GAME):
      return Object.assign({}, state, { loadGame: null, isLoadingGame: false });

    ////////////////////////

    case PENDING_TYPE(GAME_ACTION_TYPE.GET_USER_GIFT):
      return Object.assign({}, state, {
        userGift: [],
        isLoadingUserGift: true
      });

    case FULFILLED_TYPE(GAME_ACTION_TYPE.GET_USER_GIFT):
      return Object.assign({}, state, {
        userGift: action.payload.rewards,
        isLoadingUserGift: false
      });

    case REJECTED_TYPE(GAME_ACTION_TYPE.GET_USER_GIFT):
      return Object.assign({}, state, {
        userGift: [],
        isLoadingUserGift: false
      });

    ////////////////////////

    case PENDING_TYPE(GAME_ACTION_TYPE.GET_TODAY_GIFT):
      return Object.assign({}, state, {
        todayGift: [],
        isLoadingTodayGift: true
      });

    case FULFILLED_TYPE(GAME_ACTION_TYPE.GET_TODAY_GIFT):
      return Object.assign({}, state, {
        todayGift: action.payload.boxes,
        isLoadingTodayGift: false
      });

    case REJECTED_TYPE(GAME_ACTION_TYPE.GET_TODAY_GIFT):
      return Object.assign({}, state, {
        todayGift: [],
        isLoadingTodayGift: false
      });

    ////////////////////////

    case PENDING_TYPE(GAME_ACTION_TYPE.PLAY_GAME):
      return Object.assign({}, state, {
        playGame: {},
        isLoadingPlayGame: true
      });

    case FULFILLED_TYPE(GAME_ACTION_TYPE.PLAY_GAME):
      return Object.assign({}, state, {
        playGame: action.payload.play,
        isLoadingPlayGame: false
      });

    case REJECTED_TYPE(GAME_ACTION_TYPE.PLAY_GAME):
      return Object.assign({}, state, {
        playGame: {},
        isLoadingPlayGame: false
      });

    ////////////////////////

    case PENDING_TYPE(GAME_ACTION_TYPE.REDEEM_PLAY_TIMES):
      return Object.assign({}, state, {
        isLoadingRedeemPlayTimes: true,
        redeemResult: false
      });

    case FULFILLED_TYPE(GAME_ACTION_TYPE.REDEEM_PLAY_TIMES):
      action.asyncDispatch(loadGameAction());
      return Object.assign({}, state, {
        loadGame: Object.assign({}, state.loadGame, action.payload.profile),
        isLoadingRedeemPlayTimes: false,
        redeemResult: true
      });

    case REJECTED_TYPE(GAME_ACTION_TYPE.REDEEM_PLAY_TIMES):
      return Object.assign({}, state, {
        isLoadingRedeemPlayTimes: false,
        redeemResult: false
      });

    default:
      return state;
  }
};

export default loveReducer;
