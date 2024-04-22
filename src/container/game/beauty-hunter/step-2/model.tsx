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

  playGameAction?: any;
  gameStore?: any;
}

export interface IState {
  countDown?: number;
  isShaking?: boolean;
  countShaking?: number;
}
