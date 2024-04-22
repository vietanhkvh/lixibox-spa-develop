import { ConnectedProps, connect } from 'react-redux';

import {
  checkoutAction,
  checkoutAddressAction,
  checkSameDayShippingAction,
  deliveryChooseAddressAction,
  deliverySetDeliveryMethod,
  deliveryUserPickupStoreAddressAction,
  setPrimaryAddressAction,
  updateContactPhoneAction,
  setCheckoutPhaseReadiness
} from 'flows/cart/action';
import { CHECKOUT_PHASE, CHECKOUT_STEP } from 'flows/cart/constant';
import { addUserAddressAction, deleteUserAddressAction, editUserAddressAction } from 'flows/address/action';
import { RootState } from 'types/redux';
import AddressBlock from './container';

export const mapStateToProps = (state: RootState) => ({
  addressStore: state.address,
  authStore: state.auth,
  cartStore: state.cart
});
export const mapDispatchToProps = (dispatch) => ({
  addUserAddressAction: (data: any) => dispatch(addUserAddressAction(data)),
  checkout: (data: any) => dispatch(checkoutAction(data)),
  checkoutAddressAction: (data) => dispatch(checkoutAddressAction(data)),
  checkSameDayShippingAction: (data: any) => dispatch(checkSameDayShippingAction(data)),
  deleteUserAddressAction: (addressId) => dispatch(deleteUserAddressAction(addressId)),
  deliveryChooseAddress: (data: any) => dispatch(deliveryChooseAddressAction(data)),
  deliverySetDeliveryMethod: (data: any) => dispatch(deliverySetDeliveryMethod(data)),
  deliveryUserPickupStoreAddressAction: (data: any) => dispatch(deliveryUserPickupStoreAddressAction(data)),
  editUserAddressAction: (data) => dispatch(editUserAddressAction(data)),
  setPrimaryAddressAction: (data: any) => dispatch(setPrimaryAddressAction(data)),
  setAddressReadiness: (readiness) =>
    dispatch(setCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment, step: CHECKOUT_STEP.address, readiness })),
  updateContactPhoneAction: (phone: string) => dispatch(updateContactPhoneAction(phone))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddressBlock);
