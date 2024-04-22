import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import WrapLayout from 'container/layout/wrap';
import CheckoutFastTrack from 'components/auth/checkout-fast-track';
import { ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT } from 'routings/path';
import styles from './style.module.scss';

const CheckoutFastTrackContainer = () => {
  const history = useHistory();

  return (
    <div
      className={classNames(
        'fast-track-container',
        isMobileVersion() ? styles.containerMobile : styles.containerDesktop
      )}
    >
      <WrapLayout>
        <CheckoutFastTrack
          classes={{ container: styles.fastTrackComponent }}
          onFastTrackSuccess={(event) => {
            if (false && event.referrer === ROUTING_CHECK_OUT) {
              history.push(ROUTING_CHECK_OUT_PAYMENT);
            }
          }}
        />
      </WrapLayout>
    </div>
  );
};

export default CheckoutFastTrackContainer;
