import { loadGameAction, getUserGiftAction, getTodayGiftAction } from '../../../../flows/game/action';
import { updateMetaInfoAction } from '../../../../flows/meta/action';

export const mapStateToProps = (state) => ({
  gameStore: state.game,
  shopStore: state.shop,
  userStore: state.user,
  likeStore: state.like,
  cartStore: state.cart,
  authStore: state.auth,
  provinceStore: state.province,
  trackingStore: state.tracking,
  listLikedId: state.like.liked.id,
  signInStatus: state.auth.signInStatus
});

export const mapDispatchToProps = (dispatch) => ({
  loadGameAction: () => dispatch(loadGameAction()),
  getUserGiftAction: () => dispatch(getUserGiftAction()),
  getTodayGiftAction: () => dispatch(getTodayGiftAction()),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});
