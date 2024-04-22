import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  type: 'full',
  column: 5,
  perPage: 30
} as IProps;

export const INITIAL_STATE = {
  urlList: [],
  filterBrands: [],

  page: 1,
  heightSubCategoryToTop: 0,

  isLoading: false,
  showFilter: false,
  showSubCategory: false,
  isSubCategoryOnTop: false
} as IState;
