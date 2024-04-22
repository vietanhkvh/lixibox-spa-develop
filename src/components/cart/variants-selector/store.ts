import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import VariantsSelector from './component';
import { getProductDetailAction } from 'flows/shop/action';
import { addItemToCartAction, removeItemFromCartAction, updateVariantQuantityAction } from 'flows/cart/action';

const mapStateToProps = (state) => ({
  cartStore: state.cart,
  shopStore: state.shop,
  appStore: state.app
});

const mapDispatchToProps = (dispatch) => ({
  getProductDetailAction: (data) => dispatch(getProductDetailAction(data)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  removeItemFromCartAction: (data) => dispatch(removeItemFromCartAction(data)),
  updateVariantQuantityAction: (data) => dispatch(updateVariantQuantityAction(data))
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(VariantsSelector));
