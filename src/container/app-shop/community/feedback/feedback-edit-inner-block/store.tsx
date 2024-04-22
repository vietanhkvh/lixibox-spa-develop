import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchFeedbackByIdAction,
  editFeedbackAction,
  addFeedbackImagesAction,
  deleteFeedbackImageAction
} from '../../../../../flows/feedback/action';
import { openAlertAction } from '../../../../../flows/alert/action';
import { openModalAction } from '../../../../../flows/modal/action';
import container from './container';

export const mapStateToProps = (state) => ({
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  fetchFeedbackByIdAction: (data) => dispatch(fetchFeedbackByIdAction(data)),
  editFeedbackAction: (data) => dispatch(editFeedbackAction(data)),
  addFeedbackImagesAction: (data) => dispatch(addFeedbackImagesAction(data)),
  deleteFeedbackImageAction: (data) => dispatch(deleteFeedbackImageAction(data)),
  openAlertAction: (data: any) => dispatch(openAlertAction(data)),
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(container));
