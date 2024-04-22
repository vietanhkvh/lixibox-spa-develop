import { connect } from 'react-redux';

import {
  checkoutAction,
  checkoutAddressAction,
  checkSameDayShippingAction,
  deliveryChooseAddressAction,
  setPrimaryAddressAction
} from '../../../../../flows/cart/action';
import {
  addUserAddressAction,
  deleteUserAddressAction,
  editUserAddressAction
} from '../../../../../flows/address/action';
import UserAddressSelector from './component';

export const mapStateToProps = (state) => ({ addressStore: state.address, cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  checkoutAction: (data: any) => dispatch(checkoutAction(data)),
  checkoutAddressAction: (data) => dispatch(checkoutAddressAction(data)),
  checkSameDayShippingAction: (data: any) => dispatch(checkSameDayShippingAction(data)),
  deliveryChooseAddressAction: (data: any) => dispatch(deliveryChooseAddressAction(data)),
  setPrimaryAddressAction: (data: any) => dispatch(setPrimaryAddressAction(data)),
  addUserAddressAction: (data: any) => dispatch(addUserAddressAction(data)),
  deleteUserAddressAction: (addressId) => dispatch(deleteUserAddressAction(addressId)),
  editUserAddressAction: (data) => dispatch(editUserAddressAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UserAddressSelector);
