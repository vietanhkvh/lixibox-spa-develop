import { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams, generatePath } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom-v5-compat';
import { ROUTING_AUTH_PHONE_REGISTERED, ROUTING_AUTH_VERIFY_PHONE, ROUTING_SHOP_INDEX } from 'routings/path';
import { SIGN_IN_STATE } from 'constants/application/global';
import { auth } from 'utils/auth';
import { isEmptyKeyObject, getFirstName, getLastName, getPhoneOrEmail } from 'utils/validate';
import { usePrevious } from 'utils/hook';
import { SignUpFailureResponse } from 'flows/auth/types';
import { ALERT_SIGN_UP_ERROR } from 'constants/application/alert';
import { storageKey } from 'constants/application/client-storage';
import { IProps } from './model';
import View from './view';

declare global {
  interface Window {
    callbackLoginFb: any;
  }
}

const Signup = ({
  authStore: { signInStatus, signUp },
  userStore: { userReferrerProfile },
  trackingStore: { utmId },
  signUpAction,
  requestOtpAction,
  signInFBAction,
  openAlertAction,
  getCartAction,
  fetchUserReferrerProfileAction,
  fetchConstantsAction,

  // Own props
  phone,
  classes,
  style,
  isOnModal,
  onSignupSuccess,
  onSignupFailure,
  onLogin,
  referrer: _referrer
}: IProps) => {
  const history = useHistory();
  const location = useLocation<{ referrer: string }>();
  const params = useParams<{ referalCode: string }>();
  const [searchParams] = useSearchParams();
  const referrer = _referrer || location.state?.referrer || '';
  const derivedPhone = phone || searchParams.get('phone') || '';
  const [errorMessage, setErrorMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [credentialsToVerify, setCredentialsToVerify] = useState<{ phone: string; fullName: string; password: string }>(
    { phone: '', fullName: '', password: '' }
  );
  useEffect(() => {
    localStorage.removeItem(storageKey.SIGNUP_CREDENTIALS_TO_VERIFY);
    auth.loggedIn() && !isOnModal && history.push(ROUTING_SHOP_INDEX);

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

  const wasWaitingSignUp = usePrevious(signUp.signingUp);
  useEffect(() => {
    if (wasWaitingSignUp && !signUp.signingUp) {
      setSubmitLoading(false);

      if (signUp.signedUp) {
        if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
          !isOnModal && history.push(referrer || ROUTING_SHOP_INDEX);
          getCartAction();
        }
        onSignupSuccess?.({ referrer });
      } else {
        const errorReason = (signUp.response as SignUpFailureResponse)?.reason;
        const errorMessage = (signUp.response as SignUpFailureResponse)?.error || '';
        if (
          ['phone_not_exists', 'verified_phone_exists', 'unverified_phone_exists'].includes(errorReason) &&
          credentialsToVerify.phone
        ) {
          localStorage.setItem(storageKey.SIGNUP_CREDENTIALS_TO_VERIFY, JSON.stringify(credentialsToVerify));
          if (errorReason === 'phone_not_exists') {
            requestOtpAction({ phone: credentialsToVerify.phone, requestType: 'phone_signup_verify' });
            !isOnModal && history.push(generatePath(ROUTING_AUTH_VERIFY_PHONE, { phone: credentialsToVerify.phone }));
            onSignupFailure?.({ reason: errorReason, phone: credentialsToVerify.phone });
          } else {
            !isOnModal &&
              history.push(
                generatePath(ROUTING_AUTH_PHONE_REGISTERED, { phone: credentialsToVerify.phone }),
                errorReason === 'verified_phone_exists' ? { status: 'verified' } : { status: 'unverified' }
              );
            onSignupFailure?.({
              reason: errorReason,
              phone: credentialsToVerify.phone,
              status: errorReason === 'verified_phone_exists' ? 'verified' : 'unverified'
            });
          }
        } else {
          if (errorMessage) {
            setErrorMessage(errorMessage);
            openAlertAction(ALERT_SIGN_UP_ERROR(errorMessage));
          }
          onSignupFailure?.();
        }
      }
    }
  }, [signUp.signingUp, wasWaitingSignUp, signUp.signedUp, signUp.response, credentialsToVerify, isOnModal, referrer]);

  const handleInputOnFocus = () => {
    setErrorMessage('');
  };

  const handleSubmit = ({ fullname, phoneOrEmail, password }) => {
    const [phone, email] = getPhoneOrEmail(phoneOrEmail);
    phone && setCredentialsToVerify({ phone, fullName: fullname, password });
    setSubmitLoading(true);
    signUpAction(
      Object.assign(
        {},
        {
          firstName: getFirstName(fullname),
          lastName: getLastName(fullname),
          password,
          referralCode: !isEmptyKeyObject(userReferrerProfile, 'referral_code')
            ? userReferrerProfile.referral_code
            : '',
          utmId: utmId || ''
        },
        phone && { phone },
        email && { email }
      )
    );
  };

  return (
    <View
      {...{
        phone: derivedPhone,
        classes,
        style,
        userReferrerProfile,
        onLogin,
        submitLoading,
        errorMessage,
        referrer,
        handleInputOnFocus,
        handleSubmit
      }}
    />
  );
};

export default Signup;
