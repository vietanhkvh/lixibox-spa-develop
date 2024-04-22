import * as AUTH_API_PATH from '../../api/auth';
import * as AUTH_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';
import { clearCartAction } from '../cart/action';
import { resetReduxAction } from '../action';

/**
 * Sign In Action with email and password
 *
 * @param {string} email
 * @param {string} phone
 * @param {string} password
 */
interface SigninActionParams {
  email?: string;
  phone?: string;
  password: string;
  onSuccess?: () => any;
  onReject?: () => any;
}
export const signInAction = (params: SigninActionParams) => (dispatch, getState) => {
  const { email, phone, password, onSuccess, onReject } = params;

  return dispatch({
    type: AUTH_ACTION_TYPE.SIGN_IN,
    payload: {
      promise: AUTH_API_PATH.signIn({ email, phone, password }).then((res) => res)
    },
    meta: params,
    group: REDUCER_GROUP.AUTH,
    onSuccess,
    onReject
  });
};

/**
 * Sets sign-in status as LOGIN_SUCCESS, without any API invocation
 * (used to sync session status, when other tabs are updated)
 */
export const signInLocalAction =
  ({ user }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_IN_LOCAL,
      payload: {},
      meta: { user },
      group: REDUCER_GROUP.AUTH
    });

export const signInWithTokenAction =
  ({ accessToken }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_IN_WITH_TOKEN,
      payload: {
        promise: AUTH_API_PATH.signInWithToken({ accessToken }).then((res) => res)
      },
      group: REDUCER_GROUP.AUTH
    });

/**
 * Sign In Action with Facebook
 *
 * @param {string} authorizationCode
 * @param {string} referralCode
 * @param {string} redirectUri
 */
export type SignInFBActionParams = AUTH_API_PATH.SignInFBApiParams;
export const signInFBAction =
  ({ authorizationCode, redirectUri, referralCode = '' }: SignInFBActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_IN_FB,
      payload: {
        promise: AUTH_API_PATH.signInFBApi({ authorizationCode, redirectUri, referralCode }).then((res) => res)
      },
      group: REDUCER_GROUP.AUTH
    });

/**
 * Sign In with Apple ID
 *
 * @param {string} authCode - (required) Authorization code
 * @param {{ firstName: string, lastName: string, email: string }} user? - Pass whenever available through `AppleIDSignInOnSuccess` event
 */
export const signInWithAppleIDAction =
  (authCode: string, user?: { name?: { firstName: string; lastName: string }; email: string }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_IN_WITH_APPLE_ID,
      payload: {
        promise: AUTH_API_PATH.signInWithAppleID(authCode, user).then((res) => res)
      },
      group: REDUCER_GROUP.AUTH
    });

/**
 * Sign In with Apple ID - Signin state update
 *
 * @param {{ isWaiting: boolean }} payload
 */
export const setAppleSigninStateAction = (payload: { isWaiting: boolean }) => ({
  type: AUTH_ACTION_TYPE.SET_APPLE_SIGNIN_STATE,
  payload,
  group: REDUCER_GROUP.AUTH
});

/**
 * Sign In with Google
 */
export type SigninWithGoogleActionParams = AUTH_API_PATH.SigninWithGoogleApiParams;
export const signinWithGoogleAction = (args: SigninWithGoogleActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.SIGNIN_WITH_GOOGLE,
    payload: {
      promise: AUTH_API_PATH.signinWithGoogleApi(args).then((res) => res)
    },
    group: REDUCER_GROUP.AUTH
  });

/**
 * Signin with Google - Signin state update
 *
 * @param {{ isWaiting: boolean }} payload
 */
export const setGoogleSigninStateAction = (payload: { isWaiting: boolean }) => ({
  type: AUTH_ACTION_TYPE.SET_GOOGLE_SIGNIN_STATE,
  payload,
  group: REDUCER_GROUP.AUTH
});

/**
 * Signin with Facebook - Signin state update
 *
 * @param {{ isWaiting: boolean }} payload
 */
export const setFacebookSigninStateAction = (payload: { isWaiting: boolean }) => ({
  type: AUTH_ACTION_TYPE.SET_FACEBOOK_SIGNIN_STATE,
  payload,
  group: REDUCER_GROUP.AUTH
});

/**
 * Link social account
 */
export type LinkSocialAccountActionParams = AUTH_API_PATH.LinkSocialAccountApiParams;
export const linkSocialAccountAction = (args: LinkSocialAccountActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.LINK_SOCIAL_ACCOUNT,
    payload: {
      promise: AUTH_API_PATH.linkSocialAccount(args).then((res) => res)
    },
    meta: args,
    group: REDUCER_GROUP.AUTH
  });

/**
 * Unlink social account
 *
 * @param {{ provider: string; }}
 */
interface UninkSocialAccountActionParams {
  provider: 'facebook' | 'apple' | 'google';
}
export const unlinkSocialAccountAction = (args: UninkSocialAccountActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.UNLINK_SOCIAL_ACCOUNT,
    payload: {
      promise: AUTH_API_PATH.unlinkSocialAccount(args).then((res) => res)
    },
    meta: args,
    group: REDUCER_GROUP.AUTH
  });

/**
 * Sign Out Action
 * Will be call API with cookie: CSRF TOKEN
 */
export const signOutAction = (params?: { alertOnSignout?: any; dontClearCartOnSignout?: boolean }) => {
  return (dispatch, getState) => {
    (params && params.dontClearCartOnSignout) || dispatch(clearCartAction());
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_OUT,
      payload: { promise: AUTH_API_PATH.signOut().then((res) => res) },
      meta: Object.assign({}, params && params.alertOnSignout && { alertOnSignout: params.alertOnSignout }),
      group: REDUCER_GROUP.AUTH
    });
  };
};

/**
 * Fast Track Request OTP Action
 */
export type FastTrackRequestOtpActionParams = AUTH_API_PATH.FastTrackRequestOtpApiParams;
export const fastTrackRequestOtpAction = (args: FastTrackRequestOtpActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.FAST_TRACK_REQUEST_OTP,
    payload: {
      promise: AUTH_API_PATH.fastTrackRequestOtpApi(args).then((res) => res)
    },
    meta: args,
    group: REDUCER_GROUP.AUTH
  });

/**
 * Fast Track Verify OTP Action
 */
export type FastTrackVerifyOtpActionParams = AUTH_API_PATH.FastTrackVerifyOtpApiParams;
export const fastTrackVerifyOtpAction = (args: FastTrackVerifyOtpActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.FAST_TRACK_VERIFY_OTP,
    payload: {
      promise: AUTH_API_PATH.fastTrackVerifyOtpApi(args).then((res) => res)
    },
    meta: args,
    group: REDUCER_GROUP.AUTH
  });

/**
 * Cleanup session Action
 * Usage:
 *   - Invoked as an alternative to `signoutAction`, when `access_token` is expired
 */
export const cleanupSessionAction = (params?: { alertOnSignout?: any; dontClearCartOnSignout?: boolean }) => {
  return (dispatch, getState) => {
    (params && params.dontClearCartOnSignout) || dispatch(clearCartAction());
    dispatch({
      type: AUTH_ACTION_TYPE.CLEANUP_SESSION,
      payload: {},
      meta: Object.assign({}, params && params.alertOnSignout && { alertOnSignout: params.alertOnSignout }),
      group: REDUCER_GROUP.AUTH
    });

    dispatch(resetReduxAction());
  };
};

/**
 * Change avatar of user
 *
 * @param {string} password
 */
export const changeAvatarUserAction =
  ({ avatar }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.CHANGE_AVATAR_USER,
      payload: {
        promise: AUTH_API_PATH.changeAvatarUser({
          avatar
        }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.AUTH
    });

/**
 * Edit user profile
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} birthday
 * @param {string} phone
 * @param {string} gender
 */
export const editUserProfileAction =
  ({ firstName, lastName, birthday, phone, gender }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.EDIT_USER_PROFILE,
      payload: {
        promise: AUTH_API_PATH.editUserProfile({
          firstName,
          lastName,
          birthday,
          phone,
          gender
        }).then((res) => res)
      },
      meta: { data: { firstName, lastName, birthday, phone, gender } },
      group: REDUCER_GROUP.AUTH,
      asyncDispatch: (data: any) => {}
    });

/**
 * Sign Up Action with params
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} phone
 * @param {string} uid
 * @param {string} facebookToken
 * @param {string} referralCode
 * @param {string} utmId
 * @param {string} otp
 */
export type SignUpActionParams = AUTH_API_PATH.ISignUpApiParams;
export const signUpAction = (params: SignUpActionParams) => (dispatch, getState) => {
  const {
    firstName,
    lastName,
    password,
    email = '',
    phone = '',
    uid = '',
    facebookToken = '',
    referralCode = '',
    utmId = 0,
    otp = ''
  } = params;

  return dispatch({
    type: AUTH_ACTION_TYPE.SIGN_UP,
    payload: {
      promise: AUTH_API_PATH.signUp({
        firstName,
        lastName,
        email,
        password,
        otp,
        phone,
        uid,
        facebookToken,
        referralCode,
        utmId
      }).then((res) => res)
    },
    meta: params,
    group: REDUCER_GROUP.AUTH
  });
};

/**
 * Forgot password
 *
 * @param {string} email
 */
export const forgotPasswordAction =
  ({ email }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.FORGOT_PASSWORD,
      payload: {
        promise: AUTH_API_PATH.forgotPassword({
          email
        }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.AUTH
    });

/**
 * Reset password
 *
 * @param {string} password
 * @param {string} resetPasswordToken
 */
export const resetPasswordAction =
  ({ password, resetPasswordToken }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.RESET_PASSWORD,
      payload: {
        promise: AUTH_API_PATH.resetPassword({
          password,
          resetPasswordToken
        }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.AUTH
    });

export type ResetPasswordByOtpActionParams = AUTH_API_PATH.ResetPasswordByOtpApiParams;
export const resetPasswordByOtpAction = (params: ResetPasswordByOtpActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.RESET_PASSWORD_WITH_OTP,
    payload: {
      promise: AUTH_API_PATH.resetPasswordByOtpApi(params).then((res) => res)
    },
    meta: params,
    group: REDUCER_GROUP.AUTH
  });

export const requestEmailVerificationOtpAction =
  ({ email }) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION_OTP,
      payload: {
        promise: AUTH_API_PATH.requestEmailVerificationOtp({
          email
        }).then((res) => res)
      },
      meta: { email },
      group: REDUCER_GROUP.AUTH
    });

export const getEmailVerificationAction = () => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.GET_EMAIL_VERIFICATION,
    payload: {
      promise: AUTH_API_PATH.getEmailVerification().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.AUTH
  });

export interface RequestPhoneVerificationOtpActionParams {
  phone: string;
}
export const requestPhoneVerificationOtpAction =
  ({ phone }: RequestPhoneVerificationOtpActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.REQUEST_PHONE_VERIFICATION_OTP,
      payload: {
        promise: AUTH_API_PATH.requestOtpApi({
          phone,
          requestType: 'verify_phone'
        }).then((res) => res)
      },
      meta: { phone },
      group: REDUCER_GROUP.AUTH
    });

export interface RequestOtpActionParams {
  email?: string;
  phone?: string;
  requestType: AUTH_API_PATH.RequestOtpApiRequestType;
}
export const requestOtpAction =
  ({ email, phone, requestType }: RequestOtpActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.REQUEST_OTP,
      payload: {
        promise: AUTH_API_PATH.requestOtpApi(
          Object.assign({}, { requestType }, email && { email }, phone && { phone })
        ).then((res) => res)
      },
      meta: { email, phone, requestType },
      group: REDUCER_GROUP.AUTH
    });

export type UpdatePasswordByOtpActionParams = AUTH_API_PATH.UpdatePasswordByOTPApiParams & {
  onSuccess?: () => any;
  onReject?: () => any;
};
export const updatePasswordByOtpAction =
  ({ onSuccess, onReject, ...otherParams }: UpdatePasswordByOtpActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.UPDATE_PASSWORD_BY_OTP,
      payload: {
        promise: AUTH_API_PATH.updatePasswordByOTP(otherParams).then((res) => res)
      },
      meta: otherParams,
      group: REDUCER_GROUP.AUTH,
      onSuccess,
      onReject
    });

/**
 * Clear auth store action
 *
 */
export const clearAuthStoreAction = () => ({
  type: AUTH_ACTION_TYPE.CLEAR_AUTH_STORE,
  payload: {}
});

/**
 * Fetch user profile
 *
 * TODO: Move to auth flow
 */
export const fetchUserProfileAction =
  (params?: { onSuccess?: (param0?: any) => any; onReject?: (param0?: any) => any }) => (dispatch, getState) =>
    dispatch({
      type: AUTH_ACTION_TYPE.FETCH_USER_PROFILE,
      payload: {
        promise: AUTH_API_PATH.fetchUserProfileApi().then((res) => res)
      },
      meta: {},
      onSuccess: params?.onSuccess,
      onReject: params?.onReject,
      group: REDUCER_GROUP.AUTH
    });

export const backToAdminAction = () => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.BACK_TO_ADMIN,
    payload: {
      promise: AUTH_API_PATH.backToAdmin().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.AUTH
  });

export type AttachPhoneActionParams = AUTH_API_PATH.AttachPhoneApiParams;
export const attachPhoneAction = (params: AttachPhoneActionParams) => (dispatch, getState) =>
  dispatch({
    type: AUTH_ACTION_TYPE.ATTACH_PHONE,
    payload: {
      promise: AUTH_API_PATH.attachPhoneApi(params).then((res) => res)
    },
    meta: params,
    group: REDUCER_GROUP.AUTH
  });
