import { connect } from 'react-redux';
import { fetchUserFeedbacksAction } from '../../../../../flows/feedback/action';
import { openModalAction } from '../../../../../flows/modal/action';
import SubmittedFeedbacks from './container';

const mapStateToProps = (state) => ({
  feedbackStore: state.feedback
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserBoxesToFeedbackAction: (data) => dispatch(fetchUserFeedbacksAction(data)),
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SubmittedFeedbacks);
