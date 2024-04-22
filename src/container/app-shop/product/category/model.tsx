export interface IProps {
  match: {
    params: {
      categoryFilter: string;
    };
  };

  perPage?: number;

  history?: any;
  location?: any;
  productByCategory?: any;
  isMagazineDetailNotFound: boolean;
  productByCategoryNotFound?: any;

  menuStore?: any;
  trackingStore?: any;
  bannerStore?: any;

  updateMenuSelected?: any;
  fetchListMenuAction?: any;
  updateMetaInfoAction?: any;
  fetchProductByCategory?: any;
  trackingViewGroupAction?: any;
  clearDataProductByCategoryAction?: any;

  likedIdList?: any;
  openModalAction?: any;
  selectGiftAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
  fetchBannerAction?: any;
  availableFilters?: any;
  isFetchingAvailableFilters?: boolean;
}

export interface IState {
  categoryFilterHash: any;
  isOpenCategoryModal: boolean;
}
