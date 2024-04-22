import { User } from 'types/api/auth';
import { RequestOtpSuccessResponse, RequestOtpFailureResponse } from 'api/types';
import { SIGN_IN_STATE } from 'constants/application/global';

export interface AuthStateOtpRequestState {
  response: RequestOtpSuccessResponse | RequestOtpFailureResponse;
  requesting: boolean;
  requested: boolean;
  errored: boolean;
}

export interface AttachPhoneSuccessResponse {
  success: true;
  user: User;
}
export interface AttachPhoneFailureResponse {
  reason: string;
  error: string;
}

export interface SignUpSuccessResponse {
  success: true;
  user: User;
}

export interface SignUpFailureResponse {
  reason: string;
  error: string;
}

export type SignInSuccessResponse = SignUpSuccessResponse;
export type SignInFailureResponse = SignUpFailureResponse;

export interface AuthState {
  errorMessage: string;
  /**
   * @deprecated Use `auth.profile` instead (deprecation reason: default state is `{}` which requires additional empty object check before accessing properties)
   */
  userInfo?: User;
  profile?: User;
  signInStatus: (typeof SIGN_IN_STATE)[keyof typeof SIGN_IN_STATE];

  otpRequest: {
    verifyPhone: AuthStateOtpRequestState;
    verifyEmail: AuthStateOtpRequestState;
    changePassword: AuthStateOtpRequestState;
    forgotPassword: AuthStateOtpRequestState;
    phoneSignupVerify: AuthStateOtpRequestState;
    phoneLoginVerify: AuthStateOtpRequestState;
  };

  fastTrackOtpRequest: {
    otpExpiresIn: number;
    lastPhone: string;
    lastEmail: string;
    requesting: boolean;
    requested: boolean;
    errored: boolean;
    error: string | [string] | null;
  };

  fastTrackOtpVerify: {
    lastPhone: string;
    lastEmail: string;
    lastOtp: string;
    verifying: boolean;
    verified: boolean;
    errored: boolean;
    error: string | [string] | null;
  };

  attachPhone: {
    response: AttachPhoneSuccessResponse | AttachPhoneFailureResponse;
    attaching: boolean;
    attached: boolean;
    errored: boolean;
  };

  signUp: {
    response: SignUpSuccessResponse | SignUpFailureResponse;
    signingUp: boolean;
    signedUp: boolean;
    errored: boolean;
  };

  signIn: {
    response: SignInSuccessResponse | SignInFailureResponse;
    signingIn: boolean;
    signedIn: boolean;
    errored: boolean;
  };

  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
