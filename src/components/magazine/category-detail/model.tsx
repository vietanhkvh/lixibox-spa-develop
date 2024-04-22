import { Magazine } from 'types/api/magazine';

export interface IProps {
  list?: any;
  slug?: any;
  isTagUrl?: boolean;
  categories?: any;
  isShowCategory?: boolean;
  isShowMobileBreadCrumb?: boolean;
  magazineDashboard?: any;
  onItemClick?: (magazine: Magazine, index: number) => void;
}

export interface IState {
  isSubCategoryOnTop?: boolean;
  heightSubCategoryToTop?: number;
  showSubCategory?: boolean;
}
