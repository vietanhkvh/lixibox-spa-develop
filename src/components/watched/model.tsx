export interface IProps {
  title?: string;
  list: Array<any>;
  style?: any;
  showHeader?: boolean;
  current?: any;
  per?: any;
  total?: any;
  urlList?: any;
  likedIdList?: any;
  openModalAction?: any;
  selectGiftAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
  isFetchUserWatchedList?: boolean;
}

export interface IState {
  isLoadingList?: boolean;
}
