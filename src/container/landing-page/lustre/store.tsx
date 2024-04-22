import {
  getProductDetailAction,
  updateProductNameMobileAction,
  addToWaitListAction,
  fetchFeedbackBoxesAction,
  fetchSavingSetsBoxesAction,
  fetchMagazinesBoxesAction,
  fetchDataHomePageAction
} from '../../../flows/shop/action';

import { fetchUserWatchedListAction } from '../../../flows/user/action';
import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';
import { addItemToCartAction } from '../../../flows/cart/action';
import { openModalAction } from '../../../flows/modal/action';
import { openAlertAction } from '../../../flows/alert/action';
import { fetchProvinceListAction } from '../../../flows/province/action';
import { trackingViewBoxAction, saveProductTrackingAction } from '../../../flows/tracking/action';
import { updateMetaInfoAction } from '../../../flows/meta/action';
import { getLoveBoxByIdAction } from '../../../flows/love/action';

export const mapStateToProps = (state) => ({
  loveStore: state.love,
  shopStore: state.shop,
  userStore: state.user,
  likeStore: state.like,
  cartStore: state.cart,
  authStore: state.auth,
  provinceStore: state.province,
  trackingStore: state.tracking,
  listLikedId: state.like.liked.id,
  signInStatus: state.auth.signInStatus
});

export const mapDispatchToProps = (dispatch) => ({
  getProductDetailAction: (data) => dispatch(getProductDetailAction(data)),
  updateProductNameMobile: (productName) => dispatch(updateProductNameMobileAction(productName)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  likeProduct: (productId) => dispatch(likeProductAction(productId)),
  unLikeProduct: (productId) => dispatch(UnLikeProductAction(productId)),
  openModal: (data: any) => dispatch(openModalAction(data)),
  openAlert: (data: any) => dispatch(openAlertAction(data)),
  trackingViewBoxAction: (data) => dispatch(trackingViewBoxAction(data)),
  addToWaitListAction: (data: any) => dispatch(addToWaitListAction(data)),
  fetchProvinceListAction: () => dispatch(fetchProvinceListAction()),
  fetchFeedbackBoxesAction: (data: any) => dispatch(fetchFeedbackBoxesAction(data)),
  fetchWatchedListAction: (data) => dispatch(fetchUserWatchedListAction(data)),
  saveProductTracking: (data) => dispatch(saveProductTrackingAction(data)),
  fetchSavingSetsBoxesAction: (data: any) => dispatch(fetchSavingSetsBoxesAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  fetchMagazinesBoxesAction: (data) => dispatch(fetchMagazinesBoxesAction(data)),
  getLoveBoxByIdAction: (data) => dispatch(getLoveBoxByIdAction(data)),
  fetchDataHomePageAction: () => dispatch(fetchDataHomePageAction())
});
