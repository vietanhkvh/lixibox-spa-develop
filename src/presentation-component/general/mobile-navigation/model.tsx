export interface IMobileNavigationProps {
  history?: any;
  match?: any;
  location?: any;
  productName: {
    value: string;
  };

  cartStore?: any;

  style?: any;

  isTranspanentMode?: boolean;
  showHideInfoMenu?: any;
  showHideMobileMenu?: any;
  specialDealCategories?: any;
  showHideSpecialDealMenu?: any;
  fetchListMenuAction?: any;
  fetchCountdownListAction?: any;
  menuStore?: any;
  isCountDown?: boolean;
  countdownStore?: any;
  withDownloadAppBar?: boolean;
}
export interface IMobileNavigationState {
  openSearch: boolean;
  isShowDropdown: boolean;
  backListDisplayDropDown: Array<string>;
  isModalOpen?: boolean;
}
