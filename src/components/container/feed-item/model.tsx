export interface IFeedProps {
  history?: any;
  item?: any;
  style?: any;
  type?: string;
  limitTextLength?: number;
  userProfile?: any;
  isLastChild?: boolean;

  activityFeedStore?: any;
  authStore?: any;

  fecthActivityFeedCommentListAction?: any;
  addActivityFeedCommentAction?: any;
  addActivityFeedLikeAction?: any;
  deleteActivityFeedLikeAction?: any;
  openModal?: any;
  showComment?: boolean;
  listLikedId?: any;
  likeProduct?: any;
  unLikeProduct?: any;
  isShowImage?: boolean;
  isShowFullImage?: boolean;
  isShowContent?: boolean;
  isFeedDetail?: boolean;
  isFixSizeCover?: boolean;
  forceDisableVideo?: boolean;
  onDisableVideo?: any;
}

export interface IFeedState {
  isViewMore?: boolean;
  isShowComments?: boolean;
  isShowInputComment?: boolean;
  isResetInput?: boolean;
  isLike?: boolean;
  commentList?: any;
  likeNum?: number;
  isShowVideo?: boolean;
  answerComment?: string;

  errorMessage?: string;

  inputComment?: {
    value?: string;
  };
}
