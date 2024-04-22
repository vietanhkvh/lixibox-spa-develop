import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SIGN_IN_STATE } from 'constants/application/global';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';
import { storageKey } from 'constants/application/client-storage';
import { usePrevious } from 'utils/hook';
import { StoredSigninCredentialsToVerify } from 'types/storage';
import { AttachPhoneFailureResponse } from 'flows/auth/types';
import { IProps, InlineMessage, SubmitButtonState } from './model';
import { InLineMessageType } from './constant';
import View from './view';

const SigninAttachPhoneStep2 = ({
  authStore: { signInStatus, errorMessage, attachPhone },
  getCartAction,
  fetchConstantsAction,
  attachPhoneAction,

  // Own props
  isOnModal,
  classes,
  style,
  referrer: _referrer,
  inLineNotification,
  onLoginSuccess,
  onLoginFailure,
  onSignup,
  onInvalidState,
  onRetry
}: IProps) => {
  const history = useHistory();
  const location = useLocation<{ referrer: string }>();
  const referrer = _referrer || location.state?.referrer || '';
  const [inlineMessage, setInlineMessage] = useState<InlineMessage>({ content: '', type: InLineMessageType.SUCCESS });
  const [submitButtonState, setSubmitButtonState] = useState<SubmitButtonState>({ loading: false, disabled: false });
  const updateSubmitButtonState = (state: Partial<SubmitButtonState>) =>
    setSubmitButtonState((prevState) => Object.assign({}, prevState, state));
  const credentials: StoredSigninCredentialsToVerify = JSON.parse(
    localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
  );
  const isSetToRetry = useRef(false);
  useEffect(() => {
    inLineNotification && setInlineMessage({ content: inLineNotification.content, type: inLineNotification.type });
    fetchConstantsAction();

    // Safeguard against empty credentials
    if (!localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)) {
      !isOnModal && history.replace(ROUTING_AUTH_SIGN_IN);
      onInvalidState?.();
    }

    return () => {
      if (isSetToRetry.current) {
        const { email, provider, providerToken, redirectUri, ...strippedCredentials } = credentials;
        localStorage.setItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY, JSON.stringify(strippedCredentials));
        return;
      }

      localStorage.removeItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY);
    };
  }, []);

  const prevSignInStatus = usePrevious(signInStatus);
  useEffect(() => {
    if (prevSignInStatus === undefined || prevSignInStatus === signInStatus) return;

    switch (signInStatus) {
      case SIGN_IN_STATE.LOGIN_SUCCESS:
        updateSubmitButtonState({ loading: false });
        localStorage.removeItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY);
        onLoginSuccess?.({ referrer });
        // TODO: Move it to onLoginSuccess callback and invoke on specific case (previously it resided in auth-modal-block/sub-components/sign-in)
        getCartAction();
        break;

      case SIGN_IN_STATE.LOGIN_FAIL:
        // NOTE: Suboptimal implementation. `one_time_provider_code` is a `hint` rather than a reason. It was added to the `reason` since mobile team was lazy and didn't want to handle an extra field.
        const isOneTimeProviderCode =
          (attachPhone.response as AttachPhoneFailureResponse)?.reason === 'one_time_provider_code';
        updateSubmitButtonState({ loading: false, disabled: isOneTimeProviderCode });
        setInlineMessage({ content: errorMessage, type: InLineMessageType.ERROR });
        onLoginFailure?.();
        break;

      case SIGN_IN_STATE.NO_LOGIN:
        setInlineMessage({ content: '', type: InLineMessageType.SUCCESS });
        break;
    }
  }, [signInStatus, prevSignInStatus, errorMessage, attachPhone, credentials]);

  // Consideration: Only validated values are passed to this function
  const handleSubmit = ({ otp }) => {
    const credentials = JSON.parse(localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY));
    updateSubmitButtonState({ loading: true });
    if (credentials) {
      attachPhoneAction(Object.assign({}, credentials, { otp }));
    } else {
      !isOnModal && history.replace(ROUTING_AUTH_SIGN_IN);
      onInvalidState?.();
    }
  };

  const handleInputOnFocus = () => {
    !submitButtonState.disabled && setInlineMessage({ content: '', type: InLineMessageType.SUCCESS });
  };

  return (
    <View
      {...{
        phone: credentials?.phone || '',
        style,
        classes,
        inlineMessage,
        submitButtonState,
        onSignup,
        referrer,
        handleInputOnFocus,
        handleSubmit,
        isSetToRetry,
        onRetry
      }}
    />
  );
};
SigninAttachPhoneStep2.defaultProps = {
  style: {},
  isOnModal: false
};

export default SigninAttachPhoneStep2;
