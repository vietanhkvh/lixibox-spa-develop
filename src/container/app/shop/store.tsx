import { connect } from 'react-redux';

import { showHideInfoMenuAction, showHideSpecialDealMenuAction } from 'flows/menu/action'; //updateMenuSelectedAction
import { updateUrlParamsAction, updatePrivateMode, updateABTestingModeAction } from 'flows/app/action';
import {
  fetchConstantsAction,
  getCartAction,
  fetchStoresAction,
  showHideCartSumaryLayoutAction
} from 'flows/cart/action';
import {
  clearAuthStoreAction,
  signInWithAppleIDAction,
  setAppleSigninStateAction,
  linkSocialAccountAction,
  fetchUserProfileAction
} from 'flows/auth/action';
import { fetchListLikedBoxIdAction } from 'flows/like/action';
import { clolseMobileSigninAlertAction } from 'flows/alert/action';
import { openModalAction, closeModalAction } from 'flows/modal/action';
import { fetchUserBoxesToFeedbackAction } from 'flows/feedback/action';
import { fetchSpecialDealListAction } from 'flows/special-deals/action';
import { checkBirthdayAction } from 'flows/user/action';
import { clearUserStoreAction, fetchUserOrderListAction } from 'flows/user/action';
import { LinkSocialAccountActionParams } from 'flows/auth/action';
import {
  trackingUtmsAction,
  changeRoutingAction,
  saveUtmIdTrackingAction,
  getUtmIdFromAffiliateTrackingAction
} from 'flows/tracking/action';
import { clearDataSearchAction } from 'flows/search/action';
import { fetchNotificationListAction } from 'flows/notification/action';
import {
  closeAllSharedModalAction,
  CloseAllSharedModalActionParams,
  openSharedModalAction,
  OpenSharedModalActionParams
} from 'flows/shared-modal/action';
import AppShopContainer from './container';
import { getOrderBirthdayReceived } from 'flows/order/action';

const mapStateToProps = (state) => ({
  appStore: state.app,
  userStore: state.user,
  cartStore: state.cart,
  maintenanceStore: state.maintenance,
  sharedModalStore: state.sharedModal,
  feedbackStore: state.feedback,
  authStore: state.auth,
  menuStore: state.menu,
  modalStore: state.modal,
  specialDealStore: state.specialDeals,
  notificationStore: state.notification,
  productPaging: state.shop.productPaging,
  productBrandPaging: state.brand.productBrandPaging,
  magazineStore: state.magazine,
  searchPaging: state.search.searchPaging,
  boxesCategories: state.shop.boxesCategories,
  trackingStore: state.tracking,
  orderStore: state.order
});

const mapDispatchToProps = (dispatch) => ({
  closeModalAction: () => dispatch(closeModalAction()),
  getCartAction: () => dispatch(getCartAction()),
  checkBirthdayAction: () => dispatch(checkBirthdayAction()),
  clearUserStoreAction: () => dispatch(clearUserStoreAction()),
  clearAuthStoreAction: () => dispatch(clearAuthStoreAction()),
  fetchConstantsAction: () => dispatch(fetchConstantsAction()),
  clearDataSearchAction: () => dispatch(clearDataSearchAction()),
  changeRoutingAction: (data) => dispatch(changeRoutingAction(data)),
  trackingUtmsAction: (data: any) => dispatch(trackingUtmsAction(data)),
  fetchListLikedBoxIdAction: () => dispatch(fetchListLikedBoxIdAction()),
  clolseMobileSigninAlert: () => dispatch(clolseMobileSigninAlertAction()),
  fetchUserOrderListAction: (data) => dispatch(fetchUserOrderListAction(data)),
  updateUrlParamsAction: (data) => dispatch(updateUrlParamsAction(data)),
  openModalAction: (data, tracking) => dispatch(openModalAction(data, tracking)),
  saveUtmIdTrackingAction: (data: any) => dispatch(saveUtmIdTrackingAction(data)),
  showHideInfoMobileMenuAction: (state: boolean) => dispatch(showHideInfoMenuAction(state)),
  fetchUserBoxesToFeedbackAction: (data: any) => dispatch(fetchUserBoxesToFeedbackAction(data)),
  getUtmIdFromAffiliateTrackingAction: (data, utmSource) =>
    dispatch(getUtmIdFromAffiliateTrackingAction(data, utmSource)),
  showHideSpecialDealMenuAction: (state: boolean) => dispatch(showHideSpecialDealMenuAction(state)),
  fetchSpecialDealList: ({ page = 1, perPage = 10 }) => dispatch(fetchSpecialDealListAction({ page, perPage })),
  fetchUserProfileAction: () => dispatch(fetchUserProfileAction()),
  signInWithAppleIDAction: (authCode: any, user?: any) => dispatch(signInWithAppleIDAction(authCode, user)),
  setAppleSigninStateAction: (data) => dispatch(setAppleSigninStateAction(data)),
  linkSocialAccountAction: (data: LinkSocialAccountActionParams) => dispatch(linkSocialAccountAction(data)),
  updatePrivateMode: (data) => dispatch(updatePrivateMode(data)),
  fetchNotificationListAction: (data: any) => dispatch(fetchNotificationListAction(data)),
  fetchStoresAction: () => dispatch(fetchStoresAction()),
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data)),
  closeAllSharedModalAction: (data: CloseAllSharedModalActionParams) => dispatch(closeAllSharedModalAction(data)),
  updateABTestingModeAction: (data) => dispatch(updateABTestingModeAction(data)),
  getOrderBirthdayReceived: (data) => dispatch(getOrderBirthdayReceived(data)),
  showHideCartSumaryLayoutAction: (isShow) => dispatch(showHideCartSumaryLayoutAction(isShow))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AppShopContainer);
