export interface IProps {
  data: any;
  style?: any;

  feedbackStore?: any;

  closeModalAction?: any;
  openAlertAction?: any;
}

export interface IState {
  rate?: number;
  errorMessage?: string;
  submitLoading?: boolean;

  textareaValue?: string;
}
