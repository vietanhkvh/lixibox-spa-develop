import { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import { ROUTING_AUTH_SIGN_UP, ROUTING_SHOP_INDEX } from 'routings/path';
import { SIGN_IN_STATE } from 'constants/application/global';
import { auth } from 'utils/auth';
import { isEmptyKeyObject, getFirstName, getLastName } from 'utils/validate';
import { usePrevious } from 'utils/hook';
import { ALERT_SIGN_UP_ERROR } from 'constants/application/alert';
import { storageKey } from 'constants/application/client-storage';
import { SignUpFailureResponse } from 'flows/auth/types';
import { IProps } from './model';
import View from './view';

const SignupVerifyPhone = ({
  authStore: { signInStatus, signUp },
  userStore: { userReferrerProfile },
  trackingStore: { utmId },
  signUpAction,
  openAlertAction,
  getCartAction,
  fetchUserReferrerProfileAction,
  fetchConstantsAction,

  // Own props
  phone,
  classes,
  style,
  isOnModal,
  referrer: _referrer,
  onSignupSuccess,
  onSignupFailure,
  onLogin,
  onInvalidState
}: IProps) => {
  const history = useHistory();
  const location = useLocation<{ referrer: string }>();
  const params = useParams<{ phone: string; referalCode: string }>();
  const referrer = _referrer || location.state?.referrer || '';
  const derivedPhone = phone || params.phone || '';
  const [errorMessage, setErrorMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    auth.loggedIn() && !isOnModal && history.push(ROUTING_SHOP_INDEX);
    if (!localStorage.getItem(storageKey.SIGNUP_CREDENTIALS_TO_VERIFY)) {
      !isOnModal && history.replace(ROUTING_AUTH_SIGN_UP);
      onInvalidState?.();
    }
    !isEmptyKeyObject(params, 'referalCode') && fetchUserReferrerProfileAction({ referrerProfile: params.referalCode });
    fetchConstantsAction();

    return () => {
      localStorage.removeItem(storageKey.SIGNUP_CREDENTIALS_TO_VERIFY);
    };
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
        localStorage.removeItem(storageKey.SIGNUP_CREDENTIALS_TO_VERIFY);
        onSignupSuccess?.({ referrer });
      } else {
        const errorMessage = (signUp.response as SignUpFailureResponse)?.error || '';
        if (errorMessage) {
          setErrorMessage(errorMessage);
          openAlertAction(ALERT_SIGN_UP_ERROR(errorMessage));
        }
        onSignupFailure?.();
      }
    }
  }, [signUp.signingUp, wasWaitingSignUp, signUp.signedUp, referrer, isOnModal]);

  const handleInputOnFocus = () => {
    setErrorMessage('');
  };

  const handleSubmit = ({ phone, otp }) => {
    const credentials = JSON.parse(localStorage.getItem(storageKey.SIGNUP_CREDENTIALS_TO_VERIFY));
    if (!credentials) {
      return;
    }
    const { fullName, password } = credentials;
    setSubmitLoading(true);
    signUpAction(
      Object.assign(
        {},
        {
          phone,
          firstName: getFirstName(fullName),
          lastName: getLastName(fullName),
          password,
          referralCode: !isEmptyKeyObject(userReferrerProfile, 'referral_code')
            ? userReferrerProfile.referral_code
            : '',
          utmId: utmId || '',
          otp
        }
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
SignupVerifyPhone.defaultProps = {
  isOnModal: false
};

export default SignupVerifyPhone;
