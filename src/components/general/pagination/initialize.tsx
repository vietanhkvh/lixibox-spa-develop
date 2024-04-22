import { IPaginationState, IPaginationProps } from './model';

export const DEFAULT_PROPS = {
  current: 0,
  per: 0,
  total: 0,
  urlList: [],
  canScrollToTop: true,
  elementId: '',
  scrollToElementNum: 0
} as IPaginationProps;

export const INITIAL_STATE = { list: [] } as IPaginationState;
