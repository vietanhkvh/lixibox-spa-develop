import { connect } from 'react-redux';

import {
  checkoutAction,
  updatePaymentMethodAction,
  setCheckoutPhaseReadiness,
  setPaymentHighlightErrorBlockAction,
  resetPaymentHighlightErrorBlockAction
} from '../../../../../../../flows/cart/action';
import { CHECKOUT_PHASE, CHECKOUT_STEP } from '../../../../../../../flows/cart/constant';
import PaymentMethodBlock from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  checkout: (data: any) => dispatch(checkoutAction(data)),
  updatePaymentMethodAction: (data: any) => dispatch(updatePaymentMethodAction(data)),
  setPaymentMethodReadiness: (readiness) =>
    dispatch(
      setCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment, step: CHECKOUT_STEP.paymentMethod, readiness })
    ),
  setPaymentHighlightErrorBlockAction: (data) => dispatch(setPaymentHighlightErrorBlockAction(data)),
  resetPaymentHighlightErrorBlockAction: () => dispatch(resetPaymentHighlightErrorBlockAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PaymentMethodBlock);
