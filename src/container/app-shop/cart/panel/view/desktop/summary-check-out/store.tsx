import { ConnectedProps, connect } from 'react-redux';

import { getCartAction, fetchSuggestionDiscountCodesAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import CartSummaryCheckOut from './container';

export const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  userStore: state.user
});

export const mapDispatchToProps = {
  fetchSuggestionDiscountCodesAction,
  getCartAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartSummaryCheckOut);
