export interface IProps {
  children: any;
  routes: any;

  match: {
    params: {
      idSpecialDeal?: any;
    };
  };

  bannerStore?: any;
  specialDealStore?: any;

  clearDataBannerAction?: any;
  fetchBannerAction?: any;
  fetchSpecialDealBySlug?: any;
}

export interface IState {
  showSubCategory?: boolean;
  isSubCategoryOnTop?: boolean;
  heightSubCategoryToTop?: number;
}
