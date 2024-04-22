import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  orderList: [],
  title: '',
  showHeader: true,
  isNotShowLoading: false
} as IProps;

export const INITIAL_STATE = {
  isLoadingList: false
} as IState;
