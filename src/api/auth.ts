import { getCsrfToken } from '../utils/auth';
import { get, post, del, patch } from '../config/restful-method';

export interface ISignInParams {
  email?: string;
  phone?: string;
  password: string;
}

export const signIn = ({ email, phone, password }: ISignInParams) =>
  post({
    path: '/sessions',
    data: Object.assign({}, { password, platform: 'web' }, email && { email }, phone && { phone }),
    description: '[Auth] Sign in with email or phone and password /sessions',
    errorMesssage: `Can't Sign in. Please try again`
  });

export const signInWithToken = ({ accessToken }) =>
  post({
    path: `/sessions/${accessToken}`,
    data: {},
    description: '[Auth] Sign in with token /sessions',
    errorMesssage: `Can't Sign in. Please try again`
  });

export interface SignInFBApiParams {
  authorizationCode: string;
  redirectUri: string;
  referralCode?: string;
}
export const signInFBApi = ({ authorizationCode, redirectUri, referralCode }: SignInFBApiParams) =>
  post({
    path: '/sessions/facebook',
    data: { authorization_code: authorizationCode, redirect_uri: redirectUri, referral_code: referralCode },
    description: '[Auth] Sign in with facebook /sessions/facebook',
    errorMesssage: `Can't Sign in. Please try again`
  });

export const signInWithAppleID = (
  authCode: string,
  user?: { name?: { firstName: string; lastName: string }; email: string }
) => {
  return post({
    path: '/sessions/apple',
    data: Object.assign(
      {},
      { auth_code: authCode },
      user && {
        first_name: user.name ? user.name.firstName : '',
        last_name: user.name ? user.name.lastName : '',
        email: user.email
      }
    ),
    description: '[Auth] Sign in with Apple id /sessions/apple',
    errorMesssage: `Can't Sign in. Please try again`
  });
};

export interface SigninWithGoogleApiParams {
  token: string;
  accessToken: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  email?: string;
}
export const signinWithGoogleApi = ({
  token,
  accessToken,
  firstName,
  lastName,
  imageUrl,
  email
}: SigninWithGoogleApiParams) => {
  return post({
    path: '/sessions/google',
    data: Object.assign(
      { token, access_token: accessToken },
      firstName && { first_name: firstName },
      lastName && { last_name: lastName },
      imageUrl && { image_url: imageUrl },
      email && { email }
    ),
    description: '[Auth] Signin with Google /sessions/google',
    errorMesssage: `Can't Sign in. Please try again`
  });
};

/** Fetch user profile */
export const fetchUserProfileApi = () =>
  get({
    path: `/user/profile`,
    description: '[User] Fetch user profile /user/profile',
    errorMesssage: `Can't fetch user profile. Please try again`
  });

interface LinkSocialAccountFacebookParams {
  token: string;
  provider: 'facebook';
  redirectUri: string;
}
interface LinkSocialAccountGoogleAndAppleParams {
  token: string;
  provider: 'google' | 'apple';
}
export type LinkSocialAccountApiParams = LinkSocialAccountFacebookParams | LinkSocialAccountGoogleAndAppleParams;
export const linkSocialAccount = (params: LinkSocialAccountApiParams) => {
  let _params: any = params;
  if (params.provider === 'facebook') {
    const { redirectUri, ...otherParams } = params as LinkSocialAccountFacebookParams;
    _params = { redirect_uri: redirectUri, ...otherParams };
  }

  return post({
    path: '/user/link',
    data: _params,
    description: '[Auth] Link social acount /user/link',
    errorMesssage: `Can't link ${params.provider}. Please try again`
  });
};

interface UnlinkSocialAccountParams {
  provider: 'facebook' | 'apple' | 'google';
}
export const unlinkSocialAccount = ({ provider }: UnlinkSocialAccountParams) => {
  return post({
    path: '/user/unlink',
    data: { provider },
    description: '[Auth] Unink social acount /user/unlink',
    errorMesssage: `Can't unlink ${provider}. Please try again`
  });
};

export const signOut = () => {
  const csrf_token = getCsrfToken();
  const query = `?csrf_token=${csrf_token}`;

  return del({
    path: `/sessions${query}`,
    description: '[Auth] Sign out /sessions',
    errorMesssage: `Can't Sign out. Please try again`
  });
};

export const changeAvatarUser = ({ avatar }) => {
  return post({
    path: `/user/change_avatar`,
    data: {
      csrf_token: getCsrfToken(),
      avatar: avatar
    },
    description: '[Auth] Change user avatar /user/change_avatar',
    errorMesssage: `Can't change avatar. Please try again`
  });
};

export interface IEditUserProfileParam {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  phone?: string;
  gender?: number;
}

export const editUserProfile = ({ firstName, lastName, birthday, phone, gender }: IEditUserProfileParam) => {
  const query =
    `?csrf_token=${getCsrfToken()}` +
    (undefined !== firstName ? `&first_name=${firstName}` : '') +
    (undefined !== lastName ? `&last_name=${lastName}` : '') +
    (birthday ? `&birthday=${birthday}` : '') +
    (undefined !== phone ? `&phone=${phone}` : '') +
    (undefined !== gender ? `&gender=${gender}` : '');

  return patch({
    path: `/user/profile${query}`,
    description: '[Auth] Edit user profile /user/profile',
    errorMesssage: `Can't edit user profile. Please try again`
  });
};

export interface ISignUpApiParams {
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
  phone?: string;
  uid?: string;
  facebookToken?: string;
  referralCode?: string;
  utmId?: number;
  otp?: string;
}

export const signUp = ({
  firstName,
  lastName,
  password,
  email,
  phone,
  uid,
  facebookToken,
  referralCode,
  utmId,
  otp
}: ISignUpApiParams) =>
  post({
    path: '/registrations',
    data: Object.assign(
      {},
      {
        csrf_token: getCsrfToken(),
        first_name: firstName,
        last_name: lastName,
        password
      },
      email && { email },
      phone && { phone },
      uid && { uid },
      facebookToken && { facebook_token: facebookToken },
      referralCode && { referral_code: referralCode },
      utmId && { utm_id: utmId },
      otp && { otp }
    ),
    description: '[Auth] Sign up /registrations',
    errorMesssage: `Can't Sign up. Please try again`
  });

export const forgotPassword = ({ email }) => {
  return post({
    path: `/passwords`,
    data: {
      csrf_token: getCsrfToken(),
      email: email
    },
    description: '[Auth] Forgot password /passwords',
    errorMesssage: `Can't forgot password. Please try again`
  });
};

export interface FastTrackRequestOtpApiParams {
  email?: string;
  phone?: string;
}
/**
 * If an email is provided that doesn't exist in the system, the API will return 200, an account will be created and a session will be returned.
 * Else, an OTP will be sent to the email/phone.
 */
export const fastTrackRequestOtpApi = ({ email, phone }: FastTrackRequestOtpApiParams) => {
  return post({
    path: `/auth/otps`,
    data: Object.assign(
      {},
      {
        csrf_token: getCsrfToken()
      },
      email && { email },
      phone && { phone }
    ),
    description: '[Auth] Fast track request OTP /auth/otps',
    errorMesssage: `Can't request OTP. Please try again`
  });
};

export interface FastTrackVerifyOtpApiParams {
  email?: string;
  phone?: string;
  otp: string;
}
/**
 * If verification is successful, a session will be returned.
 */
export const fastTrackVerifyOtpApi = ({ email, phone, otp }: FastTrackVerifyOtpApiParams) => {
  return post({
    path: `/auth/sessions`,
    data: Object.assign(
      {},
      {
        csrf_token: getCsrfToken(),
        otp
      },
      email && { email },
      phone && { phone }
    ),
    description: '[Auth] Fast track verify OTP /auth/sessions',
    errorMesssage: `Can't verify OTP. Please try again`
  });
};

export const resetPassword = ({ password, resetPasswordToken }) => {
  const query =
    `?csrf_token=${getCsrfToken()}` +
    `&password=${password}` +
    `&password_confirmation=${password}` +
    `&reset_password_token=${resetPasswordToken}`;

  return patch({
    path: `/passwords${query}`,
    description: '[Auth] Reset password /passwords',
    errorMesssage: `Can't reset password. Please try again`
  });
};

export const backToAdmin = () =>
  post({
    path: '/sessions/back_to_admin',
    data: { csrf_token: getCsrfToken() },
    description: '[Auth] Back to admin /sessions/back_to_admin',
    errorMesssage: `Can't back to admin. Please try again`
  });

export type ResetPasswordByOtpApiParams = {
  password: string;
  otp: string;
} & ({ email: string } | { phone: string });
export const resetPasswordByOtpApi = (params: ResetPasswordByOtpApiParams) =>
  patch({
    path: `/passwords/otp`,
    data: params,
    description: '[User] Reset passwords',
    errorMesssage: `Can't reset password. Please try again`
  });

export const requestEmailVerificationOtp = ({ email }) =>
  post({
    path: `/user/request_otp`,
    data: { email },
    description: '[User] Request email verification OTP',
    errorMesssage: `Can't request email verification OTP. Please try again`
  });

export const getEmailVerification = () =>
  get({
    path: `/user/request_verification`,
    description: '[User] Get email verification',
    errorMesssage: `Can't get email verification. Please try again`
  });

export type RequestOtpApiRequestType =
  | 'verify_phone'
  | 'verify_email'
  | 'forgot_password'
  | 'change_password'
  | 'phone_signup_verify'
  | 'phone_login_verify';
export interface RequestOtpApiParams {
  email?: string;
  phone?: string;
  requestType: RequestOtpApiRequestType;
}
export const requestOtpApi = ({ email, phone, requestType }: RequestOtpApiParams) =>
  post({
    path: `/otps`,
    data: Object.assign({}, { request_type: requestType }, email && { email }, phone && { phone }),
    description: 'Request OTP',
    errorMesssage: `Can't request OTP. Please try again`
  });

interface UpdatePasswordByOTPApiWithEmailParams {
  email: string;
}
interface UpdatePasswordByOTPApiWithPhoneParams {
  phone: string;
}
export type UpdatePasswordByOTPApiParams = {
  otp: string;
  password: string;
} & (UpdatePasswordByOTPApiWithEmailParams | UpdatePasswordByOTPApiWithPhoneParams);
export const updatePasswordByOTP = ({ otp, password, ...otherParams }: UpdatePasswordByOTPApiParams) =>
  patch({
    path: `/user/change_password`,
    data: Object.assign(
      {},
      { otp, password },
      (otherParams as UpdatePasswordByOTPApiWithEmailParams).email && {
        email: (otherParams as UpdatePasswordByOTPApiWithEmailParams).email
      },
      (otherParams as UpdatePasswordByOTPApiWithPhoneParams).phone && {
        phone: (otherParams as UpdatePasswordByOTPApiWithPhoneParams).phone
      }
    ),
    description: '[User] User update password by OTP `/user/change_password',
    errorMesssage: `Can't update password by OTP. Please try again`
  });

interface AttachPhoneApiWithEmailParams {
  email: string;
}
interface AttachPhoneApiWithSocialParams {
  providerToken: string;
  provider: 'facebook' | 'google' | 'apple';
  redirectUri?: string;
}
export type AttachPhoneApiParams = {
  phone: string;
  otp: string;
  password: string;
} & (AttachPhoneApiWithEmailParams | AttachPhoneApiWithSocialParams);
export const attachPhoneApi = ({ phone, otp, password, ...otherParams }: AttachPhoneApiParams) =>
  post({
    path: `/auth/attach_phone`,
    data: Object.assign(
      {},
      { phone, otp, password },
      (otherParams as AttachPhoneApiWithEmailParams).email && {
        email: (otherParams as AttachPhoneApiWithEmailParams).email
      },
      (otherParams as AttachPhoneApiWithSocialParams).providerToken && {
        provider_token: (otherParams as AttachPhoneApiWithSocialParams).providerToken
      },
      (otherParams as AttachPhoneApiWithSocialParams).provider && {
        provider: (otherParams as AttachPhoneApiWithSocialParams).provider
      },
      (otherParams as AttachPhoneApiWithSocialParams).redirectUri && {
        redirect_uri: (otherParams as AttachPhoneApiWithSocialParams).redirectUri
      }
    ),
    description: '[User] Attach phone',
    errorMesssage: `Can't attach phone. Please try again`
  });
