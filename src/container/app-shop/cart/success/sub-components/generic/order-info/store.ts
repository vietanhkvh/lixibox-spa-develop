import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openAlertAction } from '../../../../../../../flows/alert/action';
import { getMomoPaymentAddressUrlAction } from '../../../../../../../flows/cart/action';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../../../../../constants/application/alert';
import { ROUTING_ORDERS_TRACKINGS_PATH } from '../../../../../../../routings/path';
import { copyTextToClipboard } from '../../../../../../../utils/generic';
import { reportException } from '../../../../../../../tracking/sentry';
import OrderInfo from './component';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  copyTextToClipboard: (text: string) =>
    copyTextToClipboard(
      text,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    ),
  getMomoPaymentAddressUrlAction: (data) => dispatch(getMomoPaymentAddressUrlAction(data))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  onClickPaymentWithMomo: () => {
    try {
      dispatchProps.getMomoPaymentAddressUrlAction({ orderNumber: stateProps.cartStore.orderInfo.number });
    } catch (e) {
      reportException(e, { info: 'Container: Checkout / Success | Handler | handleGetMomoPaymentAddressUrl |' });
    }
  },
  onClickOrderTracking: (orderNumber: string) => {
    ownProps.history.push(`${ROUTING_ORDERS_TRACKINGS_PATH}/${orderNumber}`); //orderNumber is correct parameter?
  }
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps, mergeProps)(OrderInfo));
