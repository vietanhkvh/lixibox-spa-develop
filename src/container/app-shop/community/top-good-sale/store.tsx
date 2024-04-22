import { connect } from 'react-redux';

import { fetchCommunityGoodSale } from '../../../../flows/activity-feed/action';

import TopGoodSale from './container';

export const mapStateToProps = (state) => ({
  activityFeedStore: state.activityFeed,
  feedbackStore: state.feedback,
  authStore: state.auth
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCommunityGoodSale: (data) => dispatch(fetchCommunityGoodSale(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopGoodSale);
