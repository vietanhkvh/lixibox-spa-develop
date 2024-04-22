import { connect } from 'react-redux';

import {
  addDiscussionAction,
  addDiscussionCommentAction,
  fetchDiscussionsBoxesAction
} from '../../../flows/discussion/action';
import { openModalAction } from '../../../flows/modal/action';

import ProductComment from './component';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  discussionStore: state.discussion
});

export const mapDispatchToProps = (dispatch) => ({
  addDiscussion: (data: any): void => dispatch(addDiscussionAction(data)),
  addDiscussionComment: (data: any): void => dispatch(addDiscussionCommentAction(data)),
  fetchDiscussionsBoxes: (data: any): void => dispatch(fetchDiscussionsBoxesAction(data)),
  openModal: (data: any) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProductComment);
