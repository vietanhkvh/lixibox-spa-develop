import { connect } from 'react-redux';

import { fetchCommunityHotBoxes } from '../../../../flows/activity-feed/action';

import TopHotBoxes from './container';

export const mapStateToProps = (state) => ({
  activityFeedStore: state.activityFeed,
  authStore: state.auth,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCommunityHotBoxes: (data) => dispatch(fetchCommunityHotBoxes(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopHotBoxes);
