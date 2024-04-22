import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import {
  fecthActivityFeedListAction,
  fetchCommunityHashtagFeedsAction,
  getUserCommunityProfileAction,
  clearDataActivityFeedListAction,
  clearDataActivityFeedCommentListAction
} from '../../../../flows/activity-feed/action';

import UserFeedContainer from './container';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  activityFeedStore: state.activityFeed,
  shopStore: state.shop,
  magazineStore: state.magazine,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  getUserCommunityProfileAction: (data) => dispatch(getUserCommunityProfileAction(data)),
  clearDataActivityFeedListAction: () => dispatch(clearDataActivityFeedListAction()),
  fecthActivityFeedListAction: (data: any) => dispatch(fecthActivityFeedListAction(data)),
  fetchCommunityHashtagFeedsAction: (data: any) => dispatch(fetchCommunityHashtagFeedsAction(data)),
  clearDataActivityFeedCommentListAction: () => dispatch(clearDataActivityFeedCommentListAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UserFeedContainer);
