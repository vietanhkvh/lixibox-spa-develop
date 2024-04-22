export interface IProps {
  match: any;
  routes: any;
  location: any;

  loveStore?: any;
  shopStore?: any;
  userStore?: any;
  menuStore?: any;
  themeStore?: any;
  searchStore?: any;
  bannerStore?: any;
  magazineStore?: any;
  countdownStore?: any;
  activityFeedStore?: any;

  clearCartAction?: any;
  fetchMainBanner?: any;
  fetchDataHomePage?: any;
  fetchLoveListAction?: any;
  fetchListMenuAction?: any;
  updateMetaInfoAction?: any;
  fetchMagazineDashboard?: any;
  fetchUserProfileAction?: any;
  fetchMagazineListAction?: any;
  fetchMobileHomeMenuAction?: any;
  trackingViewGroupAction?: any;
  clearDeliveryConfigAction?: any;
  fetchUserWatchedListAction?: any;
  fecthActivityFeedListAction?: any;
  fetchDataHotDealAction?: any;
  fetchHomeProductByCategoryAction?: any;
  clearDataHotDealAction?: any;
  clearDataMagazineListAction?: any;
  clearDataActivityFeedListAction?: any;
  clearDataProductByCategoryAction?: any;
  fetchCountdownListAction?: any;
  fetchRecommendationBox?: any;
  likedIdList?: any;

  getTrendingKeywordsAction?: any;

  openModalAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
  fetchAddOnListAction?: any;
}

export interface IState {
  showNaviTop: boolean;
  isFetchedFeatureBanner?: boolean;
  isFetchedHotBoxes?: boolean;
  isFetchedMagazineList?: boolean;
  isFetchedNewProducts?: boolean;
  isFetchedPopularSearch?: boolean;
  isFetchedWatchedList?: boolean;
  isFetchedActivityFeed?: boolean;
  isFetchedFooterBanner?: boolean;
  isFetchedCountdown?: boolean;
  isPriorotyBlock?: boolean;
  isModalCategoryOpen?: boolean;
}
