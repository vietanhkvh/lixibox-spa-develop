import { ACTION_TYPE } from '../action.config';

export const DISPLAY_CART_SUMMARY = `${ACTION_TYPE.INTERACTION_ACTION}/DISPLAY_CART_SUMMARY`;

export const GET_CART = `${ACTION_TYPE.API_ACTION}/GET_CART`;
export const GET_CART_GIFT = `${ACTION_TYPE.API_ACTION}/GET_CART_GIFT`;
export const ADD_TO_CART = `${ACTION_TYPE.API_ACTION}/ADD_TO_CART`;
export const REMOVE_FROM_CART = `${ACTION_TYPE.API_ACTION}/REMOVE_FROM_CART`;
export const ADD_DISCOUNT_CODE = `${ACTION_TYPE.API_ACTION}/ADD_DISCOUNT_CODE`;
export const REMOVE_DISCOUNT_CODE = `${ACTION_TYPE.API_ACTION}/REMOVE_DISCOUNT_CODE`;
export const FETCH_ADD_ON_LIST = `${ACTION_TYPE.API_ACTION}/FETCH_ADD_ON_LIST`;
export const FETCH_CART_REDEEM_BOXES = `${ACTION_TYPE.API_ACTION}/FETCH_CART_REDEEM_BOXES`;
export const FETCH_CART_REDEEM_SPECIAL_BOXES = `${ACTION_TYPE.API_ACTION}/FETCH_CART_REDEEM_SPECIAL_BOXES`;
export const FETCH_CART_REDEEM_USER_BOXES = `${ACTION_TYPE.API_ACTION}/FETCH_CART_REDEEM_USER_BOXES`;
export const FETCH_CART_REDEEM_LATEST_BOXES = `${ACTION_TYPE.API_ACTION}/FETCH_CART_REDEEM_LATEST_BOXES`;
export const FETCH_CART_DISCOUNT_CODES = `${ACTION_TYPE.API_ACTION}/FETCH_CART_DISCOUNT_CODES`;
export const FETCH_CART_DISCOUNT_CODE = `${ACTION_TYPE.API_ACTION}/FETCH_CART_DISCOUNT_CODE`;
export const REMOVE_ITEM_FROM_ADD_ON_LIST = `${ACTION_TYPE.INTERACTION_ACTION}/REMOVE_ITEM_FROM_ADD_ON_LIST`;
export const CLEAR_CART = `${ACTION_TYPE.INTERACTION_ACTION}/CLEAR_CART`;
export const UPDATE_VARIANT_QUANTITY = `${ACTION_TYPE.INTERACTION_ACTION}/UPDATE_VARIANT_QUANTITY`;
export const CLEAR_NEW_ITEM_CURRENTLY = `${ACTION_TYPE.INTERACTION_ACTION}/CLEAR_NEW_ITEM_CURRENTLY`;
export const SHOW_HIDE_CART_SUMMARY = `${ACTION_TYPE.INTERACTION_ACTION}/SHOW_HIDE_CART_SUMMARY`;

export const CHECKOUT_DELIVERY_CHOOSE_ADDRESS = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_DELIVERY_CHOOSE_ADDRESS`;
export const CHECKOUT_DELIVERY_GUEST_ADDRESS = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_DELIVERY_GUEST_ADDRESS`;
export const CHECKOUT_DELIVERY_USER_PICKUP_STORE_ADDRESS = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_DELIVERY_USER_PICKUP_STORE_ADDRESS`;
export const CHECKOUT_DELIVERY_SET_GIFT_MESSAGE = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_DELIVERY_SET_GIFT_MESSAGE`;
export const CHECKOUT_DELIVERY_SET_NOTE_MESSAGE = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_DELIVERY_SET_NOTE_MESSAGE`;
export const CHECKOUT_DELIVERY_SET_DELIVERY_METHOD = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_DELIVERY_SET_DELIVERY_METHOD`;
export const CHECKOUT_CLEAR_DELIVERY_CONFIG = `${ACTION_TYPE.INTERACTION_ACTION}/CHECKOUT_CLEAR_DELIVERY_CONFIG`;
export const SET_PRIMARY_ADDRESS = `${ACTION_TYPE.API_ACTION}/SET_PRIMARY_ADDRESS`;
export const UPDATE_REPRESENTABLE_PROMOTIONS = `${ACTION_TYPE.INTERACTION_ACTION}/UPDATE_REPRESENTABLE_PROMOTIONS`;
export const UPDATE_AUTH_MODAL_STATE = `${ACTION_TYPE.INTERACTION_ACTION}/UPDATE_AUTH_MODAL_STATE`;
export const UPDATE_PROMOTIONS_VIEW_COUNT = `${ACTION_TYPE.INTERACTION_ACTION}/UPDATE_PROMOTIONS_VIEW_COUNT`;
export const SET_PROMOTIONS_POPUP_VISIBILITY = `${ACTION_TYPE.INTERACTION_ACTION}/SET_PROMOTIONS_POPUP_VISIBILITY`;

export const CHECKOUT = `${ACTION_TYPE.API_ACTION}/CHECKOUT`;
export const PAYMENT = `${ACTION_TYPE.API_ACTION}/PAYMENT`;
export const PAYMENT_SUCCESS = `${ACTION_TYPE.API_ACTION}/PAYMENT_SUCCESS`;
export const SELECT_GIFT = `${ACTION_TYPE.INTERACTION_ACTION}/SELECT_GIFT`;
export const SELECT_SPECIAL_ADD_ON = `${ACTION_TYPE.INTERACTION_ACTION}/SELECT_SPECIAL_ADD_ON`;
export const FETCH_BOXES_TO_FREESHIP = `${ACTION_TYPE.INTERACTION_ACTION}/FETCH_BOXES_TO_FREESHIP`;
export const FETCH_CONSTANTS = `${ACTION_TYPE.API_ACTION}/FETCH_CONSTANTS`;
export const CHECK_SAME_DAY_SHIPPING = `${ACTION_TYPE.INTERACTION_ACTION}/CHECK_SAME_DAY_SHIPPING`;
export const FETCH_SUGGESTION_DISCOUNT_CODES = `${ACTION_TYPE.INTERACTION_ACTION}/FETCH_SUGGESTION_DISCOUNT_CODES`;
export const CHECKOUT_ADDRESS = `${ACTION_TYPE.API_ACTION}/CHECKOUT_ADDRESS`;
export const FETCH_STORES = `${ACTION_TYPE.API_ACTION}/FETCH_STORES`;
export const FETCH_SAMPLE_BOXES = `${ACTION_TYPE.API_ACTION}/FETCH_SAMPLE_BOXES`;

export const CHANGE_PAYMENT_TO_COD = `${ACTION_TYPE.API_ACTION}/CHANGE_PAYMENT_TO_COD`;
export const GET_MOMO_PAYMENT_ADDRESS_URL = `${ACTION_TYPE.API_ACTION}/GET_MOMO_PAYMENT_ADDRESS_URL`;
export const GET_ONEPAY_PAYMENT_ADDRESS_URL = `${ACTION_TYPE.API_ACTION}/GET_ONEPAY_PAYMENT_ADDRESS_URL`;
export const UPDATE_ONEPAY_PAYMENT = `${ACTION_TYPE.API_ACTION}/UPDATE_ONEPAY_PAYMENT`;

export const CLEAR_PASSWORD_OTP_STATUS = `${ACTION_TYPE.API_ACTION}/CLEAR_PASSWORD_OTP_STATUS`;
export const TOGGLE_DISCOUNT_CODE_GIFT_MODAL_VISIBILITY = `${ACTION_TYPE.INTERACTION_ACTION}/TOGGLE_DISCOUNT_CODE_GIFT_MODAL_VISIBILITY`;
export const TOGGLE_DISCOUNT_CODE_ADDON_MODAL_VISIBILITY = `${ACTION_TYPE.INTERACTION_ACTION}/TOGGLE_DISCOUNT_CODE_ADDON_MODAL_VISIBILITY`;

export const INVOICE_FETCH = `${ACTION_TYPE.API_ACTION}/INVOICE_FETCH`;
export const INVOICE_FETCH_RECENT = `${ACTION_TYPE.API_ACTION}/INVOICE_FETCH_RECENT`;
export const INVOICE_UPDATE = `${ACTION_TYPE.API_ACTION}/INVOICE_UPDATE`;
export const INVOICE_DELETE = `${ACTION_TYPE.API_ACTION}/INVOICE_DELETE`;
export const TAX_CODE_FETCH_DETAIL = `${ACTION_TYPE.API_ACTION}/INVOICE_FETCH_DETAIL`;

export const SET_CHECKOUT_PHASE_READINESS = `${ACTION_TYPE.INTERACTION_ACTION}/SET_CHECKOUT_PHASE_READINESS`;
export const RESET_CHECKOUT_PHASE_READINESS = `${ACTION_TYPE.INTERACTION_ACTION}/RESET_CHECKOUT_PHASE_READINESS`;

export const CONTACT_PHONE_UPDATE = `${ACTION_TYPE.API_ACTION}/CONTACT_PHONE_UPDATE`;

export const ACCOMPANY_SERVICES_FETCH = `${ACTION_TYPE.API_ACTION}/ACCOMPANY_SERVICES_FETCH`;
export const ACCOMPANY_SERVICES_UPDATE = `${ACTION_TYPE.API_ACTION}/ACCOMPANY_SERVICES_UPDATE`;
export const ACCOMPANY_SERVICE_DELETE = `${ACTION_TYPE.API_ACTION}/ACCOMPANY_SERVICE_DELETE`;

export const SET_ACCOMPANIES_LOCAL = `${ACTION_TYPE.INTERACTION_ACTION}/SET_ACCOMPANIES_LOCAL`;
export const TOUCH_ACCOMPANIES_LOCAL = `${ACTION_TYPE.INTERACTION_ACTION}/TOUCH_ACCOMPANIES_LOCAL`;
export const SELECT_ACCOMPANIES_LOCAL_OPTION = `${ACTION_TYPE.INTERACTION_ACTION}/SELECT_ACCOMPANIES_LOCAL_OPTION`;
export const UPDATE_ACCOMPANIES_LOCAL_NOTE = `${ACTION_TYPE.INTERACTION_ACTION}/UPDATE_ACCOMPANIES_LOCAL_NOTE`;
export const TOGGLE_SELECTED_ACCOMPANIES_LOCAL = `${ACTION_TYPE.INTERACTION_ACTION}/TOGGLE_SELECTED_ACCOMPANIES_LOCAL`;

export const SET_PAYMENT_HIGHLIGHT_ERROR_BLOCK = `${ACTION_TYPE.INTERACTION_ACTION}/SET_PAYMENT_HIGHLIGHT_ERROR_BLOCK`;
export const RESET_PAYMENT_HIGHLIGHT_ERROR_BLOCK = `${ACTION_TYPE.INTERACTION_ACTION}/RESET_PAYMENT_HIGHLIGHT_ERROR_BLOCK`;

export const FETCH_ORDER_BOX_CATEGORY = `${ACTION_TYPE.API_ACTION}/FETCH_ORDER_BOX_CATEGORY`;
export const UPDATE_PAYMENT_METHOD = `${ACTION_TYPE.API_ACTION}/UPDATE_PAYMENT_METHOD`;

export const GET_CART_REFERRAL_SCHEMES = `${ACTION_TYPE.API_ACTION}/GET_CART_REFERRAL_SCHEMES`;
export const APPLY_CART_REFERRAL_SCHEME = `${ACTION_TYPE.API_ACTION}/APPLY_CART_REFERRAL_SCHEME`;

export const PREVENT_ACTION = `${ACTION_TYPE.BACKGROUND_ACTION}/PREVENT_ACTION`;

export const SIMULATE_ADD_TO_CART_ACTION = `${ACTION_TYPE.BACKGROUND_ACTION}/SIMULATE_ADD_TO_CART_ACTION`;

export const TOGGLE_APPLY_BALANCE_STATUS = `${ACTION_TYPE.API_ACTION}/TOGGLE_APPLY_BALANCE_STATUS`;
