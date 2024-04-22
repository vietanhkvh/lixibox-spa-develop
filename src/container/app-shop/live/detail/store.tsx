import {
  fetchLiveRepliesCommentListAction,
  displayLiveBackgroundAction,
  fetchLiveCommentListAction,
  updateDataFromSocketAction,
  createLiveCommentAction,
  getLiveDetailAction
} from '../../../../flows/live/action';
import { addDiscountCodeAction, addItemToCartAction } from '../../../../flows/cart/action';
import { openModalAction, closeModalAction } from '../../../../flows/modal/action';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  liveDetailStore: state.live.liveDetail,
  liveCommentListStore: state.live.liveCommentList,
  liveRepliesCommentListStore: state.live.liveRepliesCommentList,
  receiveNewCommentStore: state.live.receiveNewComment,
  receiveNewRelyCommentStore: state.live.receiveNewRelyComment,
  isCreatingLiveCommentStore: state.live.isCreatingLiveComment,
  isFetchLiveCommentListStore: state.live.isFetchLiveCommentList,
  isFetchLiveCommentSuccessStore: state.live.isFetchLiveCommentSuccess,
  isAddCartLoadingStore: state.cart.isAddCartLoading,
  isAddCartSuccessStore: state.cart.isAddCartSuccess
});

export const mapDispatchToProps = (dispatch) => ({
  fetchLiveRepliesCommentListAction: (data) => dispatch(fetchLiveRepliesCommentListAction(data)),
  fetchLiveCommentListAction: (data) => dispatch(fetchLiveCommentListAction(data)),
  updateDataFromSocketAction: (data) => dispatch(updateDataFromSocketAction(data)),
  displayLiveBackgroundAction: (data) => dispatch(displayLiveBackgroundAction(data)),
  createLiveCommentAction: (data: any) => dispatch(createLiveCommentAction(data)),
  addDiscountCodeAction: (data: any) => dispatch(addDiscountCodeAction(data)),
  getLiveDetailAction: (data) => dispatch(getLiveDetailAction(data)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  openModalAction: (data: any) => dispatch(openModalAction(data)),
  closeModalAction: () => dispatch(closeModalAction())
});
