export interface IProps {
  history?: any;
  location?: any;
  match?: any;

  authStore: any;
  activityFeedStore?: any;
  shopStore?: any;
  magazineStore?: any;
  feedbackStore?: any;

  fetchActivityFeedDetailAction: any;
  updateMetaInfoAction?: any;
  clearDataActivityFeedDetailAction?: any;
  clearDataActivityFeedCommentListAction?: any;
}

export interface IState {}
