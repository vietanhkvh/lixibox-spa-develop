import { ConnectedProps, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getCartAction,
  addItemToCartAction,
  fetchAddOnListAction,
  removeItemFromCartAction,
  fetchSuggestionDiscountCodesAction,
  showHideCartSumaryLayoutAction
} from 'flows/cart/action';
import { RootState } from 'types/redux';
import CartSummary from './container';

export const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  appStore: state.app
});

export const mapDispatchToProps = {
  removeItemFromCartAction,
  addItemToCartAction,
  getCartAction,
  fetchAddOnListAction,
  fetchSuggestionDiscountCodesAction,
  showHideCartSumaryLayoutAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(CartSummary));
