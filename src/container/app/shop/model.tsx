import { CloseAllSharedModalActionParams, OpenSharedModalActionParams } from '../../../flows/shared-modal/action';
import { MaintenanceState } from 'flows/maintenance/types';
import { SharedModalState } from '../../../flows/shared-modal/types';

export interface IProps {
  children: any;
  match: any;
  history: any;
  location?: Location;
  routes: any;
  authStore: {
    signInStatus?: string;
    userInfo: any;
  };

  trackingStore?: {
    utmId?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmExpiredTime?: number;
    trackingCode?: unknown;
    productTracking?: Array<any>;
    expertTrackingList?: {};
    viewGroupTrackingList?: {
      [key: string]: {
        groupObjectId: string;
        trackingCode: number;
      };
    };
    isTrackingViewBoxSuccess: boolean;
    trackingUtmsLoading: boolean;
  };
  appStore?: any;
  cartStore?: any;
  maintenanceStore?: MaintenanceState;
  specialDealStore?: any;
  menuStore?: any;
  modalStore?: any;
  userStore?: any;
  feedbackStore?: any;
  notificationStore?: any;
  sharedModalStore?: SharedModalState;
  boxesCategories?: any;
  orderStore?: any;

  trackingUtmsAction?: any;
  openModalAction?: any;
  closeModalAction?: any;
  fetchListMenuAction?: any;
  fetchListLikedBoxIdAction?: any;
  showHideInfoMobileMenuAction?: any;
  showHideSpecialDealMenuAction?: any;
  fetchSpecialDealList?: any;
  clearUserStoreAction?: any;
  clearAuthStoreAction?: any;
  changeRoutingAction?: any;
  checkBirthdayAction?: any;
  fetchConstantsAction?: any;
  clearDataSearchAction?: any;
  clolseMobileSigninAlert?: any;
  saveUtmIdTrackingAction?: any;
  fetchUserOrderListAction?: any;
  fetchUserBoxesToFeedbackAction?: any;
  getCartAction?: any;
  fetchUserProfileAction?: any;
  updateUrlParamsAction?: any;
  getUtmIdFromAffiliateTrackingAction?: any;
  signInWithAppleIDAction?: any;
  setAppleSigninStateAction?: any;
  linkSocialAccountAction?: any;
  isPrivateMode?: any;
  updatePrivateMode?: any;
  fetchNotificationListAction?: any;
  fetchStoresAction?: any;
  openSharedModalAction?: (data: OpenSharedModalActionParams) => any;
  closeAllSharedModalAction?: (data: CloseAllSharedModalActionParams) => any;
  showHideCartSumaryLayoutAction?: any;
  getOrderBirthdayReceived?: (data: any) => void;

  /**
   * product paging
   */
  productPaging?: any;

  productBrandPaging?: any;
  /**
   * searching homepage products paging
   */
  searchPaging;
  /**
   * magazine redux store
   */
  magazineStore: any;
  updateABTestingModeAction: (data) => any;
  handleSetIsShowBirthdayModal: (data: boolean) => void;
}

export interface IState {
  isError: number;
  isShowBirthdayModalForm: boolean;
  isShowCartSummary: boolean;
  crossTabSyncIntervalId: NodeJS.Timeout;
  /*
    isError value:
    -1 : not error
    0  : error out side main component
    1  : error in main component
   */
}
