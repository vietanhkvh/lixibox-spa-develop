import { connect } from 'react-redux';

import {
  checkoutAction,
  checkSameDayShippingAction,
  deliverySetDeliveryMethod,
  resetPaymentHighlightErrorBlockAction,
  setPaymentHighlightErrorBlockAction
} from '../../../../../../../flows/cart/action';
import DeliveryMethodBlock from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  checkout: (data: any) => dispatch(checkoutAction(data)),
  checkSameDayShippingAction: (data: any) => dispatch(checkSameDayShippingAction(data)),
  deliverySetDeliveryMethod: (data: any) => dispatch(deliverySetDeliveryMethod(data)),
  setPaymentHighlightErrorBlockAction: (data) => dispatch(setPaymentHighlightErrorBlockAction(data)),
  resetPaymentHighlightErrorBlockAction: () => dispatch(resetPaymentHighlightErrorBlockAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DeliveryMethodBlock);
