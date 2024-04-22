import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  match: {
    params: {
      keyWordSearch?: any;
    };
  };

  location?: any;
  history?: any;

  showProductNum?: number;

  perPage?: any;
}

export interface IState {
  isLoading?: boolean;
  urlList: Array<any>;
  filterBrands: Array<any>;
  page: any;
  isSubCategoryOnTop?: boolean;
  heightSubCategoryToTop?: number;
  showFilter?: boolean;
  /**
   * Triggered when user navigates to another page without executing any of the following action
   * - view a box detail
   * - view a magazine detail
   * - pagination button click
   * - sort
   * - filter
   */
  isExitingWithoutAction?: boolean;
}
