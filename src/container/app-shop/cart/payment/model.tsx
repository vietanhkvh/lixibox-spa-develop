export interface IProps {
  location?: any;
  resetCheckoutPaymentPhaseReadiness?: any;
  cartStore?: any;

  history?: any;
  addressStore?: any;
  checkout?: any;
  authStore?: any;
  fetchUserAddressListAction?: any;
  openModalAction?: any;
  deliveryChooseAddress?: any;
  deliverySetDeliveryMethod?: any;
  deliveryGuestAddressAction?: any;
  checkSameDayShippingAction?: any;
  saveAddressSelected?: any;
  fetchStoresAction?: any;
  checkoutAddressAction?: any;
}

export interface IState {
  isAuthModalOpen: boolean;
  deliveryMethodInfo?: any;
  wasPaymentPhaseTracked: boolean;
  hasInit: boolean;
}
