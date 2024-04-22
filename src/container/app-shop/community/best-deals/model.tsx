export interface IProps {
  days?: number;
  limit?: number;

  history?: any;
  location?: any;

  authStore?: any;
  cartStore?: any;
  shopStore?: any;
  magazineStore?: any;
  activityFeedStore?: any;
  feedbackStore?: any;

  updateMetaInfoAction?: any;
  fecthActivityFeedListAction: any;
  fetchCommunityHashtagFeedsAction: any;
  fecthActivityFeedCommentListAction: any;

  clearDataActivityFeedListAction?: any;
  clearDataActivityFeedCommentListAction?: any;
  fetchCommunityHotBoxes?: any;
  fetchCommunityGoodSale?: any;
  fetchCommunityTopReview?: any;
  fetchCommunityTopLiked?: any;
  isFetchCommunityHotBoxes: boolean;
  isFetchCommunityGoodSale: boolean;
  isFetchCommunityTopReview: boolean;
  isFetchCommunityTopLiked: boolean;
}

export interface IState {
  isLoading?: boolean;
  pageLoadMore?: number;
  isFeebackFull?: boolean;
  topFeedList?: any;
}
