import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';

import {
  fetchMakeupsAction,
  addToWaitListAction,
  fetchStoreBoxesAction,
  getProductDetailAction,
  fetchRelatedBoxesAction,
  fetchFeedbackBoxesAction,
  fetchMagazinesBoxesAction,
  getLandingPagesDataAction,
  fetchSavingSetsBoxesAction,
  fetchBoxesCategoriesAction,
  fetchFeedbackPictureAction,
  clearDataProdutDetailAction,
  updateProductNameMobileAction,
  fetchReviewableBoxesAction,
  fetchBoxFeedbackSummaryAction
} from 'flows/shop/action';

import { popErrorAction } from 'flows/error/action';

import { openModalAction } from 'flows/modal/action';
import { openAlertAction } from 'flows/alert/action';
import { updateMetaInfoAction } from 'flows/meta/action';
import { getLoveBoxByIdAction } from 'flows/love/action';
import { fetchProvinceListAction, fetchShipFeeByDistrictIdAction } from 'flows/province/action';
import { clearDataMagazineAction } from 'flows/magazine/action';
import { fetchUserWatchedListAction } from 'flows/user/action';
import { fetchProductByBrandIdAction } from 'flows/brand/action';
import { clearDataDiscussionsBoxesAction } from 'flows/discussion/action';
import { likeProductAction, UnLikeProductAction as unLikeProductAction } from 'flows/like/action';
import { trackingViewBoxAction, saveProductTrackingAction } from 'flows/tracking/action';
import { addItemToCartAction, addDiscountCodeAction } from 'flows/cart/action';

import { fetchDiscountCodesBoxesAction } from 'flows/discount-code/action';
import { RootState } from 'types/redux';

import ProductDetailContainer from './container';

export const mapStateToProps = (state: RootState) => ({
  errorStore: state.error,
  loveStore: state.love,
  brandStore: state.brand,
  shopStore: state.shop,
  userStore: state.user,
  cartStore: state.cart,
  authStore: state.auth,
  provinceStore: state.province,
  trackingStore: state.tracking,
  discountCodeStore: state.discountCode,
  likedIdList: state.like.liked.id,
  signInStatus: state.auth.signInStatus
});

const mapDispatchToProps = {
  openAlertAction,
  popErrorAction,
  openModalAction,
  fetchMakeupsAction,
  addItemToCartAction,
  addToWaitListAction,
  updateMetaInfoAction,
  fetchProvinceListAction,
  clearDataMagazineAction,
  getLoveBoxByIdAction,
  trackingViewBoxAction,
  fetchStoreBoxesAction,
  addDiscountCodeAction,
  getProductDetailAction,
  likeProductAction,
  saveProductTrackingAction,
  fetchRelatedBoxesAction,
  unLikeProductAction,
  fetchFeedbackBoxesAction,
  clearDataProdutDetailAction,
  getLandingPagesDataAction,
  fetchMagazinesBoxesAction,
  fetchFeedbackPictureAction,
  fetchSavingSetsBoxesAction,
  fetchBoxesCategoriesAction,
  fetchProductByBrandIdAction,
  clearDataDiscussionsBoxesAction,
  fetchDiscountCodesBoxesAction,
  fetchShipFeeByDistrictIdAction,
  updateProductNameMobileAction,
  fetchReviewableBoxesAction,
  fetchUserWatchedListAction,
  fetchBoxFeedbackSummaryAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(ProductDetailContainer));
