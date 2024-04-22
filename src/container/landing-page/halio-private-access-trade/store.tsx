import { connect } from 'react-redux';

import { getProductDetailAction } from '../../../flows/shop/action';
import { addItemToCartAction } from '../../../flows/cart/action';
import { openModalAction } from '../../../flows/modal/action';

import Component from './component';

export const mapStateToProps = (state) => ({
  shopStore: state.shop,
  cartStore: state.cart
});

export const mapDispatchToProps = (dispatch) => ({
  getProductDetailAction: (data) => dispatch(getProductDetailAction(data)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Component);
