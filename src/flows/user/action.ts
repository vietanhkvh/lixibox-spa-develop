import * as USER_API_PATH from '../../api/user';
import * as USER_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch user order list action
 *
 * @param {number} page ex 1, 2
 * @param {number} perPage ex 50
 * @param {string} filter ex const order: ORDER_TYPE
 * @param {string} sortPrice ex asc, desc
 * @param {string} sortCreatedAt ex asc, desc
 */

export const fetchUserOrderListAction = ({ page, perPage, status, sortPrice, sortCreatedAt, onSuccess, onReject }) => {
  return (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_ORDER_LIST,
      payload: {
        promise: USER_API_PATH.fetchUserOrderList({
          page,
          perPage,
          status,
          sortPrice,
          sortCreatedAt
        }).then((res) => res)
      },
      meta: { page, perPage, status, sortPrice, sortCreatedAt },
      group: REDUCER_GROUP.USER,
      onSuccess,
      onReject
    });
};

/**
 * Fetch user's store orders action
 *
 * @param {number} page
 * @param {number} perPage
 */
export const fetchUserStoreOrdersAction = ({ page, perPage }) => {
  return (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_STORE_ORDERS,
      payload: {
        promise: USER_API_PATH.fetchUserStoreOrders({ page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.USER
    });
};

/**
 * Fetch user watched list action
 *
 * @param {number} page ex 1, 2
 * @param {number} perPage ex 50
 */

export const fetchUserWatchedListAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_WATCHED_LIST,
      payload: {
        promise: USER_API_PATH.fetchUserWatchedList({ page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.USER
    });

/**
 * Fetch user order count action
 */
export const fetchUserOrderCountAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.FETCH_USER_ORDER_COUNT,
    payload: {
      promise: USER_API_PATH.fetchUserOrderCount().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Fetch user wait list action
 *
 * @param {number} page ex 1, 2
 * @param {number} perPage ex 50
 */

export const fetchUserWaitListAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_WAIT_LIST,
      payload: {
        promise: USER_API_PATH.fetchUserWaitList({ page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.USER
    });

/**
 * Change password of user
 *
 * @param {string} password
 */
export const changePasswordUserAction =
  ({ password, onSuccess, onReject }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.CHANGE_PASSWORD_USER,
      payload: {
        promise: USER_API_PATH.changePasswordUser({ password }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.USER,
      onSuccess,
      onReject
    });

/**
 * Fetch user profile
 */

export const fetchUserDashboardAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.FETCH_USER_DASHBOARD,
    payload: {
      promise: USER_API_PATH.fetchUserDashBoard().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Fetch user transactions action
 */
export type FetchUserTransactionsActionParams = USER_API_PATH.FetchUserTransactionsApiParams;
export const fetchUserTransactionsAction =
  ({ type, page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_TRANSACTION_LIST,
      payload: {
        promise: USER_API_PATH.fetchUserTransactionList({
          page,
          perPage,
          type
        }).then((res) => res)
      },
      meta: { page, perPage, type },
      group: REDUCER_GROUP.USER
    });

export const fetchUserPersonalDiscountCodesAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_PERSONAL_DISCOUNT_CODES,
      payload: {
        promise: USER_API_PATH.fetchUserDiscountCodes({
          page,
          perPage,
          filter: 'mine'
        }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.USER
    });

export const fetchUserVouchersAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_VOUCHERS,
      payload: {
        promise: USER_API_PATH.fetchUserVouchers({ page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.USER
    });

/**
 * Clear user store action
 *
 */
export const clearUserStoreAction = () => ({
  type: USER_ACTION_TYPE.CLEAR_USER_STORE,
  payload: {},
  group: REDUCER_GROUP.USER
});

/**
 * Fetch user referrer profile
 *
 * @param {string} referralCode
 */

export const fetchUserReferrerProfileAction =
  ({ referrerProfile }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_REFERRER_PROFILE,
      payload: {
        promise: USER_API_PATH.fetchUserReferrerProfile({ referrerProfile }).then((res) => res)
      },
      meta: { referrerProfile },
      group: REDUCER_GROUP.USER
    });

/**
 * Update guest password
 *
 * @param {string} email
 * @param {string} password
 */

export const updateGuestPasswordAction =
  ({ email, password }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.UPDATE_GUEST_PASSWORD,
      payload: {
        promise: USER_API_PATH.updateGuestPassword({ email, password }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.USER
    });

/**
 * Share email
 *
 * @param {string} email
 * @param {string} message
 */

export const shareEmailAction =
  ({ emails, message }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.SHARE_EMAIL,
      payload: {
        promise: USER_API_PATH.shareEmail({ emails, message }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.USER
    });

/**
 * Set birthday
 *
 * @param {string} birthday
 */

export const setBirthdayAction =
  ({ birthday }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.SET_BIRTHDAY,
      payload: {
        promise: USER_API_PATH.setBirthday({ birthday }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.USER
    });

/**
 * Check birthday
 */

export const checkBirthdayAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CHECK_BIRTHDAY,
    payload: {
      promise: USER_API_PATH.checkBirthday().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user dashboard
 */

export const clearDataUserProfileAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_DASHBOARD,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user referrer profile
 */

export const clearDataUserReferrerProfileAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_REFERRER_PROFILE,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user order list
 */

export const clearDataUserOrderListAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_ORDER_LIST,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user watched list
 */

export const clearDataUserWatchedListAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_WATCHED_LIST,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user wait list
 */

export const clearDataUserWaitListAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_WAIT_LIST,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user address list
 */

export const clearDataUserAddressListAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_ADDRESS_LIST,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Clear data user transaction list
 */

export const clearDataUserTransactionListAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.CLEAR_DATA_USER_TRANSACTION_LIST,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Get user memevership action
 */

export const getUserMembershipAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.GET_USER_MEMBERSHIP,
    payload: {
      promise: USER_API_PATH.getUserMembership().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Get user memevership action
 */

export const verifyEmailAction =
  ({ otp, email }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.VERIFY_EMAIL,
      payload: {
        promise: USER_API_PATH.verifyEmail({ otp, email }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.USER
    });

export interface VerifyPhoneActionParams {
  otp: string;
  phone: string;
}
export const verifyPhoneAction =
  ({ otp, phone }: VerifyPhoneActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.VERIFY_PHONE,
      payload: {
        promise: USER_API_PATH.verifyPhoneApi({ otp, phone }).then((res) => res)
      },
      meta: { otp, phone },
      group: REDUCER_GROUP.USER
    });

/**
 * Request email verification
 */

export const requestEmailVerificationAction = () => (dispatch, getState) =>
  dispatch({
    type: USER_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION,
    payload: {
      promise: USER_API_PATH.requestEmailVerification().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.USER
  });

/**
 * Request change email
 */

export const requestChangeEmailAction =
  ({ email }) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.REQUEST_CHANGE_EMAIL,
      payload: {
        promise: USER_API_PATH.requestChangeEmail({ email }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.USER
    });

export type FetchUserExclusiveCashbackBoxesActionParams = USER_API_PATH.FetchUserExclusiveCashbackBoxesApiParams;
export const fetchUserExclusiveCashbackBoxesAction =
  ({ page, perPage }: FetchUserExclusiveCashbackBoxesActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: USER_ACTION_TYPE.FETCH_USER_EXCLUSIVE_CASHBACK_BOXES,
      payload: {
        promise: USER_API_PATH.fetchUserExclusiveCashbackBoxesApi({ page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.USER
    });
