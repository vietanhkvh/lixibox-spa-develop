import { useEffect } from 'react';
import classNames from 'classnames';
import SubmitButton from 'presentation-component/ui/submit-button';
import Loading from 'components/ui/loading';
import { isMobileVersion } from 'utils/responsive';
import { useConfirmationModal } from 'utils/hook/modal';
import { generateTestId } from 'utils/test-utils';
import { loginFacebookProcess } from 'utils/auth';
import { StoredSocialAuthIntentType } from 'types/storage';
import { storageKey } from 'constants/application/client-storage';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import { PropsFromRedux } from './store';
import styles from './style.module.scss';
import './style.css';

interface FacebookSigninBlockProps extends PropsFromRedux {
  referrer?: string;
  intent?: StoredSocialAuthIntentType;
  classes?: { container?: string; button?: string };
  onSubmit?: (param?: any) => any;
}
const FacebookSigninBlock = ({
  referrer,
  intent,
  classes,
  onSubmit,
  authStore,
  cartStore: { constants },
  sharedModalStore,
  openConfirmationModalAction,
  closeConfirmationModalAction,
  setFacebookSigninStateAction
}: FacebookSigninBlockProps) => {
  useEffect(() => {
    setFacebookSigninStateAction({ isWaiting: false });
  }, []);

  const facebook_auth_scope = constants?.facebook_auth_scope || '';
  const facebookLoginMethod = constants?.social_login_services?.facebook;
  const isFacebookLoginMethodDisabled = !!facebookLoginMethod && !facebookLoginMethod?.enabled;
  useConfirmationModal(
    () => closeConfirmationModalAction(),
    () => closeConfirmationModalAction(),
    sharedModalStore
  );

  return (
    <div
      {...generateTestId({ name: 'btn-signin-fb' })}
      className={classNames('facebookSigninContainer', classes && classes.container)}
    >
      {isFacebookLoginMethodDisabled && (
        <div
          className={classNames('facebookSigninOverlay', isMobileVersion() || 'facebookSigninOverlayDesktop')}
          onClick={(e) => {
            openConfirmationModalAction({
              title: 'Thông báo',
              message: facebookLoginMethod?.message || '',
              button: { title: 'OK', color: 'black' }
            });
          }}
        />
      )}
      <SubmitButton
        {...{
          title: 'Tiếp tục với Facebook',
          icon: { name: 'brand-facebook', position: 'left' as const },
          classes: {
            container: classNames(styles.facebookSigninContainer, classes?.button),
            innerContent: styles.innerContent,
            icon: styles.icon
          },
          color: 'signin',
          loading: authStore?.isWaitingFacebookSignin,
          onSubmit: () => {
            setFacebookSigninStateAction({ isWaiting: true });
            localStorage.setItem(storageKey.SOCIAL_AUTH_INTENT, intent);
            loginFacebookProcess(Object.assign({ facebookAuthScope: facebook_auth_scope }, referrer && { referrer }));
            onSubmit?.();
          },
          dataTestId: 'btn-signin-fb'
        }}
      />
      {authStore?.isWaitingFacebookSignin && (
        <div className={classNames('facebookSigninLoader', isMobileVersion() || 'facebookSigninLoaderDesktop')}>
          <Loading style={{ height: 'initial' }} />
        </div>
      )}
    </div>
  );
};
FacebookSigninBlock.defaultProps = {
  intent: StoredSocialAuthIntent.SIGNIN
};

export default FacebookSigninBlock;
