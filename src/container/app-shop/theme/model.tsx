export interface IProps {
  match: {
    params: {
      idSpecial: any;
    };
  };

  history?: any;
  location?: any;

  type?: any;
  column?: number;
  perPage?: number;
  isLoading?: boolean;

  themeStore?: any;
  bannerStore?: any;
  trackingStore?: any;
  fetchMainBanner?: any;

  fetchThemeAction?: any;
  fetchThemeBoxesAction?: any;
  fetchThemeSectionAction?: any;
  updateMetaInfoAction?: any;
  trackingViewGroupAction?: any;
  saveProductTrackingAction?: any;
  fetchProductByThemeIdAction?: any;
  clearDataProductByThemeIdAction?: any;

  likedIdList?: any;
  openModalAction?: any;
  selectGiftAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
}

export interface IState {
  page: any;
  urlList: Array<any>;
  filterBrands: Array<any>;
  showSubCategory?: boolean;
  isSubCategoryOnTop?: boolean;
  heightSubCategoryToTop?: number;
  isLoading?: boolean;
  showFilter?: boolean;
}
