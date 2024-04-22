export interface IProps {
  days?: number;
  limit?: number;

  match?: any;
  history?: any;
  location?: any;

  authStore: any;
  userStore: any;
  cartStore: any;
  shopStore?: any;
  magazineStore?: any;
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
  fetchCommunityHotBoxes?: any;
  fetchCommunityGoodSale?: any;
  fetchCommunityTopReview?: any;
  fetchCommunityTopLiked?: any;
}

export interface IState {
  isLoading?: boolean;
  pageLoadMore?: number;
  isFeedbackFull?: boolean;
  isFetchFeedList?: boolean;
  isPriorityBlock?: boolean;
  topFeedList?: any;
  showCommunityHashTag?: boolean;
}
