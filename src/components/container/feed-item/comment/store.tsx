import { connect } from 'react-redux';
import {
  deleteActivityFeedCommentAction,
  updateActivityFeedCommentAction
} from '../../../../flows/activity-feed/action';
import Comment from './component';

export const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateActivityFeedCommentAction: (data: any) => dispatch(updateActivityFeedCommentAction(data)),
  deleteActivityFeedCommentAction: (data: any) => dispatch(deleteActivityFeedCommentAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Comment);
