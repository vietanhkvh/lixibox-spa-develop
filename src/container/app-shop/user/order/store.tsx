import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUserOrderListAction } from '../../../../flows/user/action';
import { cancelOrderAction, getCancelOrderReasonAction } from '../../../../flows/order/action';
import { openModalAction } from '../../../../flows/modal/action';

import OrderContainer from './container';

const mapStateToProps = (state) => ({
  userStore: state.user,
  orderStore: state.order
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserOrderListAction: (data) => dispatch(fetchUserOrderListAction(data)),
  cancelOrderAction: (data) => dispatch(cancelOrderAction(data)),
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  getCancelOrderReasonAction: () => dispatch(getCancelOrderReasonAction())
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(OrderContainer));
