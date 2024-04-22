import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { clearNewItemAction } from 'flows/cart/action';

import CartItem from './component';

const mapStateToProps = (state) => ({
  authStore: state.auth,
  cartStore: state.cart,
  shopStore: state.shop,
  appStore: state.app
});

export const mapDispatchToProps = (dispatch) => ({
  clearNewItemAction: (data) => dispatch(clearNewItemAction(data))
});
export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CartItem));
