import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openAlertAction } from '../../../../../../../flows/alert/action';
import { changePaymentToCODAction } from '../../../../../../../flows/cart/action';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../../../../../constants/application/alert';
import { ROUTING_USER_ORDER } from '../../../../../../../routings/path';
import { copyTextToClipboard } from '../../../../../../../utils/generic';
import CODSuggestionBlock from './component';

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
  changePaymentToCODAction: (data) => dispatch(changePaymentToCODAction(data))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClickCODPayment: ({ orderNumber }: { orderNumber: string }) => {
    dispatchProps.changePaymentToCODAction({ orderId: orderNumber });
    ownProps.history.push(`${ROUTING_USER_ORDER}/${orderNumber}`);
  }
});

export default withRouter<any, any>(
  connect<any, any, any>(mapStateToProps, mapDispatchToProps, mergeProps)(CODSuggestionBlock)
);
