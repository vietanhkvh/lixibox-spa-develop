export interface IProps {
  match?: any;
  feedbackStore?: any;
  userStore?: any;
  authStore?: any;

  updateMetaInfoAction?: any;
  fetchFeedbackByIdAction?: any;
}

export interface IState {
  isLoading?: boolean;
}
