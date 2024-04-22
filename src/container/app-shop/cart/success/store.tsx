import { ConnectedProps, connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateGuestPasswordAction } from '../../../../flows/user/action';
import {
  getCartAction,
  clearCartAction,
  paymentSuccessAction,
  clearDeliveryConfigAction,
  getMomoPaymentAddressUrlAction,
  getOnepayPaymentAddressUrlAction,
  fetchOrderBoxCategoryAction
} from '../../../../flows/cart/action';
import { RootState } from 'types/redux';
import CheckOutContainer from './container';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  userStore: state.user,
  appStore: state.app
});
export const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCartAction()),
  clearCartAction: () => dispatch(clearCartAction()),
  clearDeliveryConfigAction: () => dispatch(clearDeliveryConfigAction()),
  paymentSuccessAction: (data: any) => dispatch(paymentSuccessAction(data)),
  updateGuestPasswordAction: (data: any) => dispatch(updateGuestPasswordAction(data)),
  getMomoPaymentAddressUrlAction: (data: any) => dispatch(getMomoPaymentAddressUrlAction(data)),
  getOnepayPaymentAddressUrlAction: (data: any) => dispatch(getOnepayPaymentAddressUrlAction(data)),
  fetchOrderBoxCategoryAction: (data: any) => dispatch(fetchOrderBoxCategoryAction(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(CheckOutContainer));
