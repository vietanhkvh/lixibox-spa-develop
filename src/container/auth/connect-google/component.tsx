import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom-v5-compat';
import WrapLayout from 'container/layout/wrap';
import { SIGN_IN_STATE } from 'constants/application/global';
import { storageKey } from 'constants/application/client-storage';
import {
  ROUTING_AUTH_ATTACH_PHONE_STEP_1,
  ROUTING_CHECK_OUT,
  ROUTING_CHECK_OUT_PAYMENT,
  ROUTING_SHOP_INDEX
} from 'routings/path';
import classNames from 'classnames';
import { AuthState } from 'flows/auth/types';
import { UserState } from 'flows/user/types';
import { LinkSocialAccountActionParams, SigninWithGoogleActionParams } from 'flows/auth/action';
import { usePrevious } from 'utils/hook';
import { StoredSigninCredentialsToVerify, StoredSocialAuthIntentType } from 'types/storage';
import { AUTH_VIEW } from 'components/auth-modal-block/desktop/constant';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import styles from './style.module.scss';

interface ConnectGoogleContainerProps {
  authStore?: AuthState;
  userStore?: UserState;
  getCartAction?: () => void;
  signinWithGoogleAction?: (data: SigninWithGoogleActionParams) => void;
  linkSocialAccountAction?: (data: LinkSocialAccountActionParams) => void;
}
const ConnectGoogleContainer = ({
  authStore: { signInStatus, socialLink },
  signinWithGoogleAction,
  linkSocialAccountAction,
  getCartAction
}: ConnectGoogleContainerProps) => {
  const history = useHistory();
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.location.href = ROUTING_SHOP_INDEX;
      return;
    }

    const searchParams = new URLSearchParams(window.location.href);
    const idToken = searchParams.get('id_token') || '';
    const accessToken = searchParams.get('access_token') || '';
    const isLinkingGoogle = localStorage.getItem(storageKey.GOOGLE_LINKING) === 'true';
    const signinCredentialsToVerify: StoredSigninCredentialsToVerify = JSON.parse(
      localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
    );
    const socialAuthIntent = localStorage.getItem(storageKey.SOCIAL_AUTH_INTENT) as StoredSocialAuthIntentType;

    if (isLinkingGoogle) {
      linkSocialAccountAction({ token: idToken, provider: 'google' });
    } else if ([StoredSocialAuthIntent.SIGNUP, StoredSocialAuthIntent.SIGNIN].includes(socialAuthIntent as any)) {
      localStorage.removeItem(storageKey.SOCIAL_AUTH_INTENT);
      signinWithGoogleAction({ token: idToken, accessToken });
    } else if (signinCredentialsToVerify) {
      const updatedCredentials: StoredSigninCredentialsToVerify = Object.assign({}, signinCredentialsToVerify, {
        provider: 'google',
        providerToken: idToken
      });
      localStorage.setItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY, JSON.stringify(updatedCredentials));

      if (signinCredentialsToVerify.modalOrigin) {
        history.push(signinCredentialsToVerify.modalOrigin, {
          authModalInitialView: AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_1
        });
      } else {
        history.push(ROUTING_AUTH_ATTACH_PHONE_STEP_1);
      }
    } else {
      history.replace(ROUTING_SHOP_INDEX);
    }
  }, []);

  const redirect = () => {
    /** Default re-direct to home page */
    let targetRedirect = ROUTING_SHOP_INDEX;

    /** if referal exist -> re-direct to referal link */
    const referralRedirectStorage = localStorage.getItem(storageKey.REFERRAL_REDIRECT);
    if (referralRedirectStorage) {
      targetRedirect = referralRedirectStorage;
      localStorage.removeItem(storageKey.REFERRAL_REDIRECT);
      if (false && targetRedirect === ROUTING_CHECK_OUT) targetRedirect = ROUTING_CHECK_OUT_PAYMENT;
    }

    history.push(targetRedirect);
  };

  const prevSigninStatus = usePrevious(signInStatus);
  useEffect(() => {
    if (prevSigninStatus && prevSigninStatus !== signInStatus) {
      switch (signInStatus) {
        case SIGN_IN_STATE.LOGIN_SUCCESS:
          redirect();
          getCartAction();
          break;

        case SIGN_IN_STATE.LOGIN_FAIL:
          window.location.href = ROUTING_SHOP_INDEX;
          break;
      }
    }
  }, [prevSigninStatus, signInStatus]);

  const wasLinking = usePrevious(socialLink.linking);
  useEffect(() => {
    if (wasLinking && !socialLink.linking && socialLink.provider === 'google') {
      redirect();
    }
  }, [wasLinking, socialLink]);

  return (
    <div className={classNames('sign-in-container', styles.container)}>
      <WrapLayout>
        <div className={styles.text}>Vui lòng chờ trong giây lát...</div>
      </WrapLayout>
    </div>
  );
};

export default ConnectGoogleContainer;
