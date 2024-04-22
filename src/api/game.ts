import { get, post, patch } from '../config/restful-method';

export const loadGame = () =>
  post({
    path: `/games/load_game`,
    description: '[Games] Load game /games/load_game',
    errorMesssage: `Can't load game. Please try again`
  });

export const getUserGift = () =>
  get({
    path: `/games/user_gifts`,
    description: '[Games] Load user gift /games/user_gifts',
    errorMesssage: `Can't load game. Please try again`
  });

export const getTodayGift = () =>
  get({
    path: `/games/today_gifts`,
    description: '[Games] Load today gift /games/today_gifts',
    errorMesssage: `Can't load game. Please try again`
  });

export const playGame = ({ id }) =>
  patch({
    path: `/games/${id}/play`,
    description: '[Games] Load today gift /games/:id/play',
    errorMesssage: `Can't load game. Please try again`
  });

export const redeemPlayTimes = () =>
  post({
    path: `/games/redeem_coins`,
    description: '[Games] Redeem play times /games/redeem_coins',
    errorMesssage: `redeem play times. Please try again`
  });
