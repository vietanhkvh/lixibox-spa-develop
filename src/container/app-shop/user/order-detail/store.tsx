import { ConnectedProps, connect } from 'react-redux';
import {
  getOrderAction,
  getCancelOrderReasonAction,
  cancelOrderAction,
  getStoresOrderAction
} from 'flows/order/action';
import { openModalAction } from 'flows/modal/action';
import {
  fetchConstantsAction,
  getMomoPaymentAddressUrlAction,
  getOnepayPaymentAddressUrlAction,
  changePaymentToCODAction
} from 'flows/cart/action';
import { RootState } from 'types/redux';
import container from './container';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  orderStore: state.order,
  cartStore: state.cart
});

export const mapDispatchToProps = {
  openModalAction,
  getOrderAction,
  getStoresOrderAction,
  cancelOrderAction,
  fetchConstantsAction,
  getCancelOrderReasonAction,
  getMomoPaymentAddressUrlAction,
  getOnepayPaymentAddressUrlAction,
  changePaymentToCODAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(container);
