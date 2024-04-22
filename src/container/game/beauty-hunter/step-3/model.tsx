export interface IProps {
  history?: any;

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

  loadGameAction?: any;
  getUserGiftAction?: any;
  getTodayGiftAction?: any;
  gameStore?: any;
}

export interface IState {
  slider: any;
  productInfo: any;
  isLiked?: boolean;
  canViewMore?: boolean;
  feedbackUrlList: Array<any>;
  feedbackPage: any;
  isFixedToolbar?: boolean;
  isLoadingFeedback?: boolean;
  utmId?: any;
}
