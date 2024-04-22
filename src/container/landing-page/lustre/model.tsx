export interface IProps {
  shopStore?: any;
  likeStore?: any;
  cartStore?: any;
  loveStore?: any;
  userStore?: any;

  openModal?: any;
  likeProduct?: any;
  unLikeProduct?: any;
  productIdList?: any;
  getProductDetail?: any;
  addItemToCartAction?: any;
  fetchFeedbackBoxesAction?: any;
  fetchMagazinesBoxesAction?: any;
  updateMetaInfoAction?: any;
  addToWaitListAction?: any;
  feedbackPerPage?: number;

  fetchWatchedListAction?: any;
  fetchDataHomePageAction?: any;
  instagram?: any;
  productTypeList?: any;
}

export interface IState {
  positionProductType?: number;
}
