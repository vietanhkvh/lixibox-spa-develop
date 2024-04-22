import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import { ROUTING_SHOP_INDEX } from 'routings/path';
import WrapLayout from 'container/layout/wrap';
import OTPPasswordReset from 'components/auth/otp-password-reset';
import styles from './style.module.scss';

const ForgotPasswordContainer = () => {
  const history = useHistory();

  return (
    <div
      className={classNames(
        'forgot-password-container',
        isMobileVersion() ? styles.containerMobile : styles.containerDesktop
      )}
    >
      <WrapLayout>
        <OTPPasswordReset
          onSuccess={() => history.push(ROUTING_SHOP_INDEX)}
          classes={{ container: styles.forgotComponent }}
        />
      </WrapLayout>
    </div>
  );
};

export default ForgotPasswordContainer;
