import { useState, useEffect } from 'react';

import { usePrevious } from 'utils/hook';
import { getPhoneOrEmail } from 'utils/validate';
import { SIGN_IN_STATE } from 'constants/application/global';
import { ALERT_OTP_PASSWORD_RESET_ERROR } from 'constants/application/alert';
import { RequestOtpFailureResponse } from 'api/types';
import { IProps, Phase } from './model';
import View from './view';

const OTPPasswordReset = ({
  authStore: { otpRequest, isWaitingResetPasswordOtp, signInStatus, errorMessage: authStoreErrorMessage },
  requestOtpAction,
  resetPasswordByOtpAction,
  fetchConstantsAction,

  // Own props
  referrer,
  classes,
  style,
  onSuccess,
  onSignin
}: IProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [phase, setPhase] = useState(Phase.Initial);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchConstantsAction();
  }, []);

  const isWaitingRequestPasswordOtp = otpRequest.forgotPassword.requesting;
  const wasWaitingRequestPasswordOtp = usePrevious(isWaitingRequestPasswordOtp);
  const prevAuthStoreErrorMessage = usePrevious(authStoreErrorMessage);
  const wasWaitingResetPasswordOtp = usePrevious(isWaitingResetPasswordOtp);
  useEffect(() => {
    if (phase === Phase.Initial) {
      if (wasWaitingRequestPasswordOtp && !isWaitingRequestPasswordOtp) {
        setLoading(false);

        if (otpRequest.forgotPassword.errored) {
          setPhase(Phase.Initial);
          setErrorMessage((otpRequest.forgotPassword.response as RequestOtpFailureResponse)?.error || '');
        } else {
          setPhase(Phase.OTPRequested);
        }
      }
    } else {
      if (wasWaitingResetPasswordOtp && !isWaitingResetPasswordOtp) {
        if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
          onSuccess?.({ referrer });
        } else {
          setLoading(false);
          setErrorMessage(ALERT_OTP_PASSWORD_RESET_ERROR.content);
        }
      }
    }
  }, [
    authStoreErrorMessage,
    prevAuthStoreErrorMessage,
    isWaitingRequestPasswordOtp,
    wasWaitingRequestPasswordOtp,
    isWaitingResetPasswordOtp,
    wasWaitingResetPasswordOtp,
    phase,
    signInStatus,
    otpRequest
  ]);

  // Consideration: Only invoked with validated data
  const handleSubmit = ({ phoneOrEmail, otp, password }) => {
    setLoading(true);
    setErrorMessage('');
    const [phone, email] = getPhoneOrEmail(phoneOrEmail);
    phase === Phase.Initial
      ? requestOtpAction(Object.assign({ requestType: 'forgot_password' as const }, email ? { email } : { phone }))
      : resetPasswordByOtpAction(Object.assign({ otp, password }, email ? { email } : { phone }));
  };

  const handleInputOnFocus = () => {
    setErrorMessage('');
  };

  return (
    <View
      {...{
        referrer,
        classes,
        style,
        phase,
        loading,
        errorMessage,
        onSignin,
        handleSubmit,
        handleInputOnFocus
      }}
    />
  );
};

export default OTPPasswordReset;
