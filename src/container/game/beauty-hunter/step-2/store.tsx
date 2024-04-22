import { playGameAction } from '../../../../flows/game/action';
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
  playGameAction: ({ id }) => dispatch(playGameAction({ id })),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});
