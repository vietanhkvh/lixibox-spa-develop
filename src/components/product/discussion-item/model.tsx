export interface IProps {
  openModal?: any;
  commentChild?: any;
  addDiscussionComment?: any;
  hasLastChild?: boolean;
  userInfo?: any;
  isAddDiscussionCommentSuccess?: any;
  onReply?: any;
}

export interface IState {
  txtComment?: string;
  loginSubmitLoading?: boolean;
  isShowReply?: boolean;
}
