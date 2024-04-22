import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  title: '',
  showHeader: true,
  urlList: [],
  isNotShowLoading: false
} as IProps;

export const INITIAL_STATE = {
  isLoadingList: false
} as IState;
