import { openAlertAction } from '../../../flows/alert/action';
import { openModalAction, closeModalAction } from '../../../flows/modal/action';
import { saveProductTrackingAction } from '../../../flows/tracking/action';
import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';
import { addItemToCartAction, removeItemFromCartAction } from '../../../flows/cart/action';
import { addToWaitListAction, getProductDetailAction, fetchBoxesCategoriesAction } from '../../../flows/shop/action';
import { RootState } from 'types/redux';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  shopStore: state.shop,
  listLikedId: state.like.liked.id
});

export const mapDispatchToProps = (dispatch) => ({
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  removeItemFromCartAction: (data) => dispatch(removeItemFromCartAction(data)),
  likeProduct: (productId) => dispatch(likeProductAction(productId)),
  unLikeProduct: (productId) => dispatch(UnLikeProductAction(productId)),
  openAlert: (data: any) => dispatch(openAlertAction(data)),
  openModal: (data: any) => dispatch(openModalAction(data)),
  closeModal: () => dispatch(closeModalAction()),
  addToWaitListAction: (data: any) => dispatch(addToWaitListAction(data)),
  saveProductTracking: (data: any) => dispatch(saveProductTrackingAction(data)),
  getProductDetailAction: (data) => dispatch(getProductDetailAction(data)),
  fetchBoxesCategoriesAction: (data: any) => dispatch(fetchBoxesCategoriesAction(data))
});
