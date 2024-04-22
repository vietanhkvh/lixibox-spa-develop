import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import SignupWithRegisteredPhonePrompt from 'components/auth/signup-with-registered-phone-prompt';
import styles from './style.module.scss';

const PhoneRegisteredPromptContainer = () => (
  <div className={classNames(isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}>
    <WrapLayout>
      <SignupWithRegisteredPhonePrompt classes={{ container: styles.signupWithRegisteredPhonePrompt }} />
    </WrapLayout>
  </div>
);

export default PhoneRegisteredPromptContainer;
