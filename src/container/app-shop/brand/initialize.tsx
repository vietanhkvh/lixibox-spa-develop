import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  type: 'full',
  column: 4,
  perPage: 24
} as IProps;

export const INITIAL_STATE = {
  urlList: [],
  page: 1,
  isSubCategoryOnTop: false,
  heightSubCategoryToTop: 0,
  canViewMore: false
} as IState;
