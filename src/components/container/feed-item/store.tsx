import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fecthActivityFeedCommentListAction,
  addActivityFeedCommentAction,
  addActivityFeedLikeAction,
  deleteActivityFeedLikeAction
} from '../../../flows/activity-feed/action';
import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';
import { openModalAction } from '../../../flows/modal/action';

import FeedItem from './component';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  listLikedId: state.like.liked.id,
  activityFeedStore: state.activityFeed
});

export const mapDispatchToProps = (dispatch) => ({
  fecthActivityFeedCommentListAction: (data: any) => dispatch(fecthActivityFeedCommentListAction(data)),
  addActivityFeedCommentAction: (data: any) => dispatch(addActivityFeedCommentAction(data)),
  addActivityFeedLikeAction: (data: any) => dispatch(addActivityFeedLikeAction(data)),
  deleteActivityFeedLikeAction: (data: any) => dispatch(deleteActivityFeedLikeAction(data)),
  openModal: (data: any) => dispatch(openModalAction(data)),
  likeProduct: (productId) => dispatch(likeProductAction(productId)),
  unLikeProduct: (productId) => dispatch(UnLikeProductAction(productId))
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(FeedItem));
