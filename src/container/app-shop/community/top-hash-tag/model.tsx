export interface ITopHashTagProps {
  history?: any;
  authStore?: any;
  activityFeedStore: any;
  feedbackStore?: any;
  fetchCommunityHashtagFeedsAction?: any;
}

export interface ITopHashTagState {
  isOpenScreenHeaderDropdown: boolean;
  selectedHashIndex: number;
}
