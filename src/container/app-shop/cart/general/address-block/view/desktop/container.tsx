import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import SvgIcon from 'presentation-component/ui/icon';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { PAYMENT_PHASES } from 'constants/application/payment';
import { navigationTracking } from 'container/app-shop/cart/payment/tracking';
import TabHeader from 'container/app-shop/address/desktop/tab-header';
import UserAddressSelector from 'container/app-shop/address/desktop/user-address-selector';
import PickupStoreSelector from 'container/app-shop/address/desktop/pickup-store-selector';
import { usePrevious } from 'utils/hook';
import { generateTestId } from 'utils/test-utils';
import { auth } from 'utils/auth';
import Loading from 'components/ui/loading';
import BuyerPhoneFormModal from './buyer-phone-form-modal';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

interface IProps extends PropsFromRedux {
  classes?: { container?: string };
}

const AddressBlock = ({
  updateAuthModalStateAction,
  addressStore: {
    userAddressList: { list, isWaitingFetchData }
  },
  cartStore: {
    cartDetail,
    cartDetail: { contact_phone, phone },
    constants,
    deliveryConfig,
    deliveryConfig: { deliveryUserPickupStoreAddress },
    isFetchingCheckoutAddress,
    stores,
    paymentHighlightErrorBlock
  },
  authStore: { profile, signInStatus },
  updateContactPhoneAction,
  setAddressReadiness
}: IProps) => {
  const buyerFullName = `${profile?.last_name || ''} ${profile?.first_name || ''}`;
  const buyerEmail = profile?.email || '';
  const buyerPhoneNumber = contact_phone || profile?.phone || phone || '';
  const [collapsed, setCollapsed] = useState(true);
  const [buyerContactModalVisibility, setBuyerContactModalVisibility] = useState(false);
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.address.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.address.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.address.id;

  /** TODO: Check if address should be get from cart instead of deliveryConfig */
  const isUserPickup = (cartDetail.shipping_package || deliveryConfig.shippingPackage) === SHIPPING_TYPE.USER_PICKUP;
  const providedShippingOrPickupAddress = isUserPickup
    ? !!cartDetail.warehouse_id
    : deliveryConfig.addressId !== 0 && !!list.find((address) => address.id === deliveryConfig.addressId);
  const pickupAddress = isUserPickup ? stores.find((store) => store.id === cartDetail.warehouse_id) : null;
  const userAddress = isUserPickup ? null : list.find((address) => address.id === deliveryConfig.addressId);

  const ADDRESS_SELECTION_TAB = {
    userAddress: 'userAddress',
    pickupAddress: 'pickupAddress'
  };
  const initialTabEntries = [
    {
      id: ADDRESS_SELECTION_TAB.userAddress,
      title: 'Giao hàng tận nơi',
      component: <UserAddressSelector onSelect={() => setCollapsed(true)} />,
      selected: false
    }
  ];
  constants.enabled_user_pickup_shipping_package &&
    initialTabEntries.push({
      id: ADDRESS_SELECTION_TAB.pickupAddress,
      title: 'Nhận tại cửa hàng',
      component: <PickupStoreSelector onSelect={() => setCollapsed(true)} />,
      selected: false
    });

  const [tabEntries, setTabEntries] = useState(initialTabEntries);
  const setCurrentTab = (tabID) => {
    setTabEntries(tabEntries.map((entry) => Object.assign({}, entry, { selected: entry.id === tabID })));
  };
  const currentTab = tabEntries.find((entry) => entry.selected);

  useEffect(() => {
    setCurrentTab(isUserPickup ? ADDRESS_SELECTION_TAB.pickupAddress : ADDRESS_SELECTION_TAB.userAddress);
  }, []);

  useEffect(() => {
    setAddressReadiness(Boolean(providedShippingOrPickupAddress));
    return () => setAddressReadiness(true);
  }, [providedShippingOrPickupAddress, signInStatus, profile, cartDetail?.address_id]);

  return (
    <>
      <div
        id={PAYMENT_PHASES.address.id}
        ref={blockRef}
        className={classNames(style.addressBlock, isBlockValid || style.blockError)}
        {...generateTestId({ name: 'address-block' })}
      >
        <div
          {...generateTestId({ name: 'receiver-checkout' })}
          className={style.primaryView}
          onClick={() => {
            if (!auth.loggedIn()) {
              updateAuthModalStateAction({ isAuthModalOpen: true });
              return;
            }

            if (collapsed) {
              setCollapsed(false);
              navigationTracking('block', 'Address');
            }
          }}
        >
          <div
            className={style.header}
            onClick={(event) => {
              if (providedShippingOrPickupAddress && !collapsed) {
                event.stopPropagation();
                setCollapsed(true);
              }
            }}
          >
            <div className={style.status}>
              <SvgIcon name="mark-location" className={style.icon} />
            </div>
            <div className={style.title}>{isUserPickup ? 'NHẬN TẠI CỬA HÀNG' : 'ĐỊA CHỈ NHẬN HÀNG'}</div>
            {providedShippingOrPickupAddress && (
              <div className={style.action}>
                {collapsed ? 'Thay đổi' : <SvgIcon name="minus" className={style.icon} />}
              </div>
            )}
          </div>

          <div className={classNames(style.brief, collapsed || style.noDisplay)}>
            {isWaitingFetchData || isFetchingCheckoutAddress ? (
              <Loading style={{ height: 'initial' }} />
            ) : providedShippingOrPickupAddress ? (
              <>
                {false && (
                  <div className={style.header}>{isUserPickup ? 'Nhận tại cửa hàng' : 'Giao hàng tận nơi'}</div>
                )}
                <div className={style.recipient}>
                  {isUserPickup
                    ? `${deliveryUserPickupStoreAddress.firstName} ${deliveryUserPickupStoreAddress.lastName}, ${deliveryUserPickupStoreAddress.phone}`
                    : `${userAddress.full_name}, ${userAddress.phone}`}
                </div>
                <div className={style.address}>
                  {isUserPickup ? pickupAddress.full_address : userAddress.full_address}
                  {!isUserPickup && userAddress.is_primary_address && <span className={style.label}>Mặc định</span>}
                </div>
              </>
            ) : (
              <div className={style.hint}>Nhập địa chỉ giao hàng</div>
            )}
          </div>

          {false && providedShippingOrPickupAddress && collapsed && (
            <div
              className={style.payerBlock}
              onClick={(event) => {
                event.stopPropagation();
                setBuyerContactModalVisibility(true);
              }}
            >
              <div className={style.header}>
                <div className={classNames(style.title, style.titleReceiver)}>NGƯỜI MUA</div>
                <div className={style.action}>Thay đổi</div>
              </div>
              <div className={style.brief}>
                <div className={style.header}>{`${buyerFullName}${buyerPhoneNumber && `, ${buyerPhoneNumber}`}`}</div>
                {buyerEmail && <div className={style.address}>Email: {buyerEmail}</div>}
              </div>
            </div>
          )}
        </div>
        <div className={classNames(style.extendedView, collapsed && style.noDisplay)}>
          <TabHeader
            tabs={tabEntries}
            currentTab={currentTab}
            onChange={(tab) => {
              setCurrentTab(tab.id);
            }}
          />
          {currentTab && <div className={style.tabBody}>{currentTab.component}</div>}
        </div>
      </div>
      <BuyerPhoneFormModal
        isOpen={buyerContactModalVisibility}
        initialValue={buyerPhoneNumber}
        onSubmit={({ phone }) => {
          updateContactPhoneAction(phone);
          setBuyerContactModalVisibility(false);
        }}
        onRequestClose={() => setBuyerContactModalVisibility(false)}
      />
    </>
  );
};

export default AddressBlock;
