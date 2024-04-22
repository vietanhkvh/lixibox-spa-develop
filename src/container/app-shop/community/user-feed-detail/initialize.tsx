import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  limit: 10
} as IProps;

export const INITIAL_STATE = {
  showCommunityHashTag: false,
  isLoading: false,
  isFeebackFull: false
} as IState;
