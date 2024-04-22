import { AnyAction, combineReducers } from '@reduxjs/toolkit';

import app from './app/reducer';
import banner from './banner/reducer';
import error from './error/reducer';
import expert from './expert/reducer';
import gwp from './gwp/reducer';
import search from './search/reducer';
import modal from './modal/reducer';
import sharedModal from './shared-modal/reducer';
import alert from './alert/reducer';
import menu from './menu/reducer';
import shop from './shop/reducer';
import auth from './auth/reducer';
import cart from './cart/reducer';
import like from './like/reducer';
import love from './love/reducer';
import brand from './brand/reducer';
import user from './user/reducer';
import notification from './notification/reducer';
import province from './province/reducer';
import address from './address/reducer';
import feedback from './feedback/reducer';
import referral from './referral/reducer';
import magazine from './magazine/reducer';
import activityFeed from './activity-feed/reducer';
import theme from './theme/reducer';
import specialDeals from './special-deals/reducer';
import orderTrackings from './order-trackings/reducer';
import tracking from './tracking/reducer';
import order from './order/reducer';
import meta from './meta/reducer';
import discussion from './discussion/reducer';
import subcribe from './subcribe/reducer';
import group from './group/reducer';
import discountCode from './discount-code/reducer';
import game from './game/reducer';
import maintenance from './maintenance/reducer';
import countdown from './countdown/reducer';
import lixicoin from './lixicoin/reducer';
import faq from './faq/reducer';
import unboxing from './unboxing/reducer';
import live from './live/reducer';
import recommendation from './recommendation/reducer';
import report from './report/reducer';

import * as ROOT_ACTION_TYPE from './type';

const createRootReducer = () => {
  const appReducer = combineReducers({
    app,
    banner,
    error,
    expert,
    gwp,
    search,
    modal,
    sharedModal,
    alert,
    menu,
    shop,
    auth,
    cart,
    like,
    love,
    brand,
    user,
    notification,
    province,
    address,
    feedback,
    referral,
    magazine,
    activityFeed,
    theme,
    specialDeals,
    orderTrackings,
    tracking,
    order,
    meta,
    discussion,
    subcribe,
    group,
    discountCode,
    game,
    maintenance,
    countdown,
    lixicoin,
    faq,
    unboxing,
    live,
    recommendation,
    report
  });

  const rootReducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
    if (action.type === ROOT_ACTION_TYPE.RESET_REDUX) {
      // Reset state
      // https://stackoverflow.com/a/35641992
      // Obsolete: // Reset state except `state.router`, to mitigate an issue where unexpeced route is mounted transiently
      // Obsolete: // Ref.: https://stackoverflow.com/a/37338532/14631599
      state = undefined;
    }

    return appReducer(state, action);
  };

  return rootReducer;
};

export default createRootReducer;
