import { useEffect, useState } from 'react';
import classNames from 'classnames';

import GeneralModal from '../../../presentation-component/modal/general-modal';
import StickyActionButton from '../../../components/ui/sticky-action-button';
import SocialAccountIntegrator from '../../social-account-integrator';
import { initAppleSignin } from '../../../utils/auth';
import { usePrevious } from '../../../utils/hook';
import { storageKey } from '../../../constants/application/client-storage';
import { PropsFromRedux } from './store';
import styles from './style.module.scss';

interface AppleIntegratorProps extends PropsFromRedux {
  classes?: { container?: string };
}
const AppleIntegrator = (props: AppleIntegratorProps) => {
  const {
    authStore: { userInfo, socialLink, socialUnlink, isWaitingAppleSignin },
    classes,
    setAppleSigninStateAction,
    unlinkSocialAccountAction
  } = props;
  const social_accounts = userInfo.social_accounts;
  const appleLink =
    Array.isArray(social_accounts) &&
    social_accounts.length &&
    social_accounts.find((account) => account.provider === 'apple');
  const isIntegrated = !!appleLink;
  const email = isIntegrated ? appleLink.email : '';
  const [modalState, setModalState] = useState<any>({ visible: false, header: '', body: '', button: '', data: {} });
  const [retrySchedulerId, setRetrySchedulerId] = useState<any>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const updateModalState = (state) => setModalState((oldState) => Object.assign({}, oldState, state));
  const prevSocialLink = usePrevious(socialLink);
  const prevSocialUnlink = usePrevious(socialUnlink);
  const MAX_INIT_RETRY = 2;

  useEffect(() => {
    if (!initAppleSignin()) {
      setRetrySchedulerId(
        setInterval(() => {
          if (initAppleSignin() || retryCount >= MAX_INIT_RETRY) {
            clearInterval(retrySchedulerId);
            return;
          }

          setRetryCount((count) => count + 1);
        }, 500)
      );
    }

    setAppleSigninStateAction({ isWaiting: false });

    return () => {
      clearInterval(retrySchedulerId);
    };
  }, []);

  useEffect(() => {
    if (prevSocialLink && socialLink.provider === 'apple' && prevSocialLink.linking && !socialLink.linking) {
      if (socialLink.errored) {
        setModalState({
          visible: true,
          header: 'Không thể kết nối',
          body: socialLink.errored,
          button: 'OK',
          data: { context: 'link', type: 'success' }
        });
      } else {
        setModalState({
          visible: true,
          header: 'Đã kết nối',
          body: 'Đã kết nối với tài khoản Apple thành công.',
          button: 'OK',
          data: { context: 'link', type: 'error' }
        });
      }
      localStorage.removeItem(storageKey.APPLE_LINKING);
      setAppleSigninStateAction({ isWaiting: false });
    }
  }, [socialLink]);

  useEffect(() => {
    if (
      prevSocialUnlink &&
      socialUnlink.provider === 'apple' &&
      prevSocialUnlink.unlinking &&
      !socialUnlink.unlinking &&
      socialUnlink.errored
    ) {
      setModalState({
        visible: true,
        header: 'Không thể ngắt kết nối',
        body: socialUnlink.errored,
        button: 'OK',
        data: { context: 'unlink', type: 'error' }
      });
    }
  }, [socialUnlink]);

  return !social_accounts ? null : (
    <div className={styles.container}>
      <SocialAccountIntegrator
        {...{
          icon: 'brand-apple',
          name: 'Apple',
          isIntegrated,
          email,
          classes,
          isLoading: isWaitingAppleSignin || (socialUnlink.provider === 'apple' && socialUnlink.linking),
          onClick: ({ type }) => {
            switch (type) {
              case 'unlink':
                setModalState({
                  visible: true,
                  header: 'Hủy kết nối',
                  body: 'Bạn có muốn hủy kết nối với tài khoản Apple?',
                  button: 'Xác nhận',
                  data: { context: 'unlink', type: 'confirmation' }
                });
                break;
              default:
            }
          }
        }}
      />
      <div
        id="appleid-signin"
        onClick={() => {
          setAppleSigninStateAction({ isWaiting: true });
          localStorage.setItem(storageKey.APPLE_LINKING, 'true');
        }}
        className={classNames(styles.appleSigninButtonAsOverlay, isIntegrated && styles.fallthroughCursorEvents)}
      />
      <GeneralModal
        isOpen={modalState.visible}
        title={modalState.header}
        leftTitle=""
        rightIcon={'close'}
        className={styles.confirmationModal}
        onRightActionClick={() => updateModalState({ visible: false })}
        onRequestClose={() => updateModalState({ visible: false })}
      >
        <div className={styles.body}>
          <div className={styles.entryTitle}>{modalState.body}</div>
        </div>
        <StickyActionButton
          action={{ text: modalState.button }}
          buttonClass={styles.primaryButton}
          onClick={() => {
            switch (modalState.data.context) {
              case 'unlink':
                if (modalState.data.type === 'confirmation') {
                  unlinkSocialAccountAction({ provider: 'apple' });
                }
              // eslint-disable-next-line
              case 'link':
              default:
                updateModalState({ visible: false });
            }
          }}
        />
      </GeneralModal>
    </div>
  );
};

export default AppleIntegrator;
