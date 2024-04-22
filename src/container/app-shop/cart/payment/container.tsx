import { Component } from 'react';

import { SIGN_IN_STATE } from 'constants/application/global';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { ROUTING_SHOP_INDEX, ROUTING_AUTH_SIGN_IN } from 'routings/path';
import { auth } from 'utils/auth';
import { isMobileVersion } from 'utils/responsive';
import { isCartEmpty, isEmptyObject } from 'utils/validate';
import { gatewayTrackInitiatedCheckout } from 'tracking/gateway';
import { setReferrer } from 'utils/navigate';

import { INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class CartContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init() {
    const {
      addressStore: {
        userAddressList: { list: userAddresses }
      },
      cartStore: {
        cartDetail,
        deliveryConfig: { shippingPackage, addressId },
        cartDetail: { available_shipping_packages }
      },
      authStore: { signInStatus, profile: user },
      deliveryChooseAddress,
      history
    } = this.props;

    if (signInStatus !== SIGN_IN_STATE.LOGIN_SUCCESS) {
      if (isMobileVersion()) {
        setReferrer();
        history.push({ pathname: ROUTING_AUTH_SIGN_IN });
      } else {
        this.setState({ isAuthModalOpen: true });
      }
    }

    if (auth.loggedIn()) {
      if (cartDetail?.full_address?.length) {
        const targetAddress = userAddresses.find((item) => cartDetail.full_address === item.full_address);
        this.handleSelectAddress(targetAddress);
      } else {
        // User logined and previous step checkout not chose to return on store
        if (userAddresses.length) {
          const isUserPickup = shippingPackage === SHIPPING_TYPE.USER_PICKUP;
          const addressToSelect = userAddresses.find((item) => item.is_primary_address) || userAddresses[0];
          this.handleSelectAddress(addressToSelect, isUserPickup);
        } else {
          deliveryChooseAddress({ addressId: 0 });
        }
      }
    }

    if (
      shippingPackage &&
      !!shippingPackage.length &&
      available_shipping_packages &&
      !!available_shipping_packages.length
    ) {
      const deliveryMethod = shippingPackage || SHIPPING_TYPE.STANDARD;
      const deliveryMethodList = available_shipping_packages.filter((item) => item.code === deliveryMethod);
      const deliveryMethodInfo = deliveryMethodList && !!deliveryMethodList.length ? deliveryMethodList[0] : {};

      this.setState({ deliveryMethodInfo });
    }

    auth.loggedIn() &&
      cartDetail &&
      Array.isArray(cartDetail.cart_items) &&
      this.setState({ wasPaymentPhaseTracked: true }, () => {
        gatewayTrackInitiatedCheckout({ cart: cartDetail, user });
      });

    // Validates `state.deliveryConfig.addressId`, and sets fallback `addressId` if invalid
    if (userAddresses.length) {
      const selectedAddressExist = userAddresses.find((address) => address.id === addressId);
      if (selectedAddressExist) return;
      const addressToChoose = userAddresses.find((address) => address.is_primary_address) || userAddresses[0];
      deliveryChooseAddress({ addressId: addressToChoose.id });
    }
  }

  handleSelectAddress(address, isUserPickup = false) {
    const {
      cartStore: {
        constants,
        deliveryConfig: { giftMessage, noteMessage }
      },
      deliveryChooseAddress,
      checkSameDayShippingAction,
      checkoutAddressAction,
      checkout
    } = this.props;

    deliveryChooseAddress({ addressId: address.id });
    !!address.id &&
      checkout({
        saveNewAddress: false,
        addressId: address.id,
        isGift: giftMessage && 0 !== giftMessage.length,
        giftMessage,
        note: noteMessage
      });

    !isUserPickup &&
      checkoutAddressAction({
        firstName: address.first_name,
        lastName: address.last_name,
        phone: address.phone,
        addressId: address.id
      });

    // Check shipping same day
    constants.enabled_same_day_shipping && checkSameDayShippingAction({ districtId: address.district_id || 0 });
  }

  componentDidMount() {
    const {
      cartStore: {
        deliveryConfig: { deliveryGuestAddress }
      },
      addressStore: {
        userAddressList: { list }
      },
      fetchStoresAction,
      saveAddressSelected,
      deliveryGuestAddressAction,
      fetchUserAddressListAction,
      resetCheckoutPaymentPhaseReadiness
    } = this.props as IProps;

    auth.loggedIn() && fetchUserAddressListAction();

    // Clear guest address, if user don't have a address
    auth.loggedIn() && list && 0 === list.length && deliveryGuestAddressAction({});

    // Clear address store
    !auth.loggedIn() && isEmptyObject(deliveryGuestAddress) && saveAddressSelected({});

    fetchStoresAction();

    resetCheckoutPaymentPhaseReadiness();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      addressStore: { userAddressList },
      authStore: { signInStatus },
      cartStore: { isCheckoutAddressSuccess, isGetCartListSuccess }
    } = this.props;
    const { hasInit } = this.state;

    if (isGetCartListSuccess && nextProps.cartStore.isGetCartListSuccess && !hasInit) {
      this.setState({ hasInit: true }, () => {
        this.init();
      });
    }

    if (
      !isGetCartListSuccess &&
      nextProps &&
      nextProps.cartStore &&
      nextProps.cartStore.isGetCartListSuccess &&
      nextProps.cartStore.cartDetail &&
      isCartEmpty(nextProps.cartStore.cartDetail.cart_items || [], PURCHASE_TYPE.NORMAL)
    ) {
      nextProps.history.push(`${ROUTING_SHOP_INDEX}`);
      return;
    }

    const nextAddressList =
      (nextProps.addressStore &&
        nextProps.addressStore.userAddressList &&
        nextProps.addressStore.userAddressList.list) ||
      [];

    const prevAddressList = (userAddressList && userAddressList.list) || [];
    const nextAddressListLength = nextAddressList.length;

    if (0 === prevAddressList.length && 0 !== nextAddressListLength) {
      if (1 === nextAddressListLength) {
        // A address default select address
        this.handleSelectAddress(nextAddressList[0]);
      } else {
        Array.isArray(nextAddressList) &&
          nextAddressList.map((item) => true === item.is_primary_address && this.handleSelectAddress(item));
      }
    }

    // Selected address if it is new address
    if (
      auth.loggedIn() &&
      !isEmptyObject(userAddressList) &&
      userAddressList.isWaitingAdd &&
      !isEmptyObject(nextProps.addressStore.userAddressList) &&
      !nextProps.addressStore.userAddressList.isWaitingAdd &&
      nextProps.addressStore.userAddressList.isSuccess
    ) {
      const list =
        (Array.isArray(nextProps.addressStore.userAddressList.list) && nextProps.addressStore.userAddressList.list) ||
        [];
      const len = list.length || 0;

      let selectedAddressId = null;
      try {
        selectedAddressId = nextProps.cartStore.deliveryConfig.addressId;
      } catch {}
      const selectedAddress = list.find((address) => address.id === selectedAddressId);

      len > 0 && this.handleSelectAddress(selectedAddress || list[len - 1]);
    }

    // If user login then get list address
    signInStatus === SIGN_IN_STATE.NO_LOGIN &&
      nextProps.authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS &&
      this.props.fetchUserAddressListAction();

    signInStatus !== SIGN_IN_STATE.LOGIN_SUCCESS &&
      nextProps.authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS &&
      this.setState({ isAuthModalOpen: false });

    // Important assign info
    if (!isCheckoutAddressSuccess && nextProps.cartStore.isCheckoutAddressSuccess) {
      const {
        deliverySetDeliveryMethod,
        cartStore: {
          cartDetail: { available_shipping_packages, shipping_package }
        }
      } = nextProps;

      // Save delivery method to storage
      deliverySetDeliveryMethod({ deliveryMethod: shipping_package });

      const availableShippingPackage =
        (available_shipping_packages &&
          Array.isArray(available_shipping_packages) &&
          available_shipping_packages.filter((item) => item.code === shipping_package)) ||
        [];

      !!availableShippingPackage.length && this.setState({ deliveryMethodInfo: availableShippingPackage[0] });
    }

    if (
      (!this.state.wasPaymentPhaseTracked &&
        nextProps.cartStore.cartDetail &&
        Array.isArray(nextProps.cartStore.cartDetail)) ||
      (!this.state.wasPaymentPhaseTracked &&
        signInStatus !== SIGN_IN_STATE.LOGIN_SUCCESS &&
        nextProps.authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS)
    ) {
      this.setState({ wasPaymentPhaseTracked: true }, () => {
        gatewayTrackInitiatedCheckout({ cart: nextProps.cartStore.cartDetail, user: nextProps.authStore.userInfo });
      });
    }
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state,
      onRequestModalClose: () => this.setState({ isAuthModalOpen: false })
    };

    return renderView(renderViewProps);
  }
}

export default CartContainer;
