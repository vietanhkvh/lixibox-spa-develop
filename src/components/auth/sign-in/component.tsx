import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { generatePath, useSearchParams } from 'react-router-dom-v5-compat';
import { SIGN_IN_STATE } from 'constants/application/global';
import { SignInFailureResponse } from 'flows/auth/types';
import { ROUTING_AUTH_LOGIN_UNCONFIRMED_PHONE_PROMPT } from 'routings/path';
import { storageKey } from 'constants/application/client-storage';
import { usePrevious } from 'utils/hook';
import { getPhoneOrEmail } from 'utils/validate';
import { CredentialsToVerify, IProps, InlineMessage } from './model';
import { InLineMessageType } from './constant';
import View from './view';

const Signin = ({
  authStore: { signInStatus, errorMessage, signIn },
  cartStore: { isGetCartListSuccess },
  signInAction,
  getCartAction,
  fetchConstantsAction,

  // Own props
  phone,
  classes,
  style,
  isOnModal,
  onLoginSuccess,
  onLoginFailure,
  onForgotPassword,
  onSignup,
  referrer: _referrer,
  inLineNotification
}: IProps) => {
  const history = useHistory();
  const location = useLocation<{ referrer: string }>();
  const [searchParams] = useSearchParams();
  const referrer = _referrer || location.state?.referrer || '';
  const derivedPhone = phone || searchParams.get('phone') || '';
  const [inlineMessage, setInlineMessage] = useState<InlineMessage>({ content: '', type: InLineMessageType.SUCCESS });
  const [loginSubmitLoading, setLoginSubmitLoading] = useState(false);
  const [credentialsToVerify, setCredentialsToVerify] = useState<CredentialsToVerify>({
    phone: '',
    password: '',
    modalOrigin: isOnModal ? location.pathname : ''
  });
  const updateCredentialsToVerify = (credentials: Partial<CredentialsToVerify>) =>
    setCredentialsToVerify((prevState) => Object.assign({}, prevState, credentials));
  useEffect(() => {
    inLineNotification && setInlineMessage({ content: inLineNotification.content, type: inLineNotification.type });
    fetchConstantsAction();
  }, []);

  const wasGetCartListSuccess = usePrevious(isGetCartListSuccess);
  useEffect(() => {
    if (wasGetCartListSuccess !== undefined && !wasGetCartListSuccess && isGetCartListSuccess) {
      setLoginSubmitLoading(false);
      signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS && onLoginSuccess?.({ referrer });
    }
  }, [isGetCartListSuccess, wasGetCartListSuccess, referrer, signInStatus]);

  const prevSignInStatus = usePrevious(signInStatus);
  useEffect(() => {
    if (!prevSignInStatus || prevSignInStatus === signInStatus) return;

    switch (signInStatus) {
      case SIGN_IN_STATE.LOGIN_SUCCESS:
        // TODO: Move it to onLoginSuccess callback and invoke on specific case (previously it resided in auth-modal-block/sub-components/sign-in)
        getCartAction();
        break;

      case SIGN_IN_STATE.LOGIN_FAIL:
        setLoginSubmitLoading(false);

        if ((signIn.response as SignInFailureResponse)?.reason === 'unverified_phone_exists') {
          localStorage.setItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY, JSON.stringify(credentialsToVerify));
          onLoginFailure?.({ reason: 'unverified_phone_exists', phone: credentialsToVerify.phone, referrer });
          !isOnModal &&
            history.push(
              generatePath(ROUTING_AUTH_LOGIN_UNCONFIRMED_PHONE_PROMPT, { phone: credentialsToVerify.phone || '' })
            );
        } else {
          setInlineMessage({ content: errorMessage, type: InLineMessageType.ERROR });
          onLoginFailure?.({ referrer });
        }
        break;

      case SIGN_IN_STATE.NO_LOGIN:
        setInlineMessage({ content: '', type: InLineMessageType.SUCCESS });
        setLoginSubmitLoading(false);
        break;
    }
  }, [signInStatus, prevSignInStatus, errorMessage, credentialsToVerify, isOnModal]);

  // Consideration: Only validated values are passed to this function
  const handleSubmit = ({ phoneOrEmail, password }) => {
    const [phone, email] = getPhoneOrEmail(phoneOrEmail);
    phone && updateCredentialsToVerify({ phone, password });

    setLoginSubmitLoading(true);
    signInAction(Object.assign({ password }, phone && { phone }, email && { email }));
  };

  const handleInputOnFocus = () => {
    setInlineMessage({ content: '', type: InLineMessageType.SUCCESS });
  };

  return (
    <View
      {...{
        phone: derivedPhone,
        style,
        classes,
        inlineMessage,
        loginSubmitLoading,
        onForgotPassword,
        onSignup,
        referrer,
        handleInputOnFocus,
        handleSubmit
      }}
    />
  );
};
Signin.defaultProps = {
  style: {},
  isOnModal: false
};

export default Signin;
