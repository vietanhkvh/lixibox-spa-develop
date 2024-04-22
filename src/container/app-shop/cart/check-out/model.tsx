import { UpdatePromotionsViewCountSinceCheckoutMountedActionParams } from 'flows/cart/action';
import { CartState } from '../../../../flows/cart/types';
import { OpenSharedModalActionParams } from '../../../../flows/shared-modal/action';

export interface IProps {
  history?: any;
  location?: any;
  cartStore?: CartState;
  shopStore: any;
  appStore: any;
  orderStore?: any;
  recommendationStore?: any;
  authStore?: any;
  getCart?: any;
  openModalAction?: any;
  getCartGiftAction?: any;
  addItemToCartAction?: any;
  fetchCartRedeemBoxes?: any;
  fetchCartRedeemSpecialBoxes?: any;
  fetchCartRedeemUserBoxes?: any;
  fetchCartRedeemLatestBoxes?: any;
  fetchAddOnListAction?: any;
  fetchSampleBoxesAction?: any;
  fetchUserProfileAction?: any;
  removeItemFromCartAction?: any;
  fetchBoxesToFreeshipAction?: any;
  fetchSuggestionDiscountCodesAction?: any;
  addDiscountCodeAction?: any;
  showHideCartSumaryLayoutAction?: any;
  toggleDiscountCodeGiftModalVisibilityAction?: any;
  toggleDiscountCodeAddonModalVisibilityAction?: any;
  fetchHomeProductByCategoryAction?: any;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
  fetchCartRecommendationListAction?: any;
  getReportsFeaturesAction?: any;
  feedbackReportsFeaturesAction?: any;
  getOrderBirthdayReceived?: any;

  likedIdList?: any;
  closeModalAction?: any;
  likeProductAction?: any;
  fetchListLikedBoxesAction?: any;
  updatePromotionsViewCountSinceCheckoutMountedAction: (
    data: UpdatePromotionsViewCountSinceCheckoutMountedActionParams
  ) => void;
}

export interface IState {
  isGetCartListLoadding?: boolean;
  isViewCartEventTracked: boolean;
}
