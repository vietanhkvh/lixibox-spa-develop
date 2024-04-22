import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  title: '',
  showHeader: true,
  urlList: []
} as IProps;

export const INITIAL_STATE = {
  isLoadingList: true
} as IState;
