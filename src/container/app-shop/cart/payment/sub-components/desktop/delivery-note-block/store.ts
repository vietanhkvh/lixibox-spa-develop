import { connect } from 'react-redux';

import { deliverySetNoteMessage, setCheckoutPhaseReadiness } from '../../../../../../../flows/cart/action';
import { CHECKOUT_PHASE, CHECKOUT_STEP } from '../../../../../../../flows/cart/constant';
import DeliveryNoteBlock from './container';

const mapStateToProps = (state) => ({ cartStore: state.cart });
const mapDispatchToProps = (dispatch) => ({
  deliverySetNoteMessage: (data) => dispatch(deliverySetNoteMessage(data)),
  setDeliveryNoteReadiness: (readiness) =>
    dispatch(setCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment, step: CHECKOUT_STEP.deliveryNote, readiness }))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DeliveryNoteBlock);
