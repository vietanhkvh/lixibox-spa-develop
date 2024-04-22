import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import SigninAttachPhoneStep1 from 'components/auth/signin-attach-phone-step-1';
import styles from './style.module.scss';

const SigninAttachPhoneStep1Container = () => (
  <div className={classNames(isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}>
    <WrapLayout>
      <SigninAttachPhoneStep1 classes={{ container: styles.signinAttachPhoneStep1 }} />
    </WrapLayout>
  </div>
);

export default SigninAttachPhoneStep1Container;
