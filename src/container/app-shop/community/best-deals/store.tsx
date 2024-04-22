import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import {
  fecthActivityFeedListAction,
  clearDataActivityFeedListAction,
  fetchCommunityHashtagFeedsAction,
  clearDataActivityFeedCommentListAction,
  fetchCommunityHotBoxes,
  fetchCommunityGoodSale,
  fetchCommunityTopReview,
  fetchCommunityTopLiked
} from '../../../../flows/activity-feed/action';

import BestDealsContainer from './container';

export const mapStateToProps = (state) => ({
  shopStore: state.shop,
  authStore: state.auth,
  cartStore: state.cart,
  magazineStore: state.magazine,
  feedbackStore: state.feedback,
  activityFeedStore: state.activityFeed
});

export const mapDispatchToProps = (dispatch) => ({
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  fecthActivityFeedListAction: (data: any) => dispatch(fecthActivityFeedListAction(data)),
  fetchCommunityHashtagFeedsAction: (data: any) => dispatch(fetchCommunityHashtagFeedsAction(data)),

  clearDataActivityFeedListAction: () => dispatch(clearDataActivityFeedListAction()),
  clearDataActivityFeedCommentListAction: () => dispatch(clearDataActivityFeedCommentListAction()),
  fetchCommunityHotBoxes: (data) => dispatch(fetchCommunityHotBoxes(data)),
  fetchCommunityGoodSale: (data) => dispatch(fetchCommunityGoodSale(data)),
  fetchCommunityTopReview: (data) => dispatch(fetchCommunityTopReview(data)),
  fetchCommunityTopLiked: (data) => dispatch(fetchCommunityTopLiked(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BestDealsContainer);
