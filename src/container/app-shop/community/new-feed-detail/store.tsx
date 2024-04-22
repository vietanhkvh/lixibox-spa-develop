import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import {
  fetchActivityFeedDetailAction,
  clearDataActivityFeedDetailAction,
  clearDataActivityFeedCommentListAction
} from '../../../../flows/activity-feed/action';

import NewFeedDetailContainer from './container';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  activityFeedStore: state.activityFeed,
  shopStore: state.shop,
  magazineStore: state.magazine,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  fetchActivityFeedDetailAction: (data: any) => dispatch(fetchActivityFeedDetailAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  clearDataActivityFeedDetailAction: () => dispatch(clearDataActivityFeedDetailAction()),
  clearDataActivityFeedCommentListAction: () => dispatch(clearDataActivityFeedCommentListAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NewFeedDetailContainer);
