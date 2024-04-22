import { connect } from 'react-redux';

import { fetchCommunityHashtagFeedsAction } from '../../../../flows/activity-feed/action';

import TopHashTag from './container';

export const mapStateToProps = (state) => ({
  activityFeedStore: state.activityFeed,
  authStore: state.auth,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCommunityHashtagFeedsAction: (data) => dispatch(fetchCommunityHashtagFeedsAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopHashTag);
