export interface IProps {
  menuStore?: any;

  themeListStore?: any;
  brandStore?: any;
  magazineStore?: any;
  activityFeedStore?: any;
  openModal?: any;
  bannerStore?: any;

  fetchMagazineListAction?: any;
  fetchBrandListAction?: any;
  fetchListMenuAction?: any;
  fetchThemeAction?: any;
  fecthActivityFeedListNavigationAction?: any;
  fetchMagazineDashboardAction?: any;
  fetchBannerAction?: any;
}

export interface IState {
  idShoppingCat: string;
  menu: Array<any>;
  isActiveMenu: boolean;
  listMenu: any;
  subMenuDesktop: any;
  listCategoryReject: Array<any>;
  listRootNavigation: Array<any>;
  alphaBetBrandSelected?: string;
}
