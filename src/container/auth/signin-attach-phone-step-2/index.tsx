import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import SigninAttachPhoneStep2 from 'components/auth/signin-attach-phone-step-2';
import styles from './style.module.scss';

const SigninAttachPhoneStep2Container = () => (
  <div className={classNames(isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}>
    <WrapLayout>
      <SigninAttachPhoneStep2 classes={{ container: styles.signinAttachPhoneStep2 }} />
    </WrapLayout>
  </div>
);

export default SigninAttachPhoneStep2Container;
