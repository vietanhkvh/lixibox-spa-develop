import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateMetaInfoAction } from '../../../../../flows/meta/action';
import {
  getCollectionAction,
  getCollectionDetailAction,
  fecthActivityFeedListAction,
  fetchCommunityHashtagFeedsAction,
  clearDataCollectionAction,
  clearDataActivityFeedListAction,
  clearDataActivityFeedCommentListAction
} from '../../../../../flows/activity-feed/action';

import FeedbackRightPanel from './container';

export const mapStateToProps = (state) => ({
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
  clearDataActivityFeedCommentListAction: () => dispatch(clearDataActivityFeedCommentListAction())
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(FeedbackRightPanel));
