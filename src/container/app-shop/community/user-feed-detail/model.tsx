export interface IProps {
  limit?: number;
  match?: any;
  history?: any;
  location?: any;

  authStore: any;
  activityFeedStore: any;
  shopStore?: any;
  magazineStore?: any;
  feedbackStore?: any;

  getCollectionAction?: any;
  updateMetaInfoAction?: any;
  fetchUserProfileAction: any;
  fecthActivityFeedListAction: any;
  fetchCommunityHashtagFeedsAction: any;
  fecthActivityFeedCommentListAction: any;
  clearDataActivityFeedListAction?: any;
  clearDataActivityFeedCommentListAction?: any;
  getUserCommunityProfileAction?: any;
}

export interface IState {
  isLoading?: boolean;
  isFeebackFull?: boolean;
}
