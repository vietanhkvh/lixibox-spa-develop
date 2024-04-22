import {
  ROUTING_CHECK_OUT,
  ROUTING_CHECK_OUT_PAYMENT,
  ROUTING_CHECK_OUT_SUCCESS,
  ROUTING_AUTH_SIGN_IN,
  ROUTING_AUTH_SIGN_UP,
  ROUTING_AUTH_RESET_PASSWORD,
  ROUTING_AUTH_FORGOT_PASSWORD,
  ROUTING_MOBILE_BRAND_PATH,
  ROUTING_GAME,
  ROUTING_GAME_BEAUTY_HUNTER,
  ROUTING_GAME_BEAUTY_HUNTER_PLAY,
  ROUTING_GAME_BEAUTY_HUNTER_RESULT,
  ROUTING_COMMUNITY_LIVE,
  ROUTING_AUTH_CHECKOUT_FAST_TRACK
} from '../../../routings/path';
import { IState } from './model';

export const WHITE_LIST_CHECK_OUT_CONTAINER = {
  DESKTOP: [ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT, ROUTING_CHECK_OUT_SUCCESS],
  MOBILE: [
    ROUTING_CHECK_OUT,
    ROUTING_CHECK_OUT_PAYMENT,
    ROUTING_CHECK_OUT_SUCCESS,
    ROUTING_AUTH_SIGN_IN,
    ROUTING_AUTH_SIGN_UP,
    ROUTING_AUTH_CHECKOUT_FAST_TRACK,
    ROUTING_AUTH_RESET_PASSWORD,
    ROUTING_AUTH_FORGOT_PASSWORD,
    ROUTING_MOBILE_BRAND_PATH
  ]
};

export const NO_FOOTER_ROUTES = {
  DESKTOP: [ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT, ROUTING_CHECK_OUT_SUCCESS]
};

export const BLACK_LIST_GAME_HEADER_MOBILE = [
  ROUTING_GAME,
  ROUTING_GAME_BEAUTY_HUNTER,
  ROUTING_GAME_BEAUTY_HUNTER_PLAY,
  ROUTING_GAME_BEAUTY_HUNTER_RESULT
];

export const BLACK_LIST_LIVE_DETAIL_HEADER_MOBILE = ROUTING_COMMUNITY_LIVE;

export const INITIAL_STATE = {
  isError: -1,
  isShowBirthdayModalForm: false,
  isShowCartSummary: false,
  crossTabSyncIntervalId: null
} as IState;
export const optionalDataRaw = {
  data: null,
  size: 'small',
  icon: { position: 'left', name: { main: 'flash', divide: 'divide' } },
  enable: {
    day: {
      block: false
    },
    hour: {
      block: true,
      text: false
    },
    minute: {
      block: true,
      text: false
    },
    second: {
      block: true,
      text: false
    }
  }
};
