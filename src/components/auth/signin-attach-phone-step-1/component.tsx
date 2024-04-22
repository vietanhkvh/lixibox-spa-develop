import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTING_AUTH_ATTACH_PHONE_STEP_2, ROUTING_AUTH_SIGN_IN } from 'routings/path';
import { storageKey } from 'constants/application/client-storage';
import { RequestOtpFailureResponse } from 'api/types';
import { usePrevious } from 'utils/hook';
import { StoredSigninCredentialsToVerify } from 'types/storage';
import { IProps, InlineMessage } from './model';
import { InLineMessageType } from './constant';
import View from './view';

const SigninAttachPhoneStep1 = ({
  authStore: { otpRequest, isWaitingAppleSignin },
  fetchConstantsAction,
  requestOtpAction,

  // Own props
  isOnModal,
  classes,
  style,
  referrer: _referrer,
  inLineNotification,
  onSignup,
  onInvalidState,
  onCloudTokenAvailable,
  onSuccess
}: IProps) => {
  const history = useHistory();
  const location = useLocation<{ referrer: string }>();
  const referrer = _referrer || location.state?.referrer || '';
  const [inlineMessage, setInlineMessage] = useState<InlineMessage>({ content: '', type: InLineMessageType.SUCCESS });
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  useEffect(() => {
    inLineNotification && setInlineMessage({ content: inLineNotification.content, type: inLineNotification.type });
    fetchConstantsAction();

    const credentials: StoredSigninCredentialsToVerify = JSON.parse(
      localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
    );

    // Safeguard against empty credentials
    if (!credentials) {
      !isOnModal && history.replace(ROUTING_AUTH_SIGN_IN);
      onInvalidState?.();
    }

    // Scenario: phoneLoginVerify(Facebook / Google)
    // If social credentials are available on mount, request OTP and redirect to step 2
    if (credentials && credentials.provider && credentials.providerToken) {
      requestOtpAction({ requestType: 'phone_login_verify', phone: credentials.phone || '' });
      !isOnModal && history.push(ROUTING_AUTH_ATTACH_PHONE_STEP_2);
      onCloudTokenAvailable?.({ referrer });
    }
  }, []);

  // Scenario: phoneLoginVerify(Apple)
  // If social credentials are available after an Apple signin wait, request OTP and redirect to step 2
  const wasWaitingAppleSignin = usePrevious(isWaitingAppleSignin);
  useEffect(() => {
    if (wasWaitingAppleSignin && !isWaitingAppleSignin) {
      const credentials: StoredSigninCredentialsToVerify = JSON.parse(
        localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
      );

      if (credentials && credentials.provider && credentials.providerToken) {
        requestOtpAction({ requestType: 'phone_login_verify', phone: credentials.phone || '' });
        !isOnModal && history.push(ROUTING_AUTH_ATTACH_PHONE_STEP_2);
        onCloudTokenAvailable?.({ referrer });
      }
    }
  }, [wasWaitingAppleSignin, isWaitingAppleSignin, isOnModal]);

  const wasRequestingOtp = usePrevious(otpRequest.phoneLoginVerify?.requesting);
  useEffect(() => {
    if (wasRequestingOtp && !otpRequest.phoneLoginVerify.requesting) {
      setIsSubmitButtonLoading(false);

      if (!otpRequest.phoneLoginVerify.errored) {
        !isOnModal && history.push(ROUTING_AUTH_ATTACH_PHONE_STEP_2);
        onSuccess?.({ referrer });
      } else {
        setInlineMessage({
          content: (otpRequest.phoneLoginVerify.response as RequestOtpFailureResponse)?.error || '',
          type: InLineMessageType.ERROR
        });
      }
    }
  }, [wasRequestingOtp, otpRequest.phoneLoginVerify, isOnModal]);

  // Consideration: Only validated values are passed to this function
  const handleSubmit = ({ email }) => {
    const credentials: StoredSigninCredentialsToVerify = JSON.parse(
      localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
    );
    if (credentials) {
      const updatedCredentials: StoredSigninCredentialsToVerify = Object.assign({}, credentials, { email });
      localStorage.setItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY, JSON.stringify(updatedCredentials));
      requestOtpAction({ requestType: 'phone_login_verify', phone: credentials.phone || '' });
      setIsSubmitButtonLoading(true);
    } else {
      !isOnModal && history.replace(ROUTING_AUTH_SIGN_IN);
      onInvalidState?.();
    }
  };

  const handleInputOnFocus = () => {
    setInlineMessage({ content: '', type: InLineMessageType.SUCCESS });
  };

  return (
    <View
      {...{
        style,
        classes,
        inlineMessage,
        isSubmitButtonLoading,
        onSignup,
        referrer,
        handleInputOnFocus,
        handleSubmit
      }}
    />
  );
};
SigninAttachPhoneStep1.defaultProps = {
  style: {},
  isOnModal: false
};

export default SigninAttachPhoneStep1;
