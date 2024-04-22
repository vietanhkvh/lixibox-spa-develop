import { connect } from 'react-redux';

import { fetchUserAddressListAction, saveAddressSelected } from '../../../../flows/address/action';
import {
  deliveryChooseAddressAction,
  deliveryGuestAddressAction,
  deliverySetDeliveryMethod,
  checkoutAction,
  checkSameDayShippingAction,
  fetchStoresAction,
  checkoutAddressAction,
  resetCheckoutPhaseReadiness
} from '../../../../flows/cart/action';
import { CHECKOUT_PHASE } from '../../../../flows/cart/constant';
import { openModalAction } from '../../../../flows/modal/action';
import CheckOutContainer from './container';

export const mapStateToProps = (state) => ({
  addressStore: state.address,
  cartStore: state.cart,
  authStore: state.auth
});

export const mapDispatchToProps = (dispatch) => ({
  checkout: (data: any) => dispatch(checkoutAction(data)),
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  deliveryChooseAddress: (data: any) => dispatch(deliveryChooseAddressAction(data)),
  deliverySetDeliveryMethod: (data: any) => dispatch(deliverySetDeliveryMethod(data)),
  checkSameDayShippingAction: (data: any) => dispatch(checkSameDayShippingAction(data)),
  deliveryGuestAddressAction: (data: any) => dispatch(deliveryGuestAddressAction(data)),
  fetchUserAddressListAction: () => dispatch(fetchUserAddressListAction()),
  saveAddressSelected: (data: any) => dispatch(saveAddressSelected(data)),
  checkoutAddressAction: (data) => dispatch(checkoutAddressAction(data)),
  fetchStoresAction: () => dispatch(fetchStoresAction()),
  resetCheckoutPaymentPhaseReadiness: () => dispatch(resetCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment }))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CheckOutContainer);
