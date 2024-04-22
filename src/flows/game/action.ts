import * as GAME_API_PATH from '../../api/game';
import * as GAME_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const loadGameAction = () => (dispatch, getState) =>
  dispatch({
    type: GAME_ACTION_TYPE.LOAD_GAME,
    payload: { promise: GAME_API_PATH.loadGame().then((res) => res) },
    group: REDUCER_GROUP.GAME
  });

export const getUserGiftAction = () => (dispatch, getState) =>
  dispatch({
    type: GAME_ACTION_TYPE.GET_USER_GIFT,
    payload: { promise: GAME_API_PATH.getUserGift().then((res) => res) },
    group: REDUCER_GROUP.GAME
  });

export const getTodayGiftAction = () => (dispatch, getState) =>
  dispatch({
    type: GAME_ACTION_TYPE.GET_TODAY_GIFT,
    payload: { promise: GAME_API_PATH.getTodayGift().then((res) => res) },
    group: REDUCER_GROUP.GAME
  });

export const playGameAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: GAME_ACTION_TYPE.PLAY_GAME,
      payload: { promise: GAME_API_PATH.playGame({ id }).then((res) => res) },
      group: REDUCER_GROUP.GAME
    });

export const redeemPlayTimesAction = () => (dispatch, getState) =>
  dispatch({
    type: GAME_ACTION_TYPE.REDEEM_PLAY_TIMES,
    payload: { promise: GAME_API_PATH.redeemPlayTimes().then((res) => res) },
    group: REDUCER_GROUP.GAME
  });
