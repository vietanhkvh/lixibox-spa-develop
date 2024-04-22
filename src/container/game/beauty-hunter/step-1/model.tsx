export interface IProps {
  history?: any;
  match?: any;
  shopStore?: any;
  likeStore?: any;
  cartStore?: any;
  loveStore?: any;
  userStore?: any;
  authStore?: any;

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
  redeemPlayTimesAction?: any;

  feedbackPerPage?: number;

  loadGameAction?: any;
  getUserGiftAction?: any;
  getTodayGiftAction?: any;
  gameStore?: any;

  signInWithTokenAction?: any;
  fetchConstantsAction?: any;
}

export interface IState {
  tab: number;
  slider: any;
  productInfo: any;
  isLiked?: boolean;
  canViewMore?: boolean;
  feedbackUrlList: Array<any>;
  feedbackPage: any;
  isFixedToolbar?: boolean;
  isLoadingFeedback?: boolean;
  utmId?: any;
  isShowInfo?: boolean;
  isShowRedeem?: boolean;
  redeemResultMessage?: string;
}
