import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  perPageFeedbacked: 12,
  perPageNotFeedback: 12
} as IProps;

export const INITIAL_STATE = {
  urlFeedbackedList: [],
  urlNotFeedbackList: [],
  pageFeedbacked: 1,
  pageNotFeedback: 1
} as IState;
