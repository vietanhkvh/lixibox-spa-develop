import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import SigninWithUnconfirmedPhonePrompt from 'components/auth/signin-with-unconfirmed-phone-prompt';
import styles from './style.module.scss';

const LoginWithUnconfirmedPhonePromptContainer = () => (
  <div className={classNames(isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}>
    <WrapLayout>
      <SigninWithUnconfirmedPhonePrompt classes={{ container: styles.signinWithUnconfirmedPhonePrompt }} />
    </WrapLayout>
  </div>
);

export default LoginWithUnconfirmedPhonePromptContainer;
