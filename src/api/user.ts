import { get, patch, post } from '../config/restful-method';
import { getCsrfToken } from '../utils/auth';

/** Fetch user order list */
export interface IFetchUserOrderListParam {
  page?: number;
  perPage?: number;
  status?: string;
  sortPrice?: 'asc' | 'desc';
  sortCreatedAt?: 'asc' | 'desc';
}

export const fetchUserOrderList = ({
  page = 1,
  perPage = 50,
  status = '',
  sortCreatedAt = 'desc'
}: IFetchUserOrderListParam) => {
  const statuses =
    typeof status === 'string'
      ? status
          .split(',')
          .filter((status) => status)
          .map((status) => `statuses[]=${status}`)
          .join('&')
      : '';
  const query =
    `?page=${page}` +
    `&per_page=${perPage}` +
    `${statuses ? `&${statuses}` : ''}` +
    `&sort[created_at]=${sortCreatedAt}`;

  return get({
    path: `/user/orders${query}`,
    description: '[User] Fetch user order list /user/orders',
    errorMesssage: `Can't fetch user order list. Please try again`
  });
};

export interface FetchUserStoreOrdersParams {
  page: number;
  perPage: number;
}
export const fetchUserStoreOrders = ({ page = 1, perPage = 50 }: FetchUserStoreOrdersParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('per_page', String(perPage));
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

  return get({
    path: `/user/store_orders${queryString}`,
    description: `[User] Fetch user's store orders /user/store_orders`,
    errorMesssage: `Can't fetch user's store orders. Please try again`
  });
};

/** Fetch user watched list */
export interface IFetchUserWatchedListParam {
  page?: number;
  perPage?: number;
}

export const fetchUserWatchedList = ({ page = 1, perPage = 25 }: IFetchUserWatchedListParam) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/user/recently_viewed_boxes${query}`,
    description: '[User] Fetch user watched list /user/recently_viewed_boxes',
    errorMesssage: `Can't fetch user watched list. Please try again`
  });
};

export const fetchUserWaitList = ({ page = 1, perPage = 24 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/user/waitlist${query}`,
    description: '[User] Fetch user wait list /user/waitlist',
    errorMesssage: `Can't fetch user wait list. Please try again`
  });
};

export const changePasswordUser = ({ password }) =>
  post({
    path: `/user/change_password`,
    data: { csrf_token: getCsrfToken(), password: password },
    description: '[User] User change password `/user/change_password',
    errorMesssage: `Can't change password. Please try again`
  });

/** Fetch user dashboard */
export const fetchUserDashBoard = () =>
  get({
    path: `/user`,
    description: '[User] Fetch user dashboard /user',
    errorMesssage: `Can't fetch user dashboard. Please try again`
  });

export const UserTransactionType = Object.freeze({
  LIXICOIN: 'lixicoin' as const,
  BALANCE: 'balance' as const
});
export type UserTransactionTypeType = (typeof UserTransactionType)[keyof typeof UserTransactionType];
export interface FetchUserTransactionsApiParams {
  /**
   * <UserTransactionTypeType[,UserTransactionTypeType,...]>
   */
  type: UserTransactionTypeType;
  page?: number;
  perPage?: number;
}
export const fetchUserTransactionList = ({ type, page = 1, perPage = 10 }) => {
  const query = `?page=${page}&per_page=${perPage}${type ? `&types=${type}` : ''}`;

  return get({
    path: `/user/transactions${query}`,
    description: '[User] Fetch user transaction list /user/transactions',
    errorMesssage: `Can't fetch user transaction list. Please try again`
  });
};

/**
 * Fetch personal discount codes of user
 */
export const fetchUserDiscountCodes = ({
  page = 1,
  perPage = 30,
  filter = 'mine'
}: {
  page: number;
  perPage: number;
  filter: 'mine' | 'offer';
}) => {
  const query = `?page=${page}&per_page=${perPage}&filter=${filter}`;

  return get({
    path: `/user/discount_codes${query}`,
    description: '[User] Fetch user discount code list /user/discount_codes',
    errorMesssage: `Can't fetch user discount code list. Please try again`
  });
};

/**
 * Fetch vouchers of user
 */
export const fetchUserVouchers = ({ page = 1, perPage = 30 }: { page: number; perPage: number }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/user/vouchers${query}`,
    description: `[User] Fetch user's vouchers /user/discount_codes`,
    errorMesssage: `Can't fetch user's vouchers. Please try again`
  });
};

/**
 * Fetch user refferal profile
 */
export const fetchUserReferrerProfile = ({ referrerProfile }) => {
  const query = `?referral_code=${referrerProfile}`;

  return get({
    path: `/user/referrer_profile${query}`,
    description: '[User] Fetch user referral code /user/referrer_profile',
    errorMesssage: `Can't fetch user referral code. Please try again`
  });
};

/** Fetch user order count */
export const fetchUserOrderCount = () => {
  return get({
    path: `/user/order_count`,
    description: '[User] Fetch user order count /user/order_count',
    errorMesssage: `Can't fetch user order count. Please try again`
  });
};

/**
 * Update guest password
 */
export const updateGuestPassword = ({ email, password }) =>
  post({
    path: `/user/update_guest_password`,
    data: { csrf_token: getCsrfToken(), email, password },
    description: '[User] Update guest password /user/update_guest_password',
    errorMesssage: `Can't update guest password. Please try again`
  });

/**
 * Share email
 */
export const shareEmail = ({ emails, message }) =>
  post({
    path: `/user/share_emails`,
    data: { csrf_token: getCsrfToken(), emails, message },
    description: '[User] Share email /user/share_emails',
    errorMesssage: `Can't share email. Please try again`
  });

/**
 * Set birthday
 */
export const setBirthday = ({ birthday }) =>
  patch({
    path: `/user/set_birthday?birthday=${birthday}`,
    description: '[User] Set birthday /user/set_birthday',
    errorMesssage: `Can't set birthday. Please try again`
  });

/**
 * Check birthday
 */
export const checkBirthday = () =>
  get({
    path: `/user/check_birthday`,
    description: '[User] Check birthday /user/check_birthday',
    errorMesssage: `Can't check birthday. Please try again`
  });

/**
 * Get user membership
 */
export const getUserMembership = () =>
  get({
    path: `/user/membership`,
    description: '[User] Check birthday /user/check_birthday',
    errorMesssage: `Can't check birthday. Please try again`
  });

/**
 * Verify email
 */
export const verifyEmail = ({ otp, email }) =>
  post({
    path: `/user/verify_email`,
    data: { otp, email },
    description: '[User] Verify email /user/verify_email',
    errorMesssage: `Can't verify email. Please try again`
  });

/**
 * Verify phone
 */
export interface VerifyPhoneApiParams {
  otp: string;
  phone: string;
}
export const verifyPhoneApi = ({ otp, phone }: VerifyPhoneApiParams) =>
  patch({
    path: `/user/verify_phone`,
    data: { otp, phone },
    description: '[User] Verify phone /user/verify_phone',
    errorMesssage: `Can't verify phone. Please try again`
  });

/**
 * Request email verification
 */
export const requestEmailVerification = () =>
  get({
    path: `/user/request_verification`,
    description: '[User] Request email verification /user/request_verification',
    errorMesssage: `Can't request verification. Please try again`
  });

/**
 * Request change email
 */
export const requestChangeEmail = ({ email }) =>
  post({
    path: `/user/request_change_email`,
    data: { email },
    description: '[User] reqhest change email /user/request_change_email',
    errorMesssage: `Can't request change email. Please try again`
  });

export interface FetchUserExclusiveCashbackBoxesApiParams {
  page: number;
  perPage: number;
}
export const fetchUserExclusiveCashbackBoxesApi = ({
  page = 1,
  perPage = 10
}: FetchUserExclusiveCashbackBoxesApiParams) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/user/cashback_exclusive${query}`,
    description: '[User] Fetch user exclusive cashback boxes /user/cashback_exclusive',
    errorMesssage: `Can't fetch user exclusive cashback boxes. Please try again`
  });
};
