import { isMobileVersion } from '../../../utils/responsive';
import MobileAutoDisplayHeader from '../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../presentation-component/general/mobile-screen-header';
import UserAddressesDesktop from '../../../container/app-shop/address/desktop/user-addresses';
import UserAddressesMobile from '../../../container/app-shop/address/mobile/user-addresses';
import styles from './style.module.scss';

const DeliveryList = () => (
  <div className={'summary-delivery-list'}>
    {!!isMobileVersion() && (
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={'Địa chỉ giao hàng'} />
      </MobileAutoDisplayHeader>
    )}
    {!isMobileVersion() && <div className={styles.desktopHeading}>Địa chỉ giao hàng</div>}
    {isMobileVersion() ? <UserAddressesMobile /> : <UserAddressesDesktop className={styles.userAddressesDesktop} />}
  </div>
);

export default DeliveryList;
