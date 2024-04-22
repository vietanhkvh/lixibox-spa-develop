export interface IQuickViewProps {
  data: any;
  closeModal?: any;
  cartStore?: any;
  shopStore?: any;
  authStore?: any;
  openAlert?: any;
  openModal?: any;
  likeProduct?: any;
  unLikeProduct?: any;
  listLikedId?: Array<string>;

  trackingViewBoxAction?: any;
  addItemToCartAction?: any;
  removeItemFromCartAction?: any;
  addToWaitListAction?: any;
  displayCartSumaryOption?: any;
  saveProductTracking?: any;
  getProductDetailAction?: any;
  fetchBoxesCategoriesAction?: any;
}

export interface IQuickViewState {
  isLoadingAddToCard: boolean;
  isLoadingLove: boolean;
  addItemToCart: (number, nubmer, boolean) => void;
  isAddToWaitListSuccess?: boolean;
}
