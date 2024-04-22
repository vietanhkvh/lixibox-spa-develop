import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GeneralModal from '../../../presentation-component/modal/general-modal';
import StickyActionButton from '../../../components/ui/sticky-action-button';
import SocialAccountIntegrator from '../../social-account-integrator';
import { loginGoogleProcess } from '../../../utils/auth';
import { usePrevious } from '../../../utils/hook';
import { storageKey } from '../../../constants/application/client-storage';
import styles from './style.module.scss';
import { PropsFromRedux } from './store';

interface GoogleIntegratorProps extends PropsFromRedux {
  classes?: { container?: string };
}
const GoogleIntegrator = (props: GoogleIntegratorProps) => {
  const {
    authStore: { userInfo, socialLink, socialUnlink },
    classes,
    unlinkSocialAccountAction
  } = props;
  const location = useLocation();
  const social_accounts = userInfo.social_accounts;
  const googleLink =
    Array.isArray(social_accounts) &&
    social_accounts.length &&
    social_accounts.find((account) => account.provider === 'google');
  const isIntegrated = !!googleLink;
  const email = isIntegrated ? googleLink.email : '';
  const [modalState, setModalState] = useState<any>({ visible: false, header: '', body: '', button: '', data: {} });
  const updateModalState = (state) => setModalState((oldState) => Object.assign({}, oldState, state));
  const prevSocialUnlink = usePrevious(socialUnlink);

  useEffect(() => {
    const isLinkingGoogle = localStorage.getItem(storageKey.GOOGLE_LINKING) === 'true';
    if (socialLink.provider === 'google' && isLinkingGoogle) {
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
          body: 'Đã kết nối với tài khoản Google thành công.',
          button: 'OK',
          data: { context: 'link', type: 'error' }
        });
      }
      localStorage.removeItem(storageKey.GOOGLE_LINKING);
    }
  }, []);

  useEffect(() => {
    if (
      prevSocialUnlink &&
      socialUnlink.provider === 'google' &&
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
    <>
      <SocialAccountIntegrator
        {...{
          icon: 'brand-google-colored',
          name: 'Google',
          isIntegrated,
          email,
          classes,
          onClick: ({ type }) => {
            switch (type) {
              case 'link':
                localStorage.setItem(storageKey.GOOGLE_LINKING, 'true');
                loginGoogleProcess({ referrer: location.pathname });
                break;
              case 'unlink':
                setModalState({
                  visible: true,
                  header: 'Hủy kết nối',
                  body: 'Bạn có muốn hủy kết nối với tài khoản Google?',
                  button: 'Xác nhận',
                  data: { context: 'unlink', type: 'confirmation' }
                });
                break;
              default:
            }
          }
        }}
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
                  unlinkSocialAccountAction({ provider: 'google' });
                }
              // eslint-disable-next-line
              case 'link':
              default:
                updateModalState({ visible: false });
            }
          }}
        />
      </GeneralModal>
    </>
  );
};

export default GoogleIntegrator;
