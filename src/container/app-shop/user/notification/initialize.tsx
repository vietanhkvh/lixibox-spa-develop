import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  perPage: 10
} as IProps;

export const INITIAL_STATE = {
  urlList: [],
  page: 1
} as IState;
