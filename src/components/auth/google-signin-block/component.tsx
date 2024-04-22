import { useEffect } from 'react';
import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import Loading from 'components/ui/loading';
import { isMobileVersion } from 'utils/responsive';
import { useConfirmationModal } from 'utils/hook/modal';
import { generateTestId } from 'utils/test-utils';
import { loginGoogleProcess } from 'utils/auth';
import { StoredSocialAuthIntentType } from 'types/storage';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import { storageKey } from 'constants/application/client-storage';
import { PropsFromRedux } from './store';
import './style.css';

interface GoogleSigninBlockProps extends PropsFromRedux {
  referrer?: string;
  intent?: StoredSocialAuthIntentType;
  classes?: { container?: string; button?: string };
  onSubmit?: (param?: any) => void;
}
const GoogleSigninBlock = ({
  referrer,
  intent,
  classes,
  onSubmit,
  authStore,
  cartStore: { constants },
  sharedModalStore,
  openConfirmationModalAction,
  closeConfirmationModalAction,
  setGoogleSigninStateAction
}: GoogleSigninBlockProps) => {
  useEffect(() => {
    setGoogleSigninStateAction({ isWaiting: false });
  }, []);

  const googleLoginMethod = constants?.social_login_services?.google;
  const isGoogleLoginMethodDisabled = !!googleLoginMethod && !googleLoginMethod?.enabled;
  useConfirmationModal(
    () => closeConfirmationModalAction(),
    () => closeConfirmationModalAction(),
    sharedModalStore
  );

  return (
    <div
      {...generateTestId({ name: 'btn-signin-gg' })}
      className={classNames('googleSigninContainer', classes && classes.container)}
    >
      {isGoogleLoginMethodDisabled && (
        <div
          className={classNames('googleSigninOverlay', isMobileVersion() || 'googleSigninOverlayDesktop')}
          onClick={(e) => {
            openConfirmationModalAction({
              title: 'Thông báo',
              message: googleLoginMethod?.message || '',
              button: { title: 'OK', color: 'black' }
            });
          }}
        />
      )}
      <div
        id="googleSigninButton"
        onClick={() => {
          setGoogleSigninStateAction({ isWaiting: true });
          localStorage.setItem(storageKey.SOCIAL_AUTH_INTENT, intent);
          loginGoogleProcess(Object.assign({}, referrer && { referrer }));
          onSubmit?.();
        }}
        className={classNames(
          'googleSigninButton',
          classes && classes.button,
          authStore && authStore.isWaitingGoogleSignin && 'googleSigninElementNonInteractive'
        )}
      >
        <div className="googleSigninButtonInnerBlock">
          <Icon name="brand-google-colored" className={'button-icon'} />
          <div className="button-label">Tiếp tục với Google</div>
        </div>
      </div>
      {authStore && authStore.isWaitingGoogleSignin && (
        <div className={classNames('googleSigninLoader', isMobileVersion() || 'googleSigninLoaderDesktop')}>
          <Loading style={{ height: 'initial' }} />
        </div>
      )}
    </div>
  );
};
GoogleSigninBlock.defaultProps = {
  intent: StoredSocialAuthIntent.SIGNIN
};

export default GoogleSigninBlock;
