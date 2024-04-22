import { ConnectedProps, connect } from 'react-redux';

import {
  fetchRecentInvoiceAction,
  fetchCartInvoiceAction,
  updateInvoiceAction,
  deleteInvoiceAction,
  fetchTaxCodeDetail,
  setCheckoutPhaseReadiness
} from 'flows/cart/action';
import { CHECKOUT_PHASE, CHECKOUT_STEP } from 'flows/cart/constant';
import { RootState } from 'types/redux';
import InvoiceBlock from './container';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart
});
export const mapDispatchToProps = (dispatch) => ({
  fetchRecentInvoiceAction: () => dispatch(fetchRecentInvoiceAction()),
  fetchCartInvoiceAction: () => dispatch(fetchCartInvoiceAction()),
  updateInvoiceAction: (data) => dispatch(updateInvoiceAction(data)),
  deleteInvoiceAction: () => dispatch(deleteInvoiceAction()),
  fetchTaxCodeDetail: (data) => dispatch(fetchTaxCodeDetail(data)),
  setInvoiceReadiness: (readiness) =>
    dispatch(setCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment, step: CHECKOUT_STEP.invoice, readiness }))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InvoiceBlock);
