import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openModalAction, closeModalAction } from '../../../../flows/modal/action';
import {
  fetchSuggestionDiscountCodesAction,
  addDiscountCodeAction,
  updatePromotionsViewCountSinceCheckoutMountedAction,
  UpdatePromotionsViewCountSinceCheckoutMountedActionParams
} from '../../../../flows/cart/action';
import { likeProductAction, fetchListLikedBoxesAction } from '../../../../flows/like/action';
import {
  getCartAction,
  getCartGiftAction,
  addItemToCartAction,
  fetchAddOnListAction,
  removeItemFromCartAction,
  fetchCartRedeemBoxesAction,
  fetchCartRedeemSpecialBoxesAction,
  fetchCartRedeemUserBoxesAction,
  fetchCartRedeemLatestBoxesAction,
  fetchBoxesToFreeshipAction,
  fetchSampleBoxesAction,
  showHideCartSumaryLayoutAction,
  toggleDiscountCodeGiftModalVisibilityAction,
  toggleDiscountCodeAddonModalVisibilityAction
} from '../../../../flows/cart/action';
import { fetchHomeProductByCategoryAction } from '../../../../flows/shop/action';
import { getReportsFeaturesAction, feedbackReportsFeaturesAction } from '../../../../flows/report/action';
// TODO: Remove. Should be fetched on login or signup
import { fetchUserProfileAction } from 'flows/auth/action';
import { openSharedModalAction, OpenSharedModalActionParams } from '../../../../flows/shared-modal/action';
import { fetchCartRecommendationListAction } from '../../../../flows/recommendation/action';
import { getOrderBirthdayReceived } from 'flows/order/action';
import { RootState } from 'types/redux';

import CheckOutContainer from './container';

export const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  appStore: state.app,
  likedIdList: state.like.liked.id,
  recommendationStore: state.recommendation,
  shopStore: state.shop,
  authStore: state.auth,
  orderStore: state.order
});

export const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCartAction()),
  closeModalAction: () => dispatch(closeModalAction()),
  getCartGiftAction: () => dispatch(getCartGiftAction()),
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  fetchSampleBoxesAction: () => dispatch(fetchSampleBoxesAction()),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  fetchAddOnListAction: (data) => dispatch(fetchAddOnListAction(data)),
  fetchBoxesToFreeshipAction: () => dispatch(fetchBoxesToFreeshipAction()),
  likeProductAction: (productId, isFetchNewListWhenSuccess) =>
    dispatch(likeProductAction(productId, isFetchNewListWhenSuccess)),
  fetchCartRedeemBoxes: (data) => dispatch(fetchCartRedeemBoxesAction(data)),
  fetchCartRedeemSpecialBoxes: (data) => dispatch(fetchCartRedeemSpecialBoxesAction(data)),
  fetchCartRedeemUserBoxes: (data) => dispatch(fetchCartRedeemUserBoxesAction(data)),
  fetchCartRedeemLatestBoxes: (data) => dispatch(fetchCartRedeemLatestBoxesAction(data)),
  fetchUserProfileAction: () => dispatch(fetchUserProfileAction()),
  removeItemFromCartAction: (data) => dispatch(removeItemFromCartAction(data)),
  fetchSuggestionDiscountCodesAction: () => dispatch(fetchSuggestionDiscountCodesAction()),
  addDiscountCodeAction: (data) => dispatch(addDiscountCodeAction(data)),
  showHideCartSumaryLayoutAction: (data) => dispatch(showHideCartSumaryLayoutAction(data)),
  toggleDiscountCodeGiftModalVisibilityAction: (data) => dispatch(toggleDiscountCodeGiftModalVisibilityAction(data)),
  toggleDiscountCodeAddonModalVisibilityAction: (data) => dispatch(toggleDiscountCodeAddonModalVisibilityAction(data)),
  fetchHomeProductByCategoryAction: (data) => dispatch(fetchHomeProductByCategoryAction(data)),
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data)),
  fetchCartRecommendationListAction: (data) => dispatch(fetchCartRecommendationListAction(data)),
  getReportsFeaturesAction: (data) => dispatch(getReportsFeaturesAction(data)),
  feedbackReportsFeaturesAction: (data) => dispatch(feedbackReportsFeaturesAction(data)),
  fetchListLikedBoxesAction: (data) => dispatch(fetchListLikedBoxesAction(data)),
  getOrderBirthdayReceived: (data) => dispatch(getOrderBirthdayReceived(data)),
  updatePromotionsViewCountSinceCheckoutMountedAction: (
    data: UpdatePromotionsViewCountSinceCheckoutMountedActionParams
  ) => dispatch(updatePromotionsViewCountSinceCheckoutMountedAction(data))
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CheckOutContainer));
