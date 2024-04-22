import { useEffect, useState } from 'react';
import { isEmptyObject, isMobileVersion } from 'utils';
import { usePrevious } from 'utils/hook';
import { SIGN_IN_STATE } from 'constants/application/global';
import { auth } from 'utils/auth';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { CHECKOUT_PHASE } from 'flows/cart/constant';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';

const handleSelectAddress = ({
  address,
  isUserPickup = false,

  cart,
  forceUpdate = false,
  constants,
  deliveryConfig,
  deliveryChooseAddressAction,
  checkSameDayShippingAction,
  checkoutAddressAction,
  checkoutAction
}) => {
  const { giftMessage, noteMessage, addressId } = deliveryConfig;

  const doesCartHaveAddress = !!cart?.address_id;
  const shouldUpdateCart = forceUpdate || !doesCartHaveAddress;

  if (shouldUpdateCart) {
    deliveryChooseAddressAction({ addressId: address.id });
  } else {
    addressId !== cart.address_id && deliveryChooseAddressAction({ addressId: cart.address_id });
  }

  shouldUpdateCart &&
    !!address.id &&
    checkoutAction({
      saveNewAddress: false,
      addressId: address.id,
      isGift: giftMessage && 0 !== giftMessage.length,
      giftMessage,
      note: noteMessage
    });

  shouldUpdateCart &&
    !isUserPickup &&
    checkoutAddressAction({
      firstName: address.first_name,
      lastName: address.last_name,
      phone: address.phone,
      addressId: address.id
    });

  constants.enabled_same_day_shipping && checkSameDayShippingAction({ districtId: address.district_id || 0 });
};

interface AddressBlockProps extends PropsFromRedux {
  classes?: { container?: string };
}
const AddressBlock = ({
  classes,
  addressStore: {
    userAddressList,
    userAddressList: { list: userAddresses, isWaitingFetchData }
  },
  authStore: { signInStatus },
  cartStore: {
    cartDetail,
    constants,
    deliveryConfig,
    deliveryConfig: { shippingPackage, addressId, giftMessage, noteMessage, deliveryGuestAddress },
    isGetCartListSuccess
  },
  fetchUserAddressListAction,
  deliveryChooseAddressAction,
  checkSameDayShippingAction,
  checkoutAddressAction,
  checkoutAction,
  saveAddressSelected,
  fetchStoresAction,
  resetCheckoutPhaseReadiness
}: AddressBlockProps) => {
  const [didInit, setDidInit] = useState(false);
  const wasGetCartListSuccess = usePrevious(isGetCartListSuccess);
  const prevUserAddresses = usePrevious(userAddresses);
  const wasWaitingToAddAddress = usePrevious(userAddressList.isWaitingAdd);

  useEffect(() => {
    fetchStoresAction();

    if (!auth.loggedIn() || !userAddresses.length || !cartDetail?.address_id) {
      resetCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment });
    }
  }, []);

  // Fetch addresses on mount and on auth success
  useEffect(() => {
    if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
      fetchUserAddressListAction();
    } else {
      isEmptyObject(deliveryGuestAddress) && saveAddressSelected({});
    }
  }, [signInStatus]);
  useEffect(() => {
    if (!wasGetCartListSuccess && isGetCartListSuccess && !didInit) {
      setDidInit(true);

      if (auth.loggedIn()) {
        if (cartDetail?.full_address?.length) {
          const targetAddress = userAddresses.find((item) => cartDetail.full_address === item.full_address);
          targetAddress &&
            handleSelectAddress({
              address: targetAddress,
              cart: cartDetail,
              forceUpdate: false,
              constants,
              deliveryConfig,
              deliveryChooseAddressAction,
              checkSameDayShippingAction,
              checkoutAddressAction,
              checkoutAction
            });
        } else {
          if (userAddresses.length) {
            const isUserPickup = shippingPackage === SHIPPING_TYPE.USER_PICKUP;
            const addressToSelect = userAddresses.find((item) => item.is_primary_address) || userAddresses[0];
            handleSelectAddress({
              address: addressToSelect,
              cart: cartDetail,
              forceUpdate: false,
              isUserPickup,
              constants,
              deliveryConfig,
              deliveryChooseAddressAction,
              checkSameDayShippingAction,
              checkoutAddressAction,
              checkoutAction
            });
          } else {
            deliveryChooseAddressAction({ addressId: 0 });
          }
        }

        if (userAddresses.length) {
          const selectedAddress = userAddresses.find((address) => address.id === addressId);
          if (selectedAddress) return;
          const addressToSelect = userAddresses.find((address) => address.is_primary_address) || userAddresses[0];
          deliveryChooseAddressAction({ addressId: addressToSelect.id });
        }
      }
    }
  }, [
    isGetCartListSuccess,
    wasGetCartListSuccess,
    didInit,
    cartDetail,
    userAddresses,
    constants,
    deliveryConfig,
    shippingPackage,
    addressId
  ]);

  useEffect(() => {
    if (!prevUserAddresses?.length && userAddresses.length) {
      const addressToSelect = userAddresses.find((address) => address.is_primary_address) || userAddresses[0];
      handleSelectAddress({
        address: addressToSelect,
        cart: cartDetail,
        forceUpdate: false,
        constants,
        deliveryConfig,
        deliveryChooseAddressAction,
        checkSameDayShippingAction,
        checkoutAddressAction,
        checkoutAction
      });
    }
  }, [prevUserAddresses, userAddresses, constants, deliveryConfig]);

  useEffect(() => {
    if (wasWaitingToAddAddress && !userAddressList.isWaitingAdd && userAddressList.isSuccess) {
      const addressToSelect = userAddresses.find((address) => address.id === addressId);
      if (userAddresses.length) {
        handleSelectAddress({
          address: addressToSelect || userAddresses[userAddresses.length - 1],
          cart: cartDetail,
          forceUpdate: false,
          constants,
          deliveryConfig,
          deliveryChooseAddressAction,
          checkSameDayShippingAction,
          checkoutAddressAction,
          checkoutAction
        });
      }
    }
  }, [userAddresses, wasWaitingToAddAddress, userAddressList.isWaitingAdd, userAddressList.isSuccess, addressId]);

  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...{ classes }} />;
};

export default AddressBlock;
