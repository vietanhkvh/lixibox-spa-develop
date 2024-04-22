import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom-v5-compat';
import { SIGN_IN_STATE } from 'constants/application/global';
import { storageKey } from 'constants/application/client-storage';
import { ROUTING_AUTH_ATTACH_PHONE_STEP_1, ROUTING_SHOP_INDEX } from 'routings/path';
import { getUrlParameter } from 'utils/format';
import { usePrevious } from 'utils/hook';
import { isEmptyObject } from 'utils/validate';
import { LinkSocialAccountActionParams, SignInFBActionParams } from 'flows/auth/action';
import { AuthState } from 'flows/auth/types';
import { UserState } from 'flows/user/types';
import WrapLayout from 'container/layout/wrap';
import { StoredSigninCredentialsToVerify, StoredSocialAuthIntentType } from 'types/storage';
import { AUTH_VIEW } from 'components/auth-modal-block/desktop/constant';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import STYLE from './style';

interface ConnectFacebookContainerProps {
  authStore?: AuthState;
  userStore?: UserState;
  getCartAction?: () => void;
  signInFBAction?: (data: SignInFBActionParams) => void;
  linkSocialAccountAction?: (data: LinkSocialAccountActionParams) => void;
}
const ConnectFacebookContainer = ({
  authStore: { signInStatus, socialLink },
  userStore: { userReferrerProfile },
  getCartAction,
  signInFBAction,
  linkSocialAccountAction
}: ConnectFacebookContainerProps) => {
  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    if (!search) {
      window.location.href = ROUTING_SHOP_INDEX;
      return;
    }

    const referralCode = !isEmptyObject(userReferrerProfile) ? userReferrerProfile.referral_code : '';
    const accessToken = getUrlParameter(search, 'code');
    const isLinkingFacebook = localStorage.getItem(storageKey.FACEBOOK_LINKING) === 'true';
    const signinCredentialsToVerify: StoredSigninCredentialsToVerify = JSON.parse(
      localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
    );
    const socialAuthIntent = localStorage.getItem(storageKey.SOCIAL_AUTH_INTENT) as StoredSocialAuthIntentType;

    if (isLinkingFacebook) {
      linkSocialAccountAction({
        token: accessToken,
        provider: 'facebook',
        redirectUri: process.env.REACT_APP_FACEBOOK_SIGNIN_REDIRECT_URI
      });
    } else if ([StoredSocialAuthIntent.SIGNUP, StoredSocialAuthIntent.SIGNIN].includes(socialAuthIntent as any)) {
      localStorage.removeItem(storageKey.SOCIAL_AUTH_INTENT);
      signInFBAction({
        authorizationCode: accessToken,
        redirectUri: process.env.REACT_APP_FACEBOOK_SIGNIN_REDIRECT_URI,
        referralCode
      });
    } else if (signinCredentialsToVerify) {
      const updatedCredentials: StoredSigninCredentialsToVerify = Object.assign({}, signinCredentialsToVerify, {
        provider: 'facebook',
        providerToken: accessToken,
        redirectUri: process.env.REACT_APP_FACEBOOK_SIGNIN_REDIRECT_URI
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

    /** if referrla exist -> re-direct to refferal link */
    const referralRedirectStorage = localStorage.getItem(storageKey.REFERRAL_REDIRECT);
    if (referralRedirectStorage) {
      targetRedirect = referralRedirectStorage;
      localStorage.removeItem(storageKey.REFERRAL_REDIRECT);

      // if (targetRedirect === ROUTING_CHECK_OUT) targetRedirect = ROUTING_CHECK_OUT_PAYMENT;
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
    if (wasLinking && !socialLink.linking && socialLink.provider === 'facebook') {
      redirect();
    }
  }, [wasLinking, socialLink]);

  return (
    <div className={'sign-in-container'} style={STYLE.container}>
      <WrapLayout>
        <div style={STYLE.text}>Vui lòng chờ trong giây lát...</div>
      </WrapLayout>
    </div>
  );
};

export default ConnectFacebookContainer;
