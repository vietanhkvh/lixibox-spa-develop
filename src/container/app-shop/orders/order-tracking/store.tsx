import { connect } from 'react-redux';

import { fetchOrderTrackingByCodeAction } from '../../../../flows/order-trackings/action';
import { fetchUserOrderListAction } from '../../../../flows/user/action';
import { getMomoPaymentAddressUrlAction } from '../../../../flows/cart/action';
import OrdersTrackingContainer from './container';

export const mapStateToProps = (state) => ({
  userStore: state.user,
  orderStore: state.order,
  cartStore: state.cart,
  orderTrackingsStore: state.orderTrackings
});

export const mapDispatchToProps = (dispatch) => ({
  getMomoPaymentAddressUrlAction: (data: any) => dispatch(getMomoPaymentAddressUrlAction(data)),
  fetchOrderTrackingByCode: ({ code }) => dispatch(fetchOrderTrackingByCodeAction({ code })),
  fetchUserOrderListAction: (data) => dispatch(fetchUserOrderListAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(OrdersTrackingContainer);
