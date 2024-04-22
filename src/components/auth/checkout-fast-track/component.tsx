import { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { ROUTING_SHOP_INDEX } from 'routings/path';
import { SIGN_IN_STATE } from 'constants/application/global';
import { auth } from 'utils/auth';
import { isEmptyKeyObject, getPhoneOrEmail } from 'utils/validate';
import { usePrevious } from 'utils/hook';
import { ALERT_SIGN_IN_WITH_APPLE_ID_ERROR } from 'constants/application/alert';
import { IProps, Phase } from './model';
import View from './view';

const parseError = (error: string | [string] | null): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (Array.isArray(error) && error.length > 0) {
    return error[0];
  }
  return '';
};

declare global {
  interface Window {
    callbackLoginFb: any;
  }
}

const CheckoutFastTrack = ({
  authStore: { signInStatus, fastTrackOtpRequest, fastTrackOtpVerify, isWaitingAppleSignin },
  userStore: { userReferrerProfile },
  signInFBAction,
  getCartAction,
  fetchUserReferrerProfileAction,
  fetchConstantsAction,
  fastTrackRequestOtpAction,
  fastTrackVerifyOtpAction,
  openAlertAction,

  // Own props
  classes,
  style,
  onFastTrackSuccess,
  onFastTrackFailure,
  onLogin,
  referrer: _referrer
}: IProps) => {
  const history = useHistory();
  const location = useLocation<{ referrer: string }>();
  const params = useParams<{ referalCode: string }>();
  const referrer = _referrer || location.state?.referrer || '';
  const [phase, setPhase] = useState(Phase.Initial);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const wasWaitingAppleSignin = usePrevious(isWaitingAppleSignin);
  useEffect(() => {
    if (wasWaitingAppleSignin && !isWaitingAppleSignin) {
      if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
        getCartAction();
        onFastTrackSuccess?.({ referrer });
      } else {
        onFastTrackFailure?.({ phase: Phase.Initial });
        openAlertAction(ALERT_SIGN_IN_WITH_APPLE_ID_ERROR);
      }
    }
  }, [
    isWaitingAppleSignin,
    wasWaitingAppleSignin,
    signInStatus,
    onFastTrackSuccess,
    onFastTrackFailure,
    getCartAction,
    referrer
  ]);

  useEffect(() => {
    auth.loggedIn() && history.push(ROUTING_SHOP_INDEX);

    !isEmptyKeyObject(params, 'referalCode') && fetchUserReferrerProfileAction({ referrerProfile: params.referalCode });

    window.callbackLoginFb = (response: any) => {
      if ('connected' === response.status) {
        signInFBAction({
          authorizationCode: response.authResponse.accessToken,
          redirectUri: process.env.REACT_APP_FACEBOOK_SIGNIN_REDIRECT_URI,
          referralCode: ''
        });
      }
    };

    fetchConstantsAction();
  }, []);

  const isFastTrackOtpRequesting = fastTrackOtpRequest.requesting;
  const wasFastTrackOtpRequesting = usePrevious(isFastTrackOtpRequesting);
  const isFastTrackOtpVerifying = fastTrackOtpVerify.verifying;
  const wasFastTrackOtpVerifying = usePrevious(isFastTrackOtpVerifying);
  useEffect(() => {
    if (phase === Phase.Initial) {
      if (wasFastTrackOtpRequesting && !isFastTrackOtpRequesting) {
        setLoading(false);

        if (fastTrackOtpRequest.errored) {
          setPhase(Phase.Initial);
          setErrorMessage(parseError(fastTrackOtpRequest.error));
          onFastTrackFailure?.({ phase: Phase.Initial });
        } else {
          if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
            getCartAction();
            onFastTrackSuccess?.({ referrer });
          } else {
            setPhase(Phase.OTPRequested);
          }
        }
      }
    } else {
      if (wasFastTrackOtpVerifying && !isFastTrackOtpVerifying) {
        setLoading(false);
        if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
          getCartAction();
          onFastTrackSuccess?.({ referrer });
        } else {
          onFastTrackFailure?.({ phase: Phase.OTPRequested });
          setErrorMessage(parseError(fastTrackOtpVerify.error));
        }
      }
    }
  }, [isFastTrackOtpRequesting, wasFastTrackOtpRequesting, wasFastTrackOtpVerifying, phase, signInStatus]);

  const handleInputOnFocus = () => {
    setErrorMessage('');
  };

  const handleSubmit = ({ phoneOrEmail, otp }) => {
    setLoading(true);
    setErrorMessage('');
    const [phone, email] = getPhoneOrEmail(phoneOrEmail);
    phase === Phase.Initial
      ? fastTrackRequestOtpAction(Object.assign({}, email && { email }, phone && { phone }))
      : fastTrackVerifyOtpAction(Object.assign({}, email && { email }, phone && { phone }, { otp }));
  };

  return (
    <View
      {...{
        phase,
        loading,
        classes,
        style,
        userReferrerProfile,
        onLogin,
        errorMessage,
        referrer,
        handleInputOnFocus,
        handleSubmit
      }}
    />
  );
};

export default CheckoutFastTrack;
