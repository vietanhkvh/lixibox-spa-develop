export interface IProps {
  history?: any;
  children: any;
  routes: any;
  location?: any;

  cartStore?: any;
  feedbackStore?: any;
  fetchUserFeedbacksAction?: any;
  fetchUserBoxesToFeedbackAction?: any;
  editFeedbackAction?: any;
  perPageFeedbacked?: number;
  perPageNotFeedback?: number;
  addItemToCartAction?: any;
  openModalAction?: any;
}

export interface IState {
  urlFeedbackedList: Array<any>;
  urlNotFeedbackList: Array<any>;
  pageFeedbacked: any;
  pageNotFeedback: any;
}
