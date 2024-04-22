export interface IHeaderProps {
  /**
   * banner
   */
  bannerStore?: any;
  /**
   * fethcing banner
   */
  fetchBannerAction?: any;
  /**
   * theme header
   */
  themeHeader?: any;
  /**
   * refferal reward
   */
  referralStore?: any;
  /**
   * fetching refferal reward
   */
  getReferralSchemesAction?: any;
}

export interface IDesktopHeader {
  /**
   * theme header
   */
  themeHeader?: any;
  /**
   * refferal reward
   */
  availableSchemes?: any;
}

export interface IState {
  fixHeader: boolean;
}
