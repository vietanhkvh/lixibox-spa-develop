export interface IProps {
  likedIdList?: any;
  themeStore?: any;
  cartStore?: any;
  lixicoinStore?: any;
  themeName?: any;

  openModalAction?: any;
  selectGiftAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
  getMembershipAction?: any;
}

export interface IState {
  showNaviTop: boolean;
  collapseOpenId: Array<number>;
}
