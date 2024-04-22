import { connect } from 'react-redux';

import { setPrimaryAddressAction } from '../../../../../flows/cart/action';
import {
  addUserAddressAction,
  deleteUserAddressAction,
  editUserAddressAction
} from '../../../../../flows/address/action';
import UserAddresses from './component';

export const mapStateToProps = (state) => ({ addressStore: state.address });
export const mapDispatchToProps = (dispatch) => ({
  setPrimaryAddressAction: (data: any) => dispatch(setPrimaryAddressAction(data)),
  addUserAddressAction: (data: any) => dispatch(addUserAddressAction(data)),
  deleteUserAddressAction: (addressId) => dispatch(deleteUserAddressAction(addressId)),
  editUserAddressAction: (data) => dispatch(editUserAddressAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UserAddresses);
