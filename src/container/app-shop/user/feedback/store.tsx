import { connect } from 'react-redux';

import {
  editFeedbackAction,
  fetchUserFeedbacksAction,
  fetchUserBoxesToFeedbackAction
} from '../../../../flows/feedback/action';
import { addItemToCartAction } from '../../../../flows/cart/action';
import { openModalAction } from '../../../../flows/modal/action';

import FeedbackContainer from './container';

const mapStateToProps = (state) => ({
  feedbackStore: state.feedback,
  cartStore: state.cart
});

const mapDispatchToProps = (dispatch) => ({
  openModalAction: (data) => dispatch(openModalAction(data)),
  editFeedbackAction: (data) => dispatch(editFeedbackAction(data)),
  addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
  fetchUserFeedbacksAction: (data) => dispatch(fetchUserFeedbacksAction(data)),
  fetchUserBoxesToFeedbackAction: (data) => dispatch(fetchUserBoxesToFeedbackAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
