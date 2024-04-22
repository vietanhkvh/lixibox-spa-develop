import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUserStoreOrdersAction } from '../../../../flows/user/action';
import { cancelOrderAction, getCancelOrderReasonAction } from '../../../../flows/order/action';
import { openModalAction } from '../../../../flows/modal/action';
import StoreOrders from './component';

const mapStateToProps = (state) => ({
  userStore: state.user,
  orderStore: state.order
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserStoreOrdersAction: (data) => dispatch(fetchUserStoreOrdersAction(data)),
  cancelOrderAction: (data) => dispatch(cancelOrderAction(data)),
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  getCancelOrderReasonAction: () => dispatch(getCancelOrderReasonAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(withRouter<any, any>(StoreOrders));
