import { connect } from 'react-redux';

import { openModalAction } from '../../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../../flows/like/action';
import { addItemToCartAction } from '../../../../flows/cart/action';

import RightBarContainer from './container';

export const mapStateToProps = (state) => ({
  likedIdList: state.like.liked.id
});

export const mapDispatchToProps = (dispatch) => ({
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  likeProductAction: (productId) => dispatch(likeProductAction(productId)),
  unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RightBarContainer);
