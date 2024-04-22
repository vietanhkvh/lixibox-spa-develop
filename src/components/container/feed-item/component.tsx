import { Component } from 'react';

import { objectToHash } from '../../../utils/encode';
import { isUndefined, isCompareObject, isEmptyObject } from '../../../utils/validate';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import { storageKey } from '../../../constants/application/client-storage';
import { auth } from '../../../utils/auth';
import { gatewayTrackViewedFeed } from 'tracking/gateway';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import { renderView } from './view';
import { IFeedProps, IFeedState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';

class FeedItem extends Component<IFeedProps, IFeedState> {
  static defaultProps: IFeedProps = DEFAULT_PROPS;
  private inputCommentRef: any;
  private fetchTimerId: any;

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.fetchTimerId = null;
  }

  handleViewMore() {
    this.setState({ isViewMore: true });
  }

  handleShowComment() {
    this.autoShowComment(this.props);

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.FEED_COMPONENT.VIEW_COMMNENT,
      value: 1
    });
  }

  autoShowComment(props = this.props) {
    const {
      item,
      fecthActivityFeedCommentListAction,
      activityFeedStore: {
        activityFeedCommentList: { commentList }
      }
    } = props;

    if (!isEmptyObject(item)) {
      const keyHash = objectToHash({ id: item.id });
      const param = { id: item.id, page: 1, perPage: 50 };

      commentList && !isUndefined(commentList[keyHash])
        ? this.setState({ commentList: commentList[keyHash] })
        : fecthActivityFeedCommentListAction(param);

      this.setState({ isShowComments: true });
    }
  }

  handleShowInputComment() {
    this.inputCommentRef && this.inputCommentRef.focus();
    this.setState({ isShowInputComment: true });
  }

  handleSubmit() {
    const { answerComment } = this.state as IFeedState;
    const { item, addActivityFeedCommentAction } = this.props as IFeedProps;

    const comment = (answerComment && answerComment.trim()) || '';
    if (0 === comment.length) {
      return;
    }

    addActivityFeedCommentAction({
      id: item.id,
      content: comment
    });

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.FEED_COMPONENT.POST_COMMENT,
      value: 1
    });
  }

  handleLike() {
    const { addActivityFeedLikeAction, deleteActivityFeedLikeAction } = this.props;
    const likeNumber = this.state.likeNum || 0;
    let tmpLikeNum = 0;

    if (this.state.isLike) {
      tmpLikeNum = likeNumber > 0 ? likeNumber - 1 : 0;
      deleteActivityFeedLikeAction({ id: this.props.item.id });
    } else {
      tmpLikeNum = likeNumber + 1;
      addActivityFeedLikeAction({ id: this.props.item.id });
    }

    this.setState({
      isLike: !this.state.isLike,
      likeNum: tmpLikeNum
    });

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label:
        GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.FEED_COMPONENT[
          !!this.state.isLike ? 'UN_LIKE' : 'LIKE'
        ],
      value: 1
    });
  }

  handleInputOnChange(e) {
    this.setState({ answerComment: e.target.value });
  }

  handleInputOnFocus() {
    this.setState({ errorMessage: '' } as IFeedState);
  }

  handleShowVideo() {
    this.props.onDisableVideo();
    setTimeout(() => this.setState({ isShowVideo: true } as IFeedState), 500);
  }

  handleShareLink() {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.FEED_COMPONENT.SHARE_FEED,
      value: 1
    });
  }

  handleBookmarkBox(box, isLiked) {
    const { likeProduct, unLikeProduct, openModal } = this.props;

    if (auth.loggedIn() && box) {
      !!isLiked ? unLikeProduct(box) : likeProduct(box);
    } else {
      openModal(MODAL_SIGN_IN());
    }

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.FEED_COMPONENT.BOOKMARK_BOX,
      value: 1
    });
  }

  setInputCommentRef(ref) {
    this.inputCommentRef = ref;
  }

  componentDidMount() {
    const { item, showComment } = this.props;
    item && gatewayTrackViewedFeed({ feed: item });

    showComment && this.handleShowComment();

    this.setState({
      isLike: item.liked,
      likeNum: item.total_likes || 0
    });

    const adminSimulate = localStorage.getItem(storageKey.ADMIN_SIMULATE);
    if ('admin' === adminSimulate) {
      if (!item.liked) {
        this.props.addActivityFeedLikeAction({ id: this.props.item.id });
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      item,
      fecthActivityFeedCommentListAction,
      activityFeedStore: {
        isAddCommentSuccess,
        isAddingComment,
        isFetchActivityFeedDetailSuccess,
        activityFeedCommentList: { isFetchCommentListSuccess },
        activityFeedUpdate,
        activityFeedDelete
      }
    } = this.props;

    const {
      activityFeedStore: {
        activityFeedCommentList: { commentList }
      }
    } = nextProps;

    const keyHash = objectToHash({ id: (item && item.id) || 0 });

    const _commentList =
      commentList && !isUndefined(commentList[keyHash]) ? commentList[keyHash] : this.state.commentList;

    !isFetchCommentListSuccess &&
      nextProps.activityFeedStore.activityFeedCommentList.isFetchCommentListSuccess &&
      this.setState({ commentList: _commentList });

    !isAddCommentSuccess &&
      nextProps.activityFeedStore.isAddCommentSuccess &&
      this.setState({ commentList: _commentList, answerComment: '' });

    !isFetchActivityFeedDetailSuccess &&
      nextProps.activityFeedStore.isFetchActivityFeedDetailSuccess &&
      this.autoShowComment(nextProps);

    activityFeedUpdate.updating &&
      !nextProps.activityFeedStore.activityFeedUpdate.updating &&
      fecthActivityFeedCommentListAction({ id: item.id, page: 1, perPage: 50 });

    activityFeedDelete.deleting &&
      !nextProps.activityFeedStore.activityFeedDelete.deleting &&
      fecthActivityFeedCommentListAction({ id: item.id, page: 1, perPage: 50 });

    if (
      isAddingComment &&
      !nextProps.activityFeedStore.isAddingComment &&
      nextProps.activityFeedStore.isAddCommentSuccess
    ) {
      this.fetchTimerId = setTimeout(() => {
        fecthActivityFeedCommentListAction({ id: item.id, page: 1, perPage: 50 });
      }, 1000);
    }

    if (!this.props.forceDisableVideo && !!nextProps.forceDisableVideo) {
      this.setState({ isShowVideo: false } as IFeedState);
    }
  }

  componentWillUnmount() {
    clearInterval(this.fetchTimerId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (false === this.state.isShowComments && true === nextState.isShowComments) {
      return true;
    }
    if (false === this.state.isViewMore && true === nextState.isViewMore) {
      return true;
    }
    if (false === this.state.isShowVideo && true === nextState.isShowVideo) {
      return true;
    }
    if (this.state.likeNum !== nextState.likeNum) {
      return true;
    }
    if (true === this.state.isShowComments) {
      return true;
    }
    if (this.state.answerComment !== nextState.answerComment) {
      return true;
    }
    if (nextProps.isFeedDetail !== this.props.isFeedDetail) {
      return true;
    }
    if (!isCompareObject(this.props.item, nextState.item)) {
      return true;
    }
    if (!isCompareObject(nextProps.userProfile, this.props.userProfile)) {
      return true;
    }

    if (!this.props.forceDisableVideo && !!nextProps.forceDisableVideo) {
      return true;
    }

    return false;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleLike: this.handleLike.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
      handleViewMore: this.handleViewMore.bind(this),
      handleShowVideo: this.handleShowVideo.bind(this),
      handleShareLink: this.handleShareLink.bind(this),
      handleBookmarkBox: this.handleBookmarkBox.bind(this),
      handleShowComment: this.handleShowComment.bind(this),
      setInputCommentRef: this.setInputCommentRef.bind(this),
      handleInputOnFocus: this.handleInputOnFocus.bind(this),
      handleInputOnChange: this.handleInputOnChange.bind(this),
      handleShowInputComment: this.handleShowInputComment.bind(this)
    };

    return renderView(args);
  }
}
export default FeedItem;
