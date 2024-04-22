export interface IProps {
  history?: any;
  liveDetailStore: any;
  liveCommentListStore: any;
  liveRepliesCommentListStore: any;
  receiveNewCommentStore: number;
  receiveNewRelyCommentStore: number;
  isCreatingLiveCommentStore: boolean;
  isFetchLiveCommentListStore: boolean;
  isAddCartLoadingStore: boolean;
  isAddCartSuccessStore: boolean;

  faqStore?: any;
  authStore?: any;
  match?: any;
  fetchLiveRepliesCommentListAction?: any;
  fetchLiveCommentListAction?: any;
  getLiveDetailAction?: any;
  updateDataFromSocketAction?: any;
  displayLiveBackgroundAction?: any;
  addDiscountCodeAction?: any;
  addItemToCartAction?: any;

  closeModalAction?: any;
  openModalAction?: any;
  createLiveCommentAction?: any;
}

export interface IState {
  isShowMobileTabModal: number;
  isShowAddToCartSuccessModal: boolean;
  selectedProduct?: any;
}
