import { connect } from 'react-redux';

import { addFeedbackAction } from '../../../../../flows/feedback/action';
import { getProductDetailAction } from '../../../../../flows/shop/action';
import { openModalAction } from '../../../../../flows/modal/action';
import FeedbackNewInnerBlock from './component';

export const mapStateToProps = (state) => ({
  shopStore: state.shop,
  feedbackStore: state.feedback,
  cartStore: state.cart
});

export const mapDispatchToProps = (dispatch) => ({
  getProductDetailAction: (data) => dispatch(getProductDetailAction(data)),
  addFeedbackAction: (data) => dispatch(addFeedbackAction(data)),
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(FeedbackNewInnerBlock);
