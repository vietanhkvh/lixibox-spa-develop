import { ConnectedProps, connect } from 'react-redux';

import { openAlertAction } from 'flows/alert/action';
import { addItemToCartAction, selectGiftAction } from 'flows/cart/action';
import { fetchUserBoxesToFeedbackAction, editFeedbackAction } from 'flows/feedback/action';
import { fetchListLikedBoxesAction } from 'flows/like/action';
import { likeProductAction, UnLikeProductAction as unLikeProductAction } from 'flows/like/action';
import { openModalAction } from 'flows/modal/action';
import { getReferralSchemesAction } from 'flows/referral/action';
import { fetchUserDashboardAction, fetchUserWatchedListAction } from 'flows/user/action';
import { signOutAction, fetchUserProfileAction } from 'flows/auth/action';
import { getMembershipAction } from 'flows/lixicoin/action';
import { getOrderBirthdayReceived } from 'flows/order/action';
import { RootState } from 'types/redux';

import ProfileContainer from './container';

const mapStateToProps = (state: RootState) => ({
  activityFeedStore: state.activityFeed,
  userStore: state.user,
  authStore: state.auth,
  likeStore: state.like,
  cartStore: state.cart,
  referralStore: state.referral,
  feedbackStore: state.feedback,
  likedIdList: state.like.liked.id,
  orderStore: state.order,
  lixicoinStore: state.lixicoin
});

const mapDispatchToProps = {
  fetchUserDashboardAction,
  fetchUserWatchedListAction,
  fetchUserBoxesToFeedbackAction,
  editFeedbackAction,
  fetchListLikedBoxesAction,
  fetchUserProfileAction,
  addItemToCartAction,
  openModalAction,
  likeProductAction,
  unLikeProductAction,
  openAlertAction,
  selectGiftAction,
  signOutAction,
  getReferralSchemesAction,
  getOrderBirthdayReceived,
  getMembershipAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileContainer);
