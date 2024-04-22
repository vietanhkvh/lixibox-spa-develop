import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  days: 7,
  limit: 10
} as IProps;

export const INITIAL_STATE = {
  isLoading: false,
  urlList: []
} as IState;
