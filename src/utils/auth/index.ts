import { readCookie } from '../storage';
import { TOKEN_TYPE } from '../../constants/application/global';
import { SIGN_IN_STATE } from '../../constants/application/global';
import { ALERT_SESSION_ENDED_WARNING } from '../../constants/application/alert';
import { cookieKey, storageKey } from '../../constants/application/client-storage';
import { store } from '../../app/init-react-app';
import { cleanupSessionAction, signInLocalAction, fetchUserProfileAction } from '../../flows/auth/action';
import { closeModalAction } from '../../flows/modal/action';
import { StoredSigninCredentialsToVerify, StoredSocialAuthIntentType } from 'types/storage';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import { setCustomReferrer } from 'utils/navigate';

/** Get CSRF Token from Cookie */
export const getCsrfToken = () => readCookie(TOKEN_TYPE.CSRF_TOKEN);

export const auth = {
  clearSession: localStorage.clear, // TODO: REMOVE?

  loggedIn: () => {
    const state = store.getState();
    const authState = state && (state as any).auth;
    if (!authState) return false;

    try {
      return authState.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;
    } catch (e) {
      /** Return false when parse with error  */
      return false;
    }
  }
};

export const redirectHomepage = () => (window.location.href = '/');

export const redirectURL = (url = '') =>
  0 === url.length ? (window.location.href = '/') : (window.location.href = url);

declare global {
  interface Window {
    FB: any;
  }
}

export const loginFacebookProcess = (
  params: { facebookAuthScope: string; referrer?: string } = { facebookAuthScope: '' }
) => {
  const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
  const facebookAuthScopeParams = !!params.facebookAuthScope.length ? `&scope=${params.facebookAuthScope}` : '';
  if (params.referrer) setCustomReferrer({ value: params.referrer });
  window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${process.env.REACT_APP_FACEBOOK_SIGNIN_REDIRECT_URI}&response_type=code${facebookAuthScopeParams}`;
};

export const loginGoogleProcess = (params: { referrer?: string }) => {
  if (params.referrer) setCustomReferrer({ value: params.referrer });
  window.location.href = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${process.env.REACT_APP_GOOGLE_SIGNIN_REDIRECT_URI}&response_type=code token id_token&scope=openid profile email&client_id=${process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}`;
};

const onAppleSigninSuccess =
  (signInWithAppleIDAction, linkSocialAccountAction, setAppleSigninStateAction) => (data: any) => {
    // TODO: Consider persisting `data.detail.user`, so that it can be sent backend with every request (as long as available)
    const authCode = data.detail.authorization.code;
    const user = data.detail.user;
    const isLinkingApple = localStorage.getItem(storageKey.APPLE_LINKING) === 'true';
    const signinCredentialsToVerify: StoredSigninCredentialsToVerify = JSON.parse(
      localStorage.getItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY)
    );
    setAppleSigninStateAction({ isWaiting: false });
    const socialAuthIntent = localStorage.getItem(storageKey.SOCIAL_AUTH_INTENT) as StoredSocialAuthIntentType;
    if (isLinkingApple) {
      linkSocialAccountAction({ token: authCode, provider: 'apple' });
    } else if ([StoredSocialAuthIntent.SIGNUP, StoredSocialAuthIntent.SIGNIN].includes(socialAuthIntent as any)) {
      localStorage.removeItem(storageKey.SOCIAL_AUTH_INTENT);
      signInWithAppleIDAction(authCode, user);
    } else if (signinCredentialsToVerify) {
      const updatedCredentials: StoredSigninCredentialsToVerify = Object.assign({}, signinCredentialsToVerify, {
        provider: 'apple',
        providerToken: authCode
      });
      localStorage.setItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY, JSON.stringify(updatedCredentials));
    }
  };

const onAppleSigninFailure = (setAppleSigninStateAction) => (error) => {
  setAppleSigninStateAction({ isWaiting: false });
  localStorage.removeItem(storageKey.APPLE_LINKING);
};

export const registerAppleSigninEvents = (
  signInWithAppleIDAction,
  setAppleSigninStateAction,
  linkSocialAccountAction
) => {
  document.addEventListener(
    'AppleIDSignInOnSuccess',
    onAppleSigninSuccess(signInWithAppleIDAction, linkSocialAccountAction, setAppleSigninStateAction)
  );
  document.addEventListener('AppleIDSignInOnFailure', onAppleSigninFailure(setAppleSigninStateAction));
};

export const initAppleSignin = () => {
  const randString = () => Math.random().toString(36).substring(7);
  const AppleID = window.AppleID;

  AppleID &&
    AppleID.auth.init({
      clientId: process.env.REACT_APP_APPLE_SIGNIN_CLIENT_ID,
      scope: 'name email',
      redirectURI: process.env.REACT_APP_APPLE_SIGNIN_REDIRECT_URL, // Check usage
      state: `${randString()}${randString()}`,
      nonce: localStorage.getItem(storageKey.UUID),
      usePopup: true
    });

  return AppleID;
};

// TODO: Replace with transparent overlay component
export const updateAppleSigninStyle = (props: any) => {
  let success = false;

  const baseElement: any = document.getElementById('appleid-signin');
  const outerSvgParent: any = document.evaluate(
    ".//div[contains(@class, 'signin-apple')]/div/div",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (baseElement && outerSvgParent) {
    outerSvgParent.innerHTML =
      '<div class="appleLoginButtonLabel"><div class="appleLoginButtonLabelInnerBlock"><div class="icon"><svg width="20" height="27.69" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1681 12.0499C11.9449 12.5565 11.6808 13.0228 11.3748 13.4515C10.9577 14.036 10.6161 14.4405 10.3529 14.6652C9.94486 15.0339 9.50768 15.2228 9.03954 15.2335C8.70346 15.2335 8.29816 15.1396 7.82638 14.9489C7.35304 14.7592 6.91805 14.6652 6.52031 14.6652C6.10317 14.6652 5.65579 14.7592 5.17727 14.9489C4.69801 15.1396 4.31193 15.2389 4.01674 15.2488C3.56782 15.2676 3.12035 15.0733 2.6737 14.6652C2.38862 14.4208 2.03205 14.002 1.60489 13.4086C1.14659 12.7749 0.769795 12.0401 0.47461 11.2023C0.158477 10.2974 0 9.42119 0 8.57287C0 7.60113 0.21367 6.76302 0.641648 6.06069C0.978001 5.49655 1.42547 5.05154 1.98551 4.72485C2.54555 4.39816 3.15068 4.23169 3.80235 4.22104C4.15892 4.22104 4.62651 4.32942 5.2076 4.54244C5.78704 4.75618 6.15909 4.86457 6.32221 4.86457C6.44417 4.86457 6.85748 4.73783 7.55815 4.48516C8.22075 4.25084 8.77997 4.15382 9.23809 4.19204C10.4795 4.29049 11.4121 4.77139 12.0324 5.63779C10.9221 6.29886 10.3729 7.22477 10.3839 8.41257C10.3939 9.33777 10.7354 10.1077 11.4067 10.719C11.7109 11.0027 12.0506 11.222 12.4286 11.3777C12.3466 11.6113 12.2601 11.8351 12.1681 12.0499ZM9.32097 1.04008C9.32097 1.76525 9.05138 2.44233 8.51402 3.06904C7.86554 3.81406 7.08117 4.24457 6.23059 4.17664C6.21975 4.08964 6.21347 3.99808 6.21347 3.90187C6.21347 3.20571 6.52186 2.46068 7.06951 1.85152C7.34293 1.54309 7.69067 1.28664 8.11236 1.08206C8.53314 0.880533 8.93116 0.769085 9.30549 0.75C9.31642 0.846943 9.32097 0.943893 9.32097 1.04007V1.04008Z" fill="black"></path></svg></div><div class="text">Tiếp tục với Apple</div></div></div>';
    success = true;
  }

  if (!success) {
    props.handlerID = setTimeout(() => {
      updateAppleSigninStyle(props);
    }, 100);
  }
};

export const initCrossTabAuthStatusSync = (): NodeJS.Timeout => {
  const intervalId = setInterval(() => {
    const state = store.getState();
    const authStore = state && (state as any).auth;
    if (!authStore) return false;

    const reduxStateLoggedIn = authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;
    const cookieLoggedIn = !!readCookie(cookieKey.AUTH_EXPIRES_AT);

    if (reduxStateLoggedIn !== cookieLoggedIn) {
      if (cookieLoggedIn) {
        store.dispatch<any>(
          fetchUserProfileAction({
            onSuccess({ payload }) {
              // TODO: Update by setting fallback to `null` when `state.auth.userInfo` is completely removed
              store.dispatch<any>(signInLocalAction({ user: payload.user || {} }));
              store.dispatch(closeModalAction());
            }
          })
        );
      } else {
        store.dispatch<any>(cleanupSessionAction({ alertOnSignout: ALERT_SESSION_ENDED_WARNING }));
      }
    }
  }, 1000);

  return intervalId;
};

export const getSessionExpiryTime = (): Date => {
  let expiresAt = new Date();
  const cookieExpiresAt = readCookie(cookieKey.AUTH_EXPIRES_AT);

  if (cookieExpiresAt) {
    try {
      expiresAt = new Date(decodeURIComponent(cookieExpiresAt));
    } catch (e) {}
  }

  return expiresAt;
};
