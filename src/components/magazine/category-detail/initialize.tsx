import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  categories: [],
  slug: '',
  isShowCategory: true,
  isTagUrl: false,
  isShowMobileBreadCrumb: true
} as IProps;

export const INITIAL_STATE = {
  isSubCategoryOnTop: false,
  heightSubCategoryToTop: 0,
  showSubCategory: false
} as IState;
