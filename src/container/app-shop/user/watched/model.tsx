export interface IProps {
  children: any;
  routes: any;
  location?: any;

  userStore?: any;
  fetchUserWatchedListAction?: any;
  perPage?: number;

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
}
