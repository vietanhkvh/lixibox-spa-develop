import { ACTION_TYPE } from './action.config';

export const TRACKING_VIEW_BOX = `${ACTION_TYPE.API_ACTION}/TRACKING_VIEW_BOX`;
export const TRACKING_VIEW_GROUP = `${ACTION_TYPE.API_ACTION}/TRACKING_VIEW_GROUP`;
export const FETCH_EXPERTS_TRACKING_GROUP = `${ACTION_TYPE.API_ACTION}/FETCH_EXPERTS_TRACKING_GROUP`;
export const SAVE_PRODUCT_TRACKING = `${ACTION_TYPE.API_ACTION}/SAVE_PRODUCT_TRACKING`;
export const SAVE_UTM_ID_TRACKING = `${ACTION_TYPE.API_ACTION}/SAVE_UTM_ID_TRACKING`;
export const REMOVE_UTM_ID_TRACKING = `${ACTION_TYPE.API_ACTION}/REMOVE_UTM_ID_TRACKING`;

export const CHANGE_ROUTING = `${ACTION_TYPE.ROUTING_ACTION}/CHANGE_ROUTING`;

export const CLEAR_DATA_EXPERTS_TRACKING_GROUP = `${ACTION_TYPE.API_ACTION}/CLEAR_DATA_EXPERTS_TRACKING_GROUP`;

export const TRACKING_ELM_TYPE = {
  CHECKOUT_CART: {
    HEADING: {
      CART: 'CHECKOUT_CART/HEADING/1.CART',
      PAYMENT: 'CHECKOUT_CART/HEADING/2.PAYMENT',
      SUCCESS: 'CHECKOUT_CART/HEADING/3.SUCCESS'
    }
  }
};
