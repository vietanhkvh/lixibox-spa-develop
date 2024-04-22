export interface IProps {
  match: {
    params: {
      idBrand: any;
    };
  };
  location?: any;
  history?: any;

  type?: any;
  column?: number;
  perPage?: number;

  brandStore?: any;
  trackingStore?: any;
  updateMetaInfoAction?: any;
  trackingViewGroupAction?: any;
  saveProductTrackingAction?: any;
  fetchProductByBrandIdAction?: any;
  fetchBrandListAction?: any;
  clearDataBrandsByIdAction?: any;

  likedIdList?: any;
  openModalAction?: any;
  selectGiftAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
}

export interface IState {
  urlList: Array<any>;
  page: any;
  isSubCategoryOnTop?: boolean;
  heightSubCategoryToTop?: number;
  canViewMore: boolean;
}
