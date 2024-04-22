import { connect } from 'react-redux';

import {
  checkoutAddressAction,
  deliverySetDeliveryMethod,
  deliveryUserPickupStoreAddressAction
} from '../../../../../flows/cart/action';
import PickupStoreSelector from './component';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  checkoutAddressAction: (data) => dispatch(checkoutAddressAction(data)),
  deliverySetDeliveryMethod: (data: any) => dispatch(deliverySetDeliveryMethod(data)),
  deliveryUserPickupStoreAddressAction: (data: any) => dispatch(deliveryUserPickupStoreAddressAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PickupStoreSelector);
