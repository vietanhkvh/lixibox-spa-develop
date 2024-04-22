import { connect } from 'react-redux';

import { addItemToCartAction } from '../../../flows/cart/action';
import { fetchListLikedBoxesAction, UnLikeProductAction } from '../../../flows/like/action';
import { openModalAction } from '../../../flows/modal/action';
import { openAlertAction } from '../../../flows/alert/action';
import WishlistProductItem from './container';

export const mapStateToProps = (state) => ({
  cartStore: state.cart,
  likeStore: state.like
});

export const mapDispatchToProps = (dispatch) => ({
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  unLikeProductAction: (data, onSuccess, onFailure) => dispatch(UnLikeProductAction(data, onSuccess, onFailure)),
  fetchListLikedBoxesAction: (data) => dispatch(fetchListLikedBoxesAction(data)),
  openModalAction: (data) => dispatch(openModalAction(data)),
  openAlertAction: (data) => dispatch(openAlertAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(WishlistProductItem);
