export interface IProps {
  title?: string;
  style?: any;
  showHeader?: boolean;

  feedbacks?: any;
  boxesToFeedback?: any;

  isAddCartSuccess?: any;
  isAddCartFail?: any;

  onSubmitEditForm?: any;

  currentNotFeedback?: any;
  perNotFeedback?: any;
  totalNotFeedback?: any;
  urlNotFeedbackList?: any;
  currentFeedbacked?: any;
  perFeedbacked?: any;
  totalFeedbacked?: any;
  urlFeedbackedList?: any;
  handleNotFeedback?: any;
  handleFeedbacked?: any;
  isShowPagination?: boolean;
  isCartSummaryVisible?: boolean;

  addItemToCartAction?: any;
  openModalAction?: any;
}

export interface IState {
  isLoadingAddToCard: boolean;
  addItemToCart: (number, nubmer, boolean) => void;
}
