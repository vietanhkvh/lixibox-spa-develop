import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  match: {
    params: {
      keyWordSearch: ''
    }
  },
  showProductNum: 4,
  perPage: 28
} as IProps;

export const INITIAL_STATE = {
  urlList: [],
  filterBrands: [],
  page: 1,
  heightSubCategoryToTop: 0,

  isLoading: false,
  showFilter: false,
  isSubCategoryOnTop: false,
  isExitingWithoutAction: true
} as IState;
