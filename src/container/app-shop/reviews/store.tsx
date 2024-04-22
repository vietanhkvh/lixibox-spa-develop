import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../flows/meta/action';
import { fetchFeedbackByIdAction } from '../../../flows/feedback/action';

import ReviewsContainer from './container';

export const mapStateToProps = (state) => ({
  userStore: state.user,
  authStore: state.auth,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  fetchFeedbackByIdAction: (data: any) => dispatch(fetchFeedbackByIdAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
