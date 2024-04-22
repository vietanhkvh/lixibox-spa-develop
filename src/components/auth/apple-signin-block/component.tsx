import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { updateAppleSigninStyle } from 'utils/auth';
import { isMobileVersion } from 'utils/responsive';
import { useConfirmationModal } from 'utils/hook/modal';
import Loading from '../../ui/loading';
import { generateTestId } from 'utils/test-utils';
import { StoredSocialAuthIntentType } from 'types/storage';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import { storageKey } from 'constants/application/client-storage';
import { PropsFromRedux } from './store';
import './style.css';

const MAX_STYLE_UPDATE_RETRY = 120;

interface TryUpdatingAppleSigninStyleParams {
  intervalIdRef: React.MutableRefObject<NodeJS.Timeout>;
  currentRetryRef: React.MutableRefObject<number>;
}
const tryUpdatingAppleSigninStyle = ({ intervalIdRef, currentRetryRef }: TryUpdatingAppleSigninStyleParams) => {
  if (currentRetryRef.current > MAX_STYLE_UPDATE_RETRY) {
    clearInterval(intervalIdRef.current);
  } else if (!window.AppleID) {
    intervalIdRef.current = setTimeout(() => {
      tryUpdatingAppleSigninStyle({ intervalIdRef, currentRetryRef });
    }, 500);
    currentRetryRef.current += 1;
  } else {
    clearInterval(intervalIdRef.current);
    let handler = { handlerID: null };
    updateAppleSigninStyle(handler);
  }
};

interface AppleSigninBlockProps extends PropsFromRedux {
  className?: string;
  authType: 'sign-in' | 'sign-up';
  intent: StoredSocialAuthIntentType;
}
const AppleSigninBlock = ({
  authType,
  intent,
  className,
  authStore,
  cartStore: { constants },
  sharedModalStore,
  openConfirmationModalAction,
  closeConfirmationModalAction,
  setAppleSigninStateAction
}: AppleSigninBlockProps) => {
  const intervalIdRef = useRef<NodeJS.Timeout>(null);
  const currentRetryRef = useRef<number>(0);
  tryUpdatingAppleSigninStyle({ intervalIdRef, currentRetryRef });

  useEffect(() => {
    const currentIntervalId = intervalIdRef.current;

    return () => {
      clearInterval(currentIntervalId);
    };
  }, []);

  useEffect(() => {
    setAppleSigninStateAction({ isWaiting: false });
  }, []);

  const appleLoginMethod = constants?.social_login_services?.apple;
  const isAppleLoginMethodDisabled = !!appleLoginMethod && !appleLoginMethod?.enabled;
  useConfirmationModal(
    () => closeConfirmationModalAction(),
    () => closeConfirmationModalAction(),
    sharedModalStore
  );

  return (
    <div {...generateTestId({ name: 'btn-signin-apple' })} className={classNames('appleLoginContainer', className)}>
      {isAppleLoginMethodDisabled && (
        <div
          className={classNames('appleLoginOverlay', isMobileVersion() || 'appleLoginOverlayDesktop')}
          onClick={(e) => {
            openConfirmationModalAction({
              title: 'Thông báo',
              message: appleLoginMethod?.message || '',
              button: { title: 'OK', color: 'black' }
            });
          }}
        />
      )}
      <div
        id="appleid-signin"
        onClick={() => {
          setAppleSigninStateAction({ isWaiting: true });
          localStorage.setItem(storageKey.SOCIAL_AUTH_INTENT, intent);
        }}
        className={classNames(
          'signin-apple',
          authStore && authStore.isWaitingAppleSignin && 'appleLoginElementNonInteractive'
        )}
        data-color="white"
        data-border="true"
        data-border-radius="20"
        data-type={authType}
        data-mode="center-align"
        data-height="44"
        data-width="100%"
        data-logo-size="medium"
        data-label-position="0"
      />
      {authStore && authStore.isWaitingAppleSignin && (
        <div className={classNames('appleLoginLoader', isMobileVersion() || 'appleLoginLoaderDesktop')}>
          <Loading style={{ height: 'initial' }} />
        </div>
      )}
    </div>
  );
};
AppleSigninBlock.defaultProps = {
  intent: StoredSocialAuthIntent.SIGNIN
};

export default AppleSigninBlock;
