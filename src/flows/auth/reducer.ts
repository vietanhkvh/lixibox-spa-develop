import {
  ALERT_RESET_PASSWORD_ERROR,
  ALERT_SIGN_IN_WITH_APPLE_ID_ERROR,
  ALERT_SIGNIN_WITH_GOOGLE_ID_ERROR,
  ALERT_GENERAL_ERROR
} from 'constants/application/alert';
import { storageKey } from 'constants/application/client-storage';
import { SIGN_IN_STATE } from 'constants/application/global';
import { trackingFacebookPixel } from 'tracking/facebook-pixel';
import { trackingTiktokPixel } from 'tracking/tiktok-pixel';
import { dispatchApiError, formatErrorMessage, isExistError } from 'utils/exception';
import { formatPhoneNumberWithCountryPrefix } from 'utils/format';
import { resetReduxAction } from '../action';
import { PENDING_TYPE, REJECTED_TYPE, FULFILLED_TYPE } from '../action.config';
import { openAlertAction } from '../alert/action';
import { clearCartAction, clearDeliveryConfigAction } from '../cart/action';
import { clearPasswordOtpStatusAction } from '../cart/action';
import { REDUCER_GROUP } from '../reducer.group';
import { AuthMethod } from 'constants/application/auth';
import { gatewayTrackSignin, gatewayTrackSignup, gatewayTrackUpdateProfile } from 'tracking/gateway';
import { toCamel } from 'utils/encode';

import { fetchUserProfileAction } from './action';
import * as AUTH_ACTION_TYPE from './type';
import { AuthState } from './types';

const identifyTiktokTracking = ({ id, email, phone }) =>
  trackingTiktokPixel(
    id,
    {
      email,
      phone_number: formatPhoneNumberWithCountryPrefix(phone)
    },
    'identify'
  );

const completeRegistrationFbTracking = (name) =>
  trackingFacebookPixel('CompleteRegistration', {
    content_name: name,
    currency: 'VND',
    status: 'True',
    value: 0
  });

export const INITIAL_STATE_AUTH: AuthState = {
  errorMessage: '',
  userInfo: {},
  profile: null,
  originalUser: {},
  signInStatus: SIGN_IN_STATE.NO_LOGIN,

  socialLink: {
    provider: '',
    linking: false,
    linked: false,
    errored: false
  },
  socialUnlink: {
    provider: '',
    unlinking: false,
    unlinked: false,
    errored: false
  },

  emailVerificationOtpRequest: {
    response: null,
    requesting: false,
    requested: false,
    errored: false
  },

  phoneVerificationOtpRequest: {
    response: null,
    requesting: false,
    requested: false,
    errored: false
  },

  getEmailVerificationRequest: {
    response: null,
    requesting: false,
    requested: false,
    errored: false
  },

  otpRequest: {
    verifyPhone: {
      response: null,
      requesting: false,
      requested: false,
      errored: false
    },
    verifyEmail: {
      response: null,
      requesting: false,
      requested: false,
      errored: false
    },
    changePassword: {
      response: null,
      requesting: false,
      requested: false,
      errored: false
    },
    forgotPassword: {
      response: null,
      requesting: false,
      requested: false,
      errored: false
    },
    phoneSignupVerify: {
      response: null,
      requesting: false,
      requested: false,
      errored: false
    },
    phoneLoginVerify: {
      response: null,
      requesting: false,
      requested: false,
      errored: false
    }
  },

  fastTrackOtpRequest: {
    otpExpiresIn: null,
    lastPhone: '',
    lastEmail: '',
    requesting: false,
    requested: false,
    errored: false,
    error: null
  },

  fastTrackOtpVerify: {
    lastPhone: '',
    lastEmail: '',
    lastOtp: '',
    verifying: false,
    verified: false,
    errored: false,
    error: null
  },

  updatePasswordByOtp: {
    response: null,
    updating: false,
    updated: false,
    errored: false
  },

  attachPhone: {
    response: null,
    attaching: false,
    attached: false,
    errored: false
  },

  signUp: {
    response: null,
    signingUp: false,
    signedUp: false,
    errored: false
  },

  signIn: {
    response: null,
    signingIn: false,
    signedIn: false,
    errored: false
  },

  isBecomeTo: false,

  isSignInWithTokenSuccess: false,

  isWaitingChangeProfile: false,
  isChangedAvatarSuccess: false,
  isChangingAvatar: false,
  isChangedProfileSuccess: false,
  isWaitingAvatarPassword: false,

  isForgotPasswordSuccess: false,
  isWaitingForgotPassword: false,

  isWaitingChangePassword: false,
  isChangedPasswordSuccess: false,

  isWaitingResetPasswordOtp: false,

  isWaitingAppleSignin: false,
  isWaitingGoogleSignin: false,
  isWaitingFacebookSignin: false
};

const authReducer = (
  state = INITIAL_STATE_AUTH,
  action = {
    type: '',
    payload: {
      user: {
        name: ''
      },
      new_user: false,
      error: '',
      errors: [],
      userInfo: {},
      profile: null,
      originalUser: {},
      reason: ''
    },
    meta: {
      data: {}
    },
    group: '',
    asyncDispatch: (data: any) => {}
  } as any
) => {
  if (action.group !== REDUCER_GROUP.AUTH) {
    return state;
  }

  switch (action.type) {
    /** Sign in */
    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGN_IN):
      return Object.assign({}, state, {
        userInfo: null,
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN,
        signIn: Object.assign({}, state.signIn, {
          signingIn: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGN_IN): {
      const { user } = action.payload;
      identifyTiktokTracking(user);
      gatewayTrackSignin({ user, method: action.meta.email ? AuthMethod.EMAIL : AuthMethod.PHONE });

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        signIn: Object.assign({}, state.signIn, {
          signingIn: false,
          signedIn: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGN_IN):
      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.LOGIN_FAIL,
        signIn: Object.assign({}, state.signIn, {
          response: action.payload,
          signingIn: false,
          errored: true
        })
      });

    case AUTH_ACTION_TYPE.SIGN_IN_LOCAL: {
      return Object.assign({}, state, {
        userInfo: action.meta.user,
        profile: action.meta.user && Object.keys(action.meta.user).length ? action.meta.user : null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS
      });
    }

    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGN_IN_WITH_TOKEN):
      return Object.assign({}, state, {
        userInfo: null,
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN,
        isSignInWithTokenSuccess: false
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGN_IN_WITH_TOKEN): {
      const { user } = action.payload;
      identifyTiktokTracking(user);
      gatewayTrackSignin({ user });

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        isSignInWithTokenSuccess: true
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGN_IN_WITH_TOKEN):
      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.LOGIN_FAIL,
        isSignInWithTokenSuccess: false
      });

    /** Sign in Facebook */
    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGN_IN_FB):
      return Object.assign({}, state, {
        userInfo: null,
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGN_IN_FB): {
      const { user, new_user } = action.payload;
      identifyTiktokTracking(user);
      if (new_user) {
        gatewayTrackSignup({ user, method: AuthMethod.FACEBOOK });
      } else {
        gatewayTrackSignin({ user, method: AuthMethod.FACEBOOK });
      }

      user && !!action.payload.new_user && completeRegistrationFbTracking(user.name);

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGN_IN_FB):
      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.LOGIN_FAIL
      });

    /** Sign in with Apple ID */
    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGN_IN_WITH_APPLE_ID):
      return Object.assign({}, state, {
        userInfo: null,
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN,
        isWaitingAppleSignin: true
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGN_IN_WITH_APPLE_ID): {
      const { user, new_user } = action.payload;
      identifyTiktokTracking(user);
      if (new_user) {
        gatewayTrackSignup({ user, method: AuthMethod.APPLE });
      } else {
        gatewayTrackSignin({ user, method: AuthMethod.APPLE });
      }
      user && !!action.payload.new_user && completeRegistrationFbTracking(user.name);

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        isWaitingAppleSignin: false
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGN_IN_WITH_APPLE_ID):
      action.asyncDispatch(openAlertAction(ALERT_SIGN_IN_WITH_APPLE_ID_ERROR));
      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.LOGIN_FAIL,
        isWaitingAppleSignin: false
      });

    case AUTH_ACTION_TYPE.SET_APPLE_SIGNIN_STATE:
      return Object.assign({}, state, {
        isWaitingAppleSignin: (action.payload as any).isWaiting
      });

    /** Sign in with Google */
    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGNIN_WITH_GOOGLE):
      return Object.assign({}, state, {
        userInfo: null,
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN,
        isWaitingGoogleSignin: true
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGNIN_WITH_GOOGLE): {
      const { user, new_user } = action.payload;
      identifyTiktokTracking(user);
      if (new_user) {
        gatewayTrackSignup({ user, method: AuthMethod.GOOGLE });
      } else {
        gatewayTrackSignin({ user, method: AuthMethod.GOOGLE });
      }

      user && !!action.payload.new_user && completeRegistrationFbTracking(user.name);

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        isWaitingGoogleSignin: false
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGNIN_WITH_GOOGLE):
      action.asyncDispatch(openAlertAction(ALERT_SIGNIN_WITH_GOOGLE_ID_ERROR));
      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.LOGIN_FAIL,
        isWaitingGoogleSignin: false
      });

    /** Social account link */
    case PENDING_TYPE(AUTH_ACTION_TYPE.LINK_SOCIAL_ACCOUNT):
      return Object.assign({}, state, {
        socialLink: { provider: action.meta.provider, linking: true, linked: false, errored: false }
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.LINK_SOCIAL_ACCOUNT):
      return Object.assign({}, state, {
        userInfo: action.payload.user,
        profile: action.payload.user,
        socialLink: { provider: action.meta.provider, linking: false, linked: true, errored: false }
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.LINK_SOCIAL_ACCOUNT):
      return Object.assign({}, state, {
        socialLink: { provider: action.meta.provider, linking: false, linked: false, errored: action.payload.error }
      });

    /** Social account unlink */
    case PENDING_TYPE(AUTH_ACTION_TYPE.UNLINK_SOCIAL_ACCOUNT):
      return Object.assign({}, state, {
        socialUnlink: { provider: action.meta.provider, unlinking: true, unlinked: false, errored: false }
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.UNLINK_SOCIAL_ACCOUNT):
      return Object.assign({}, state, {
        userInfo: action.payload.user,
        profile: action.payload.user,
        socialUnlink: { provider: action.meta.provider, unlinking: false, unlinked: true, errored: false }
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.UNLINK_SOCIAL_ACCOUNT):
      return Object.assign({}, state, {
        socialUnlink: {
          provider: action.meta.provider,
          unlinking: false,
          unlinked: false,
          errored: action.payload.errored
        }
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.FAST_TRACK_REQUEST_OTP):
      return Object.assign({}, state, {
        fastTrackOtpRequest: Object.assign(
          {},
          state.fastTrackOtpRequest,
          {
            otpExpiresIn: null,
            requesting: true,
            requested: false,
            errored: false
          },
          action.meta.phone && { lastPhone: action.meta.phone },
          action.meta.email && { lastEmail: action.meta.email }
        )
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.FAST_TRACK_REQUEST_OTP):
      return Object.assign(
        {},
        state,
        {
          fastTrackOtpRequest: Object.assign(
            {},
            state.fastTrackOtpRequest,
            {
              requesting: false,
              requested: true,
              errored: false
            },
            action.payload.otp_expire_in && { otpExpiresIn: action.payload.otp_expire_in }
          )
        },
        action.payload.user && {
          userInfo: action.payload.user,
          profile: action.payload.user,
          errorMessage: '',
          signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS
        }
      );

    case REJECTED_TYPE(AUTH_ACTION_TYPE.FAST_TRACK_REQUEST_OTP):
      return Object.assign({}, state, {
        fastTrackOtpRequest: Object.assign({}, state.fastTrackOtpRequest, {
          requesting: false,
          errored: true,
          error: action.payload.error || action.payload.errors
        })
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.FAST_TRACK_VERIFY_OTP):
      return Object.assign({}, state, {
        fastTrackOtpVerify: Object.assign(
          {},
          state.fastTrackOtpVerify,
          {
            lastOtp: action.meta.otp,
            verifying: true,
            verified: false,
            errored: false
          },
          action.meta.phone && { lastPhone: action.meta.phone },
          action.meta.email && { lastEmail: action.meta.email }
        )
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.FAST_TRACK_VERIFY_OTP):
      return Object.assign(
        {},
        state,
        {
          fastTrackOtpVerify: Object.assign({}, state.fastTrackOtpVerify, {
            verifying: false,
            verified: true,
            errored: false
          })
        },
        action.payload.user && {
          userInfo: action.payload.user,
          profile: action.payload.user,
          errorMessage: '',
          signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS
        }
      );

    case REJECTED_TYPE(AUTH_ACTION_TYPE.FAST_TRACK_VERIFY_OTP):
      return Object.assign({}, state, {
        fastTrackOtpVerify: Object.assign({}, state.fastTrackOtpVerify, {
          verifying: false,
          errored: true,
          error: action.payload.error || action.payload.errors
        })
      });

    case AUTH_ACTION_TYPE.SET_GOOGLE_SIGNIN_STATE:
      return Object.assign({}, state, {
        isWaitingGoogleSignin: (action.payload as any).isWaiting
      });

    case AUTH_ACTION_TYPE.SET_FACEBOOK_SIGNIN_STATE:
      return Object.assign({}, state, {
        isWaitingFacebookSignin: (action.payload as any).isWaiting
      });

    /** Sign out */
    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGN_OUT):
      try {
        // WARNING: `state.profile || null` ensures that `undefined` is not being stringified as a parse attempt will result in an error
        localStorage.setItem(storageKey.MOE_SIGNOUT_TRACKING_INFO, JSON.stringify(state.profile || null));
      } catch (e) {}

      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: '',
        isBecomeTo: false,
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGN_OUT): {
      try {
        action.meta &&
          action.meta.alertOnSignout &&
          sessionStorage.setItem(storageKey.DUE_ALERT, JSON.stringify(action.meta.alertOnSignout));
        setTimeout(() => {
          // TODO: Temporary. Remove reload after fixing initial search focus issue
          window.location.reload();
        }, 1000);
      } catch (e) {}
      action.asyncDispatch(resetReduxAction());

      // TODO: set the key into constants/application/client-storage
      [
        'openCountFromLastLogin',
        'lastShownTime',
        'phoneOtpModalOpenCountFromLastLogin',
        'phoneOtpModalLastShownTime',
        storageKey.HAS_VIEW_PRODUCT_VARIANT,
        storageKey.HAS_SHOW_BIRTHDAY_MODAL
      ].forEach((storageKey) => localStorage.removeItem(storageKey));

      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGN_OUT):
      localStorage.removeItem(storageKey.MOE_SIGNOUT_TRACKING_INFO);

      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });

    case AUTH_ACTION_TYPE.CLEANUP_SESSION: {
      try {
        action.meta &&
          action.meta.alertOnSignout &&
          sessionStorage.setItem(storageKey.DUE_ALERT, JSON.stringify(action.meta.alertOnSignout));
        setTimeout(() => {
          // Waits until some other already scheduled async api events with invalid auth state are dispatched
          // TODO: when authentication state changes to unauthenticated, need a way to abort authenticated api calls that were dispatched after a timeout
          sessionStorage.removeItem(storageKey.LOGOUT_401_IN_PROGRESS);
          // TODO: Temporary. Remove reload after fixing initial search focus issue
          // window.location.reload();
        }, 1000);
      } catch (e) {}

      return Object.assign({}, state, {
        userInfo: {},
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });
    }

    /** Sign up */
    case PENDING_TYPE(AUTH_ACTION_TYPE.SIGN_UP):
      return Object.assign({}, state, {
        signUp: Object.assign({}, state.signUp, {
          signingUp: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.SIGN_UP): {
      const { user } = action.payload;
      identifyTiktokTracking(user);
      gatewayTrackSignup({ user, method: action.meta.email ? AuthMethod.EMAIL : AuthMethod.PHONE });
      user && completeRegistrationFbTracking(user.name);
      trackingTiktokPixel('Registration');

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        isBecomeTo: false,
        signUp: Object.assign({}, state.signUp, {
          signingUp: false,
          signedUp: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.SIGN_UP):
      return Object.assign({}, state, {
        isBecomeTo: false,
        signUp: Object.assign({}, state.signUp, {
          response: action.payload,
          signingUp: false,
          errored: true
        })
      });

    /** Fetch user profile */
    case PENDING_TYPE(AUTH_ACTION_TYPE.FETCH_USER_PROFILE):
      return state;

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.FETCH_USER_PROFILE):
      action.payload.user && identifyTiktokTracking(action.payload.user);

      return Object.assign({}, state, {
        userInfo: action.payload.user,
        profile: action.payload.user,
        originalUser: action.payload.original_user,
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        isBecomeTo: null !== action.payload.original_user
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.FETCH_USER_PROFILE):
      return state;

    /** Change avatar of user */
    case PENDING_TYPE(AUTH_ACTION_TYPE.CHANGE_AVATAR_USER):
      return Object.assign({}, state, {
        isChangedAvatarSuccess: false,
        isChangingAvatar: true,
        isWaitingAvatarPassword: true
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.CHANGE_AVATAR_USER):
      return Object.assign({}, state, {
        userInfo: action.payload.user,
        profile: action.payload.user,
        isChangedAvatarSuccess: true,
        isChangingAvatar: false,
        isWaitingAvatarPassword: false
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.CHANGE_AVATAR_USER): {
      dispatchApiError({ action });

      return Object.assign({}, state, {
        isChangedAvatarSuccess: false,
        isChangingAvatar: false,
        isWaitingAvatarPassword: false
      });
    }

    /** Edit user profile */
    case PENDING_TYPE(AUTH_ACTION_TYPE.EDIT_USER_PROFILE):
      return Object.assign({}, state, {
        isWaitingChangeProfile: true,
        isChangedProfileSuccess: false
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.EDIT_USER_PROFILE):
      gatewayTrackUpdateProfile(action.meta.data);

      return Object.assign({}, state, {
        userInfo: action.payload.user,
        profile: action.payload.user,
        isWaitingChangeProfile: false,
        isChangedProfileSuccess: true
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.EDIT_USER_PROFILE):
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
        isWaitingChangeProfile: false,
        isChangedProfileSuccess: false
      });

    /** Forgot password */
    case PENDING_TYPE(AUTH_ACTION_TYPE.FORGOT_PASSWORD):
      return Object.assign({}, state, {
        isForgotPasswordSuccess: false,
        isWaitingForgotPassword: true
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.FORGOT_PASSWORD):
      return Object.assign({}, state, {
        isForgotPasswordSuccess: true,
        isWaitingForgotPassword: false
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.FORGOT_PASSWORD):
      return Object.assign({}, state, {
        isForgotPasswordSuccess: false,
        isWaitingForgotPassword: false
      });

    /** Reset password */
    case PENDING_TYPE(AUTH_ACTION_TYPE.RESET_PASSWORD):
      return Object.assign({}, state, {
        isChangedPasswordSuccess: false,
        isWaitingChangePassword: true
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.RESET_PASSWORD): {
      const { user } = action.payload;
      identifyTiktokTracking(user);
      gatewayTrackSignin({ user });

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        isChangedPasswordSuccess: true,
        isWaitingChangePassword: false,
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.RESET_PASSWORD):
      action.asyncDispatch(openAlertAction(ALERT_RESET_PASSWORD_ERROR));

      return Object.assign({}, state, {
        isChangedPasswordSuccess: false,
        isWaitingChangePassword: true
      });

    /** Reset password with OTP */
    case PENDING_TYPE(AUTH_ACTION_TYPE.RESET_PASSWORD_WITH_OTP):
      return Object.assign({}, state, {
        isWaitingResetPasswordOtp: true,
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.RESET_PASSWORD_WITH_OTP): {
      const { user } = action.payload;
      identifyTiktokTracking(user);
      gatewayTrackSignin({ user });

      action.asyncDispatch(clearPasswordOtpStatusAction());

      return Object.assign({}, state, {
        userInfo: user,
        profile: user,
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        isWaitingResetPasswordOtp: false
      });
    }

    case REJECTED_TYPE(AUTH_ACTION_TYPE.RESET_PASSWORD_WITH_OTP):
      return Object.assign({}, state, {
        isWaitingResetPasswordOtp: false,
        signInStatus: SIGN_IN_STATE.NO_LOGIN
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION_OTP):
      return Object.assign({}, state, {
        emailVerificationOtpRequest: Object.assign({}, state.emailVerificationOtpRequest, {
          requesting: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION_OTP):
      return Object.assign({}, state, {
        emailVerificationOtpRequest: Object.assign({}, state.emailVerificationOtpRequest, {
          response: action.payload,
          requesting: false,
          requested: true,
          errored: false
        })
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.REQUEST_EMAIL_VERIFICATION_OTP):
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
        emailVerificationOtpRequest: Object.assign({}, state.emailVerificationOtpRequest, {
          requesting: false,
          errored: true
        })
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.REQUEST_PHONE_VERIFICATION_OTP):
      return Object.assign({}, state, {
        phoneVerificationOtpRequest: Object.assign({}, state.phoneVerificationOtpRequest, {
          requesting: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.REQUEST_PHONE_VERIFICATION_OTP):
      return Object.assign({}, state, {
        phoneVerificationOtpRequest: Object.assign({}, state.phoneVerificationOtpRequest, {
          response: action.payload,
          requesting: false,
          requested: true,
          errored: false
        })
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.REQUEST_PHONE_VERIFICATION_OTP):
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
        phoneVerificationOtpRequest: Object.assign({}, state.phoneVerificationOtpRequest, {
          requesting: false,
          errored: true
        })
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.REQUEST_OTP):
      return Object.assign({}, state, {
        otpRequest: Object.assign({}, state.otpRequest, {
          [toCamel(action.meta.requestType)]: {
            requesting: true,
            errored: false
          }
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.REQUEST_OTP):
      return Object.assign({}, state, {
        otpRequest: Object.assign({}, state.otpRequest, {
          [toCamel(action.meta.requestType)]: {
            response: action.payload,
            requesting: false,
            requested: true,
            errored: false
          }
        })
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.REQUEST_OTP):
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
        otpRequest: Object.assign({}, state.otpRequest, {
          [toCamel(action.meta.requestType)]: {
            response: action.payload,
            requesting: false,
            errored: true
          }
        })
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.ATTACH_PHONE):
      return Object.assign({}, state, {
        userInfo: null,
        profile: null,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.NO_LOGIN,
        attachPhone: Object.assign({}, state.attachPhone, {
          attaching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.ATTACH_PHONE):
      return Object.assign({}, state, {
        userInfo: action.payload?.user,
        profile: action.payload?.user,
        errorMessage: '',
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS,
        attachPhone: Object.assign({}, state.attachPhone, {
          response: action.payload,
          attaching: false,
          attached: true,
          errored: false
        })
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.ATTACH_PHONE):
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
        userInfo: {},
        profile: null,
        errorMessage: formatErrorMessage(action.payload.error || action.payload.errors),
        signInStatus: SIGN_IN_STATE.LOGIN_FAIL,
        attachPhone: Object.assign({}, state.attachPhone, {
          response: action.payload,
          attaching: false,
          errored: true
        })
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.GET_EMAIL_VERIFICATION):
      return Object.assign({}, state, {
        getEmailVerificationRequest: Object.assign({}, state.getEmailVerificationRequest, {
          requesting: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.GET_EMAIL_VERIFICATION):
      return Object.assign({}, state, {
        getEmailVerificationRequest: Object.assign({}, state.getEmailVerificationRequest, {
          response: action.payload,
          requesting: false,
          requested: true,
          errored: false
        })
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.GET_EMAIL_VERIFICATION):
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
        getEmailVerificationRequest: Object.assign({}, state.getEmailVerificationRequest, {
          requesting: false,
          errored: true
        })
      });

    case PENDING_TYPE(AUTH_ACTION_TYPE.UPDATE_PASSWORD_BY_OTP):
      return Object.assign({}, state, {
        updatePasswordByOtp: Object.assign({}, state.updatePasswordByOtp, {
          updating: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.UPDATE_PASSWORD_BY_OTP):
      return Object.assign({}, state, {
        updatePasswordByOtp: Object.assign({}, state.updatePasswordByOtp, {
          response: action.payload,
          updating: false,
          updated: true,
          errored: false
        })
      });

    case REJECTED_TYPE(AUTH_ACTION_TYPE.UPDATE_PASSWORD_BY_OTP):
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
        updatePasswordByOtp: Object.assign({}, state.updatePasswordByOtp, {
          updating: false,
          errored: true
        })
      });

    case AUTH_ACTION_TYPE.CLEAR_AUTH_STORE:
      return Object.assign({}, state, INITIAL_STATE_AUTH);

    case FULFILLED_TYPE(AUTH_ACTION_TYPE.BACK_TO_ADMIN):
      action.asyncDispatch(clearCartAction());
      action.asyncDispatch(clearDeliveryConfigAction());
      action.asyncDispatch(fetchUserProfileAction());
      setTimeout(() => window.location.reload(), 3000);
      return state;

    default:
      return state;
  }
};

export default authReducer;
