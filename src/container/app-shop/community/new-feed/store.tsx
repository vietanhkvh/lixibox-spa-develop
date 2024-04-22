import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import {
  getCollectionAction,
  getCollectionDetailAction,
  fecthActivityFeedListAction,
  fetchCommunityHashtagFeedsAction,
  clearDataCollectionAction,
  clearDataActivityFeedListAction,
  clearDataActivityFeedCommentListAction,
  fetchCommunityHotBoxes,
  fetchCommunityGoodSale,
  fetchCommunityTopReview,
  fetchCommunityTopLiked
} from '../../../../flows/activity-feed/action';

import NewFeed from './container';

export const mapStateToProps = (state) => ({
  cartStore: state.cart,
  userStore: state.user,
  shopStore: state.shop,
  authStore: state.auth,
  magazineStore: state.magazine,
  feedbackStore: state.feedback,
  activityFeedStore: state.activityFeed
});

export const mapDispatchToProps = (dispatch) => ({
  getCollectionAction: (data: any) => dispatch(getCollectionAction(data)),
  getCollectionDetailAction: (data: any) => dispatch(getCollectionDetailAction(data)),
  fecthActivityFeedListAction: (data: any) => dispatch(fecthActivityFeedListAction(data)),
  fetchCommunityHashtagFeedsAction: (data: any) => dispatch(fetchCommunityHashtagFeedsAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  clearDataCollectionAction: () => dispatch(clearDataCollectionAction()),
  clearDataActivityFeedListAction: () => dispatch(clearDataActivityFeedListAction()),
  clearDataActivityFeedCommentListAction: () => dispatch(clearDataActivityFeedCommentListAction()),
  fetchCommunityHotBoxes: (data) => dispatch(fetchCommunityHotBoxes(data)),
  fetchCommunityGoodSale: (data) => dispatch(fetchCommunityGoodSale(data)),
  fetchCommunityTopReview: (data) => dispatch(fetchCommunityTopReview(data)),
  fetchCommunityTopLiked: (data) => dispatch(fetchCommunityTopLiked(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NewFeed);
