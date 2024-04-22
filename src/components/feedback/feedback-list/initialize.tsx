import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  title: '',
  showHeader: true,
  feedbacks: [],
  boxesToFeedback: [],
  isShowPagination: false
} as IProps;

export const INITIAL_STATE = {
  isLoadingAddToCard: false,
  addItemToCart: () => {}
} as IState;
