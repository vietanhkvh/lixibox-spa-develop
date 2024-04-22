import {
  loadGameAction,
  getUserGiftAction,
  getTodayGiftAction,
  redeemPlayTimesAction
} from '../../../../flows/game/action';
import { signInWithTokenAction } from '../../../../flows/auth/action';
import { updateMetaInfoAction } from '../../../../flows/meta/action';
import { fetchConstantsAction } from '../../../../flows/cart/action';

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
  fetchConstantsAction: () => dispatch(fetchConstantsAction()),
  redeemPlayTimesAction: () => dispatch(redeemPlayTimesAction()),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  signInWithTokenAction: (data) => dispatch(signInWithTokenAction(data))
});
