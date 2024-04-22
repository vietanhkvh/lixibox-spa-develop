import { connect } from 'react-redux';

import { fetchListLikedBoxesAction } from '../../../../flows/like/action';
import { openAlertAction } from '../../../../flows/alert/action';

import WishListContainer from './container';

const mapStateToProps = (state) => ({
  likeStore: state.like,
  cartStore: state.cart
});

const mapDispatchToProps = (dispatch) => ({
  fetchListLikedBoxesAction: (data) => dispatch(fetchListLikedBoxesAction(data)),
  openAlertAction: (data) => dispatch(openAlertAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(WishListContainer);
