export interface INewFeedProps {
  days?: number;
  limit?: number;

  match?: any;
  history?: any;
  location?: any;

  cartStore;
  authStore: any;
  userStore: any;
  shopStore?: any;
  magazineStore?: any;
  feedbackStore?: any;
  activityFeedStore: any;

  getCollectionAction?: any;
  updateMetaInfoAction?: any;
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

export interface INewFeedState {
  isLoading?: boolean;
  isFeedbackFull?: boolean;
  isFetchFeedList?: boolean;
  isPriorityBlock?: boolean;
  showCommunityHashTag?: boolean;
  pageLoadMore: number;
  topFeedList?: any;
}
