import { connect } from 'react-redux';

import { confirmOrderReceivedAction, getOrderAction, getStoresOrderAction } from '../../../flows/order/action';
import { openAlertAction } from '../../../flows/alert/action';
import View from './view';

const mapStateToProps = (state) => ({
  orderStore: state.order
});

const mapDispatchToProps = (dispatch) => ({
  confirmOrderReceivedAction: (data) => dispatch(confirmOrderReceivedAction(data)),
  openAlertAction: (data) => dispatch(openAlertAction(data)),
  getOrderAction: (data: any) => {
    const isOnlineOrder = !window.location.pathname.includes('store-purchases');
    return isOnlineOrder ? dispatch(getOrderAction(data)) : dispatch(getStoresOrderAction(data));
  }
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(View);
