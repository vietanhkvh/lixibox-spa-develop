export interface ITopReviewProps {
  history?: any;
  authStore?: any;
  activityFeedStore: any;
  fetchCommunityTopReview?: any;
  feedbackStore?: any;
}

export interface ITopReviewState {
  isOpenScreenHeaderDropdown: boolean;
  isDisplayMobileAutoHeaeder: boolean;
}
