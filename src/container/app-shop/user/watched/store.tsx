import { connect } from 'react-redux';
import { fetchUserWatchedListAction } from '../../../../flows/user/action';
import { openModalAction } from '../../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../../flows/like/action';
import { selectGiftAction, addItemToCartAction } from '../../../../flows/cart/action';

import WatchedContainer from './container';

const mapStateToProps = (state) => ({
  userStore: state.user,
  likedIdList: state.like.liked.id
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserWatchedListAction: (data: any) => dispatch(fetchUserWatchedListAction(data)),
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  selectGiftAction: (data) => dispatch(selectGiftAction(data)),
  likeProductAction: (productId) => dispatch(likeProductAction(productId)),
  unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(WatchedContainer);
