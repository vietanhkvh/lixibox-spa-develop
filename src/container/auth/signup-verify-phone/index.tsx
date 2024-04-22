import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import SignupVerifyPhone from 'components/auth/signup-verify-phone';
import styles from './style.module.scss';

const SignupVerifyPhoneContainer = () => (
  <div className={classNames(isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}>
    <WrapLayout>
      <SignupVerifyPhone classes={{ container: styles.signupVerifyPhone }} />
    </WrapLayout>
  </div>
);

export default SignupVerifyPhoneContainer;
