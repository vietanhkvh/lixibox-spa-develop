export interface IFeedbackRightPanelProps {
  limit?: number;

  match?: any;
  history?: any;
  location?: any;

  feedbackStore?: any;
  activityFeedStore: any;

  getCollectionAction?: any;
  updateMetaInfoAction?: any;
  fetchUserProfileAction: any;
  getCollectionDetailAction?: any;
  fecthActivityFeedListAction: any;
  fetchCommunityHashtagFeedsAction: any;
  fecthActivityFeedCommentListAction: any;
  clearDataActivityFeedListAction?: any;
  clearDataCollectionAction?: any;
  clearDataActivityFeedCommentListAction?: any;
}

export interface IFeedbackRightPanelState {
  isLoading?: boolean;
  isFeedbackFull?: boolean;
  isFetchFeedList?: boolean;
  isPriorityBlock?: boolean;
  showCommunityHashTag?: boolean;
}
