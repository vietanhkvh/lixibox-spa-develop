import { connect } from 'react-redux';
import { fetchFeedbackByIdAction, shareBoxOnFacebookAction } from '../../../flows/feedback/action';
import { openAlertAction } from '../../../flows/alert/action';
import { openModalAction } from '../../../flows/modal/action';
import OrderFeedback from './component';

const mapStateToProps = (state) => ({
  cartStore: state.cart,
  feedbackStore: state.feedback
});
const mapDispatchToProps = (dispatch) => ({
  fetchFeedbackByIdAction: (data) => dispatch(fetchFeedbackByIdAction(data)),
  openAlertAction: (data) => dispatch(openAlertAction(data)),
  shareBoxOnFacebookAction: (data) => dispatch(shareBoxOnFacebookAction(data)),
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(OrderFeedback);
