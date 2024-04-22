import { connect } from 'react-redux';

import {
  fetchRecentInvoiceAction,
  fetchCartInvoiceAction,
  updateInvoiceAction,
  deleteInvoiceAction
} from '../../../../../../../flows/cart/action';
import InvoiceBlock from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  fetchRecentInvoiceAction: () => dispatch(fetchRecentInvoiceAction()),
  fetchCartInvoiceAction: () => dispatch(fetchCartInvoiceAction()),
  updateInvoiceAction: (data) => dispatch(updateInvoiceAction(data)),
  deleteInvoiceAction: () => dispatch(deleteInvoiceAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(InvoiceBlock);
