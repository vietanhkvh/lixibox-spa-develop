import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToWaitListAction } from 'flows/shop/action';
import { openModalAction } from 'flows/modal/action';
import { likeProductAction, UnLikeProductAction } from 'flows/like/action';
import { addItemToCartAction } from 'flows/cart/action';
import PrimaryButtonGroup from './component';

export const mapStateToProps = (state) => ({
  shopStore: state.shop,
  cartStore: state.cart,
  appStore: state.app,
  likedIdList: state.like.liked.id // TODO: Refactor
});

export const mapDispatchToProps = (dispatch) => ({
  openModalAction: (data) => dispatch(openModalAction(data)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  addToWaitListAction: (data) => dispatch(addToWaitListAction(data)),
  likeProductAction: (productId) => dispatch(likeProductAction(productId)),
  unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId))
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PrimaryButtonGroup));
