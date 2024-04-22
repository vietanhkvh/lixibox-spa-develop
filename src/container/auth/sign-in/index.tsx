import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import SignIn from 'components/auth/sign-in';
import WrapLayout from 'container/layout/wrap';
import styles from './style.module.scss';
import { ROUTING_CHECK_OUT } from 'routings/path';
import { useHistory } from 'react-router-dom';

const SigninContainer = () => {
  const history = useHistory();

  return (
    <div
      className={classNames('sign-in-container', isMobileVersion() ? styles.containerMobile : styles.containerDesktop)}
    >
      <WrapLayout>
        <SignIn
          classes={{ container: styles.signInComponent }}
          onLoginSuccess={(event) => {
            if (event.referrer === ROUTING_CHECK_OUT) {
              history.push(ROUTING_CHECK_OUT);
            }
          }}
        />
      </WrapLayout>
    </div>
  );
};

export default SigninContainer;
