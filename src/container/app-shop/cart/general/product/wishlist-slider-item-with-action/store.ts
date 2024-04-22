import { connect } from 'react-redux';
import AddonItemWithAction from './component';
import { addItemToCartAction, removeItemFromCartAction } from '../../../../../../flows/cart/action';
import { UnLikeProductAction, fetchListLikedBoxesAction } from '../../../../../../flows/like/action';

const mapStateToProps = (state) => ({ cartStore: state.cart, appStore: state.app });

export const mapDispatchToProps = (dispatch) => ({
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  removeItemFromCartAction: (data) => dispatch(removeItemFromCartAction(data)),
  fetchListLikedBoxesAction: (data) => dispatch(fetchListLikedBoxesAction(data)),
  unLikeProductAction: (data, onSuccess, onReject) => dispatch(UnLikeProductAction(data, onSuccess, onReject))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AddonItemWithAction);
