import { REDUCER_GROUP } from '../reducer.group';
import * as USER_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { openAlertAction } from '../alert/action';
import { closeModalAction } from '../modal/action';
import { isUndefined, isEmptyObject } from '../../utils/validate';
import { isExistError, formatErrorMessage } from '../../utils/exception';
import { fetchUserProfileAction } from '../auth/action';
import { ALERT_GENERAL_ERROR, ALERT_GENERAL_SUCCESS } from '../../constants/application/alert';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../../constants/api/action.config';
import { UserState } from './types';

/**
 * TODO: Merge store.user with store.auth as both shares userInfo state, but is separated into 2 reducers, making it hard to maintain
 */

export const INITIAL_STATE_USER: UserState = {
  personalDiscountCode: {
    index: [],
    fetching: false,
    loaded: false,
    errored: false
  },
  vouchers: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  storeOrders: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  userDashboard: {
    user: {},
    orders: [],
    addresses: [],
    liked_boxes: [],
    notifications: [],
    waitlist_boxes: []
  },

  userWaitList: {},
  userOrderList: {},
  userWatchedList: {},

  userTransactionList: {},
  userReferrerProfile: {},

  userBirthday: {},
  userMembershipInfo: null,

  orderCount: {
    index: [],
    fetching: false,
    loaded: false,
    errored: false
  },

  fetchUserTransactions: {
    processing: false,
    processed: false,
    errored: false
  },

  cashbackBoxes: {
    byQuery: {},
    fetching: false,
    loaded: false,
    errored: false
  },

  isWaiting: true,
  isSuccess: false,
  isShareMailSuccess: false,
  isFetchUserWaitList: false,
  isLoadingUserWaitList: false,
  isFetchUserOrderList: false,
  isUpdateGuestPassword: false,
  isFetchUserWatchedList: false,
  isWaitingChangePassword: false,
  isChangedPasswordSuccess: false,
  isSetUserBirthdaySuccess: false,
  isLoadingShareMailSuccess: false,
  isCheckUserBirthdaySuccess: false,
  isFetchUserTransactionList: false,

  isFetchUserMembershipInfo: false,

  isRequestChangeEmailLoading: false,
  isRequestChangeEmailSuccess: false,
  isRequestEmailVerificationLoading: false,
  isRequestEmailVerificationSuccess: false,
  isVerifyEmailLoading: false,
  isVerifyEmailSuccess: false,
  isVerifyPhoneLoading: false,
  isVerifyPhoneSuccess: false
};

const userReducer = (
  state = INITIAL_STATE_USER,
  action = {
    type: '',
    payload: {
      membership: {},
      user: {},
      vouchers: [],
      error: '',
      errors: [],
      orders: {},
      referrer: {},
      addresses: {},
      liked_boxes: {},
      ask_birthday: {},
      transactions: {},
      notifications: {},
      original_user: {},
      waitlist_boxes: {},
      recently_viewed_boxes: {},
      paging: {
        current_page: 1,
        per_page: 25,
        total_pages: 1
      }
    },
    meta: { addressId: '' },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.USER) {
    return state;
  }

  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  const { userWaitList, userOrderList, userWatchedList, userTransactionList } = state;

  let userWaitItem, userOrderItem, userWatchedItem, userWaitListNew, userOrderListNew, userWatchedListNew;

  /** User transaction list */
  let userTransactionItem, userTransactionListNew;

  switch (action.type) {
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_PERSONAL_DISCOUNT_CODES):
      return Object.assign({}, state, {
        personalDiscountCode: Object.assign({}, state.personalDiscountCode, { fetching: true, errored: false })
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_PERSONAL_DISCOUNT_CODES): {
      let codes = (action.payload as any).discount_codes;
      codes = Array.isArray(codes) ? codes.filter((code) => code) : [];

      return Object.assign({}, state, {
        personalDiscountCode: Object.assign({}, state.personalDiscountCode, {
          index: codes,
          fetching: false,
          loaded: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_PERSONAL_DISCOUNT_CODES):
      return Object.assign({}, state, {
        personalDiscountCode: Object.assign({}, state.personalDiscountCode, { fetching: false, errored: true })
      });

    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_VOUCHERS):
      return Object.assign({}, state, {
        vouchers: Object.assign({}, state.vouchers, {
          fetching: true
        })
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_VOUCHERS): {
      const pages: Array<number> = state.vouchers.pages.concat(action.payload?.paging?.current_page);
      const uniquePages = Array.from(new Set(pages));

      return Object.assign({}, state, {
        vouchers: Object.assign({}, state.vouchers, {
          byQuery: Object.assign({}, state.vouchers.byQuery, {
            [generationHash]: action.payload.vouchers
          }),
          pages: uniquePages,
          lastPaging: action.payload.paging,
          fetching: false,
          loaded: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_VOUCHERS):
      return Object.assign({}, state, {
        vouchers: Object.assign({}, state.vouchers, {
          fetching: false,
          errored: true
        })
      });

    /** Fetch user dashboard */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_DASHBOARD):
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_DASHBOARD):
      return Object.assign({}, state, {
        userDashboard: {
          orders: action.payload.orders,
          addresses: action.payload.addresses,
          user: action && action.payload.user,
          liked_boxes: action.payload.liked_boxes,
          notifications: action.payload.notifications,
          waitlist_boxes: action.payload.waitlist_boxes
        },
        isSuccess: true,
        isWaiting: false
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_DASHBOARD):
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false
      });

    /** Fetch user order list */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_ORDER_LIST):
      userOrderItem = {
        [generationHash]: isEmptyObject(userOrderList) ? [] : userOrderList[generationHash]
      };
      userOrderListNew = Object.assign({}, userOrderList, userOrderItem);

      return Object.assign({}, state, {
        isFetchUserOrderList: false,
        userOrderList: userOrderListNew
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_ORDER_LIST):
      userOrderItem = { [generationHash]: action.payload };
      userOrderListNew = Object.assign({}, userOrderList, userOrderItem);

      return Object.assign({}, state, {
        isFetchUserOrderList: true,
        userOrderList: userOrderListNew
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_ORDER_LIST):
      userOrderItem = {
        [generationHash]: isEmptyObject(userOrderList) ? [] : userOrderList[generationHash]
      };
      userOrderListNew = Object.assign({}, userOrderList, userOrderItem);

      return Object.assign({}, state, {
        isFetchUserOrderList: false,
        userOrderList: userOrderListNew
      });

    /** Fetch user's store orders */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_STORE_ORDERS):
      return Object.assign({}, state, {
        storeOrders: Object.assign({}, state.storeOrders, {
          fetching: true
        })
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_STORE_ORDERS): {
      const pages: Array<number> = state.storeOrders.pages.concat(action.payload.paging.current_page);
      const uniquePages = Array.from(new Set(pages));

      return Object.assign({}, state, {
        storeOrders: Object.assign({}, state.storeOrders, {
          byQuery: Object.assign({}, state.storeOrders.byQuery, {
            [generationHash]: action.payload.orders
          }),
          pages: uniquePages,
          lastPaging: action.payload.paging,
          fetching: false,
          loaded: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_STORE_ORDERS):
      return Object.assign({}, state, {
        storeOrders: Object.assign({}, state.storeOrders, {
          fetching: false,
          errored: true
        })
      });

    /** Fetch user watched list */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_WATCHED_LIST):
      userWatchedItem = { [generationHash]: [] };
      userWatchedListNew = Object.assign({}, userWatchedList, userWatchedItem);

      return Object.assign({}, state, {
        isFetchUserWatchedList: false,
        userWatchedList: userWatchedListNew
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_WATCHED_LIST):
      userWatchedItem = { [generationHash]: action.payload };
      userWatchedListNew = Object.assign({}, userWatchedList, userWatchedItem);

      return Object.assign({}, state, {
        isFetchUserWatchedList: true,
        userWatchedList: userWatchedListNew
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_WATCHED_LIST):
      userWatchedItem = { [generationHash]: [] };
      userWatchedListNew = Object.assign({}, userWatchedList, userWatchedItem);

      return Object.assign({}, state, {
        isFetchUserWatchedList: false,
        userWatchedList: userWatchedListNew
      });

    /** Fetch user order count */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_ORDER_COUNT):
      return Object.assign({}, state, {
        orderCount: Object.assign({}, state.orderCount, {
          fetching: true
        })
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_ORDER_COUNT):
      return Object.assign({}, state, {
        orderCount: Object.assign({}, state.orderCount, {
          index: action.payload.orders,
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_ORDER_COUNT):
      return Object.assign({}, state, {
        orderCount: Object.assign({}, state.orderCount, {
          fetching: false,
          errored: true
        })
      });

    /** Fetch user watched list */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_WAIT_LIST):
      userWaitItem = { [generationHash]: [] };
      userWaitListNew = Object.assign({}, userWaitList, userWaitItem);

      return Object.assign({}, state, {
        isLoadingUserWaitList: true,
        isFetchUserWaitList: false,
        userWaitList: userWaitListNew
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_WAIT_LIST):
      userWaitItem = { [generationHash]: action.payload };
      userWaitListNew = Object.assign({}, userWaitList, userWaitItem);

      return Object.assign({}, state, {
        isLoadingUserWaitList: false,
        isFetchUserWaitList: true,
        userWaitList: userWaitListNew
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_WAIT_LIST):
      userWaitItem = { [generationHash]: [] };
      userWaitListNew = Object.assign({}, userWaitList, userWaitItem);

      return Object.assign({}, state, {
        isFetchUserWaitList: false,
        isLoadingUserWaitList: false,
        userWaitList: userWaitListNew
      });

    /** Change password of user */
    case PENDING_TYPE(USER_ACTION_TYPE.CHANGE_PASSWORD_USER):
      return Object.assign({}, state, {
        isWaitingChangePassword: true,
        isChangedPasswordSuccess: false
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.CHANGE_PASSWORD_USER):
      return Object.assign({}, state, {
        isWaitingChangePassword: false,
        isChangedPasswordSuccess: true
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.CHANGE_PASSWORD_USER):
      return Object.assign({}, state, {
        isWaitingChangePassword: true,
        isChangedPasswordSuccess: false
      });

    /** Fetch user transaction list */
    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_TRANSACTION_LIST):
      return Object.assign({}, state, {
        fetchUserTransactions: Object.assign({}, state.fetchUserTransactions, {
          processing: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_TRANSACTION_LIST):
      userTransactionItem = { [generationHash]: action.payload };
      userTransactionListNew = Object.assign({}, userTransactionList, userTransactionItem);

      return Object.assign({}, state, {
        fetchUserTransactions: Object.assign({}, state.fetchUserTransactions, {
          processing: false,
          processed: true,
          errored: false
        }),
        userTransactionList: userTransactionListNew
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_TRANSACTION_LIST):
      return Object.assign({}, state, {
        fetchUserTransactions: Object.assign({}, state.fetchUserTransactions, {
          processing: false,
          errored: true
        })
      });

    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_EXCLUSIVE_CASHBACK_BOXES):
      return Object.assign({}, state, {
        cashbackBoxes: Object.assign({}, state.cashbackBoxes, {
          fetching: true
        })
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_EXCLUSIVE_CASHBACK_BOXES): {
      return Object.assign({}, state, {
        cashbackBoxes: Object.assign({}, state.cashbackBoxes, {
          byQuery: Object.assign({}, state.cashbackBoxes.byQuery, {
            [generationHash]: action.payload
          }),
          fetching: false,
          loaded: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_EXCLUSIVE_CASHBACK_BOXES):
      return Object.assign({}, state, {
        cashbackBoxes: Object.assign({}, state.cashbackBoxes, {
          fetching: false,
          errored: true
        })
      });

    case USER_ACTION_TYPE.CLEAR_USER_STORE:
      return Object.assign({}, state, INITIAL_STATE_USER);

    case PENDING_TYPE(USER_ACTION_TYPE.FETCH_USER_REFERRER_PROFILE):
      return Object.assign({}, state, { userReferrerProfile: {} });

    case FULFILLED_TYPE(USER_ACTION_TYPE.FETCH_USER_REFERRER_PROFILE):
      return Object.assign({}, state, {
        userReferrerProfile: action.payload.referrer
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.FETCH_USER_REFERRER_PROFILE):
      return Object.assign({}, state, { userReferrerProfile: {} });

    case PENDING_TYPE(USER_ACTION_TYPE.UPDATE_GUEST_PASSWORD):
      return Object.assign({}, state, { isUpdateGuestPassword: false });

    case FULFILLED_TYPE(USER_ACTION_TYPE.UPDATE_GUEST_PASSWORD):
      action.asyncDispatch(openAlertAction(ALERT_GENERAL_SUCCESS({ content: 'Bạn đã tạo tài khoản thành công' })));

      return Object.assign({}, state, { isUpdateGuestPassword: true });

    case REJECTED_TYPE(USER_ACTION_TYPE.UPDATE_GUEST_PASSWORD):
      if (isExistError(action.payload.error, action.payload.errors)) {
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload.error || action.payload.errors)
            })
          )
        );
      }

      return Object.assign({}, state, { isUpdateGuestPassword: true });

    case PENDING_TYPE(USER_ACTION_TYPE.SHARE_EMAIL):
      return Object.assign({}, state, {
        isShareMailSuccess: false,
        isLoadingShareMailSuccess: false
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.SHARE_EMAIL):
      action.asyncDispatch(openAlertAction(ALERT_GENERAL_SUCCESS({ content: 'Bạn đã gửi mail thành công' })));

      return Object.assign({}, state, {
        isShareMailSuccess: true,
        isLoadingShareMailSuccess: true
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.SHARE_EMAIL):
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
        isShareMailSuccess: false,
        isLoadingShareMailSuccess: true
      });

    case PENDING_TYPE(USER_ACTION_TYPE.CHECK_BIRTHDAY):
      return Object.assign({}, state, {
        isCheckUserBirthdaySuccess: false,
        userBirthday: {}
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.CHECK_BIRTHDAY):
      return Object.assign({}, state, {
        isCheckUserBirthdaySuccess: true,
        userBirthday: action.payload
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.CHECK_BIRTHDAY):
      return Object.assign({}, state, {
        isCheckUserBirthdaySuccess: true,
        userBirthday: {}
      });

    case PENDING_TYPE(USER_ACTION_TYPE.SET_BIRTHDAY):
      return Object.assign({}, state, { isSetUserBirthdaySuccess: false });

    case FULFILLED_TYPE(USER_ACTION_TYPE.SET_BIRTHDAY):
      const message = ALERT_GENERAL_SUCCESS({
        content: 'Thiết lập ngày sinh thành công'
      });
      action.asyncDispatch(openAlertAction(message));
      action.asyncDispatch(closeModalAction());

      return Object.assign({}, state, {
        isSetUserBirthdaySuccess: true
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.SET_BIRTHDAY):
      if (isExistError(action.payload.error, action.payload.errors)) {
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload.error || action.payload.errors)
            })
          )
        );
      }

      return Object.assign({}, state, { isSetUserBirthdaySuccess: false });

    case PENDING_TYPE(USER_ACTION_TYPE.GET_USER_MEMBERSHIP):
      return Object.assign({}, state, {
        userMembershipInfo: null,
        isFetchUserMembershipInfo: true
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.GET_USER_MEMBERSHIP):
      return Object.assign({}, state, {
        userMembershipInfo: action.payload.membership,
        isFetchUserMembershipInfo: false
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.GET_USER_MEMBERSHIP):
      return Object.assign({}, state, {
        userMembershipInfo: null,
        isFetchUserMembershipInfo: false
      });

    case USER_ACTION_TYPE.CLEAR_DATA_USER_DASHBOARD:
      return Object.assign({}, state, {
        userDashboard: {
          addresses: [],
          liked_boxes: [],
          notifications: [],
          orders: [],
          user: {},
          waitlist_boxes: []
        }
      });

    case USER_ACTION_TYPE.CLEAR_DATA_USER_REFERRER_PROFILE:
      return Object.assign({}, state, {
        userReferrerProfile: {}
      });

    case USER_ACTION_TYPE.CLEAR_DATA_USER_ORDER_LIST:
      return Object.assign({}, state, {
        userOrderList: {}
      });

    case USER_ACTION_TYPE.CLEAR_DATA_USER_WATCHED_LIST:
      return Object.assign({}, state, {
        userWatchedList: {}
      });

    case USER_ACTION_TYPE.CLEAR_DATA_USER_WAIT_LIST:
      return Object.assign({}, state, {
        userWaitList: {}
      });

    case USER_ACTION_TYPE.CLEAR_DATA_USER_TRANSACTION_LIST:
      return Object.assign({}, state, {
        userTransactionList: {}
      });

    /* REQUEST_CHANGE_EMAIL */
    case PENDING_TYPE(USER_ACTION_TYPE.REQUEST_CHANGE_EMAIL):
      return Object.assign({}, state, {
        isRequestChangeEmailLoading: true,
        isRequestChangeEmailSuccess: false
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.REQUEST_CHANGE_EMAIL):
      return Object.assign({}, state, {
        isRequestChangeEmailLoading: false,
        isRequestChangeEmailSuccess: true
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.REQUEST_CHANGE_EMAIL):
      action.payload.error &&
        action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({ content: action.payload.error })));

      return Object.assign({}, state, {
        isRequestChangeEmailLoading: false,
        isRequestChangeEmailSuccess: false
      });

    /* REQUEST_EMAIL_VERIFICATION */
    case PENDING_TYPE(USER_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION):
      return Object.assign({}, state, {
        isRequestEmailVerificationLoading: true
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION):
      return Object.assign({}, state, {
        isRequestEmailVerificationLoading: false
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION):
      action.payload.error &&
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: action.payload.error
            })
          )
        );

      return Object.assign({}, state, {
        isRequestEmailVerificationLoading: false
      });

    /* VERIFY_EMAIL */
    case PENDING_TYPE(USER_ACTION_TYPE.VERIFY_EMAIL):
      return Object.assign({}, state, {
        isVerifyEmailLoading: true,
        isVerifyEmailSuccess: false
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.VERIFY_EMAIL):
      action.asyncDispatch(fetchUserProfileAction());
      action.asyncDispatch(
        openAlertAction(
          ALERT_GENERAL_SUCCESS({
            content: 'Xác thực email thành công'
          })
        )
      );

      return Object.assign({}, state, {
        isVerifyEmailLoading: false,
        isVerifyEmailSuccess: true
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.VERIFY_EMAIL):
      action.payload.error &&
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: action.payload.error
            })
          )
        );

      return Object.assign({}, state, {
        isVerifyEmailLoading: false,
        isVerifyEmailSuccess: false
      });

    /* VERIFY_PHONE */
    case PENDING_TYPE(USER_ACTION_TYPE.VERIFY_PHONE):
      return Object.assign({}, state, {
        isVerifyPhoneLoading: true,
        isVerifyPhoneSuccess: false
      });

    case FULFILLED_TYPE(USER_ACTION_TYPE.VERIFY_PHONE):
      action.asyncDispatch(fetchUserProfileAction());
      action.asyncDispatch(
        openAlertAction(
          ALERT_GENERAL_SUCCESS({
            content: 'Xác thực số điện thoại thành công'
          })
        )
      );

      return Object.assign({}, state, {
        isVerifyPhoneLoading: false,
        isVerifyPhoneSuccess: true
      });

    case REJECTED_TYPE(USER_ACTION_TYPE.VERIFY_PHONE):
      action.payload.error &&
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: action.payload.error
            })
          )
        );

      return Object.assign({}, state, {
        isVerifyPhoneLoading: false,
        isVerifyPhoneSuccess: false
      });

    default:
      return state;
  }
};

export default userReducer;
