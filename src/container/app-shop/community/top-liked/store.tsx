import { connect } from 'react-redux';

import { fetchCommunityTopLiked } from '../../../../flows/activity-feed/action';

import TopLiked from './container';

export const mapStateToProps = (state) => ({
  activityFeedStore: state.activityFeed,
  authStore: state.auth,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCommunityTopLiked: (data) => dispatch(fetchCommunityTopLiked(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopLiked);
