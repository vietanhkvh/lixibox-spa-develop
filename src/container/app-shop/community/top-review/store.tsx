import { connect } from 'react-redux';

import { fetchCommunityTopReview } from '../../../../flows/activity-feed/action';

import TopReview from './container';

export const mapStateToProps = (state) => ({
  activityFeedStore: state.activityFeed,
  authStore: state.auth,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCommunityTopReview: (data) => dispatch(fetchCommunityTopReview(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopReview);
