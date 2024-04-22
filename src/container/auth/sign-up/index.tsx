import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import SignUp from 'components/auth/sign-up';
import styles from './style.module.scss';

const SignUpContainer = () => (
  <div
    className={classNames('sign-up-container', isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}
  >
    <WrapLayout>
      <SignUp classes={{ container: styles.signUpComponent }} />
    </WrapLayout>
  </div>
);

export default SignUpContainer;
