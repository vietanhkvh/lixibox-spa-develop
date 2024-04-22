import { openModalAction } from '../../../flows/modal/action';
import { fetchListMenuAction, fetchMobileHomeMenuAction } from '../../../flows/menu/action';
import { updateMetaInfoAction } from '../../../flows/meta/action';
import { trackingViewGroupAction } from '../../../flows/tracking/action';
import { fetchCountdownListAction } from '../../../flows/countdown/action';
import { fetchBannerAction } from '../../../flows/banner/action';
import {
  clearCartAction,
  addItemToCartAction,
  fetchAddOnListAction,
  clearDeliveryConfigAction
} from '../../../flows/cart/action';
import { fetchUserProfileAction } from 'flows/auth/action';
import { fetchUserWatchedListAction } from '../../../flows/user/action';
import { fecthActivityFeedListAction, clearDataActivityFeedListAction } from '../../../flows/activity-feed/action';
import {
  fetchMagazineListAction,
  fetchMagazineDashboardAction,
  clearDataMagazineListAction
} from '../../../flows/magazine/action';
import {
  fetchDataHomePageAction,
  fetchDataHotDealAction,
  fetchHomeProductByCategoryAction,
  clearDataHotDealAction,
  clearDataProductByCategoryAction,
  fetchRecommendationBox
} from '../../../flows/shop/action';

import { getTrendingKeywordsAction, setLastSearchSourceAction } from '../../../flows/search/action';

import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';

export const mapStateToProps = (state) => ({
  menuStore: state.menu,
  shopStore: state.shop,
  userStore: state.user,
  bannerStore: state.banner,
  searchStore: state.search,
  magazineStore: state.magazine,
  themeStore: state.banner.theme,
  likedIdList: state.like.liked.id,
  activityFeedStore: state.activityFeed,
  countdownStore: state.countdown
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCountdownListAction: () => dispatch(fetchCountdownListAction()),
  fetchMobileHomeMenuAction: () => dispatch(fetchMobileHomeMenuAction()),
  fetchListMenuAction: () => dispatch(fetchListMenuAction()),
  fetchMainBanner: (data) => dispatch(fetchBannerAction(data)),
  fetchDataHotDealAction: (data) => dispatch(fetchDataHotDealAction(data)),
  fetchDataHomePage: () => dispatch(fetchDataHomePageAction()),
  fetchUserProfileAction: () => dispatch(fetchUserProfileAction()),
  fetchMagazineDashboard: () => dispatch(fetchMagazineDashboardAction()),
  fetchMagazineListAction: (data) => dispatch(fetchMagazineListAction(data)),
  fetchUserWatchedListAction: (data) => dispatch(fetchUserWatchedListAction(data)),
  trackingViewGroupAction: (data: any) => dispatch(trackingViewGroupAction(data)),
  fetchHomeProductByCategoryAction: (data) => dispatch(fetchHomeProductByCategoryAction(data)),

  clearCartAction: () => dispatch(clearCartAction()),
  clearDeliveryConfigAction: () => dispatch(clearDeliveryConfigAction()),
  fecthActivityFeedListAction: (data) => dispatch(fecthActivityFeedListAction(data)),

  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),

  openModalAction: (data: any) => dispatch(openModalAction(data)),
  likeProductAction: (productId) => dispatch(likeProductAction(productId)),
  unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  fetchAddOnListAction: (data) => dispatch(fetchAddOnListAction(data)),
  fetchRecommendationBox: (data) => dispatch(fetchRecommendationBox(data)),

  getTrendingKeywordsAction: (data) => dispatch(getTrendingKeywordsAction(data)),

  clearDataHotDealAction: () => dispatch(clearDataHotDealAction()),
  clearDataMagazineListAction: () => dispatch(clearDataMagazineListAction()),
  clearDataActivityFeedListAction: () => dispatch(clearDataActivityFeedListAction()),
  clearDataProductByCategoryAction: () => dispatch(clearDataProductByCategoryAction()),

  setLastSearchSourceAction: (data) => dispatch(setLastSearchSourceAction(data))
});
