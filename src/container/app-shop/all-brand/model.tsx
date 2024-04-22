export interface IBrandList {
  /**
   * brand id in parameter url
   */
  bids?: any;
  /**
   * brand list from parent
   */
  brandsList?: any;
  /**
   *  fetch brand list into redux,
   */
  fetchBrandListAction?: () => void;
  /**
   * brand storage redux
   */
  brandStore?: any;
  /**
   * update meta info action
   */
  updateMetaInfoAction?: any;
}
