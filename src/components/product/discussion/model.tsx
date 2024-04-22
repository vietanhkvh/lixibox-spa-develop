export interface IProps {
  productId?: any;

  discussionStore?: any;
  authStore?: any;

  addDiscussion?: any;
  addDiscussionComment?: any;
  fetchDiscussionsBoxes?: any;
  openModal?: any;
  isSticky?: boolean;
  perPage?: number;
  scrollId?: any;
  scrollToElementNum?: any;
  isOnModal?: boolean;
  onReply?: any;
}

export interface IState {
  txtComment?: string;
  submitLoading?: boolean;
  page?: number;
  urlList?: Array<any>;
  isFetchApi?: boolean;
  isLoading?: boolean;
  isFirstLoading?: boolean;
  replyComment?: any;
}
