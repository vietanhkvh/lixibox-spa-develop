import { IProps, IState } from './model';
import { CATEGORY_FILTER } from '../../../constants/application/category.config';

export const DEFAULT_PROPS = {
  productByCategory: {},

  type: 'full',
  viewMore: 'Xem thêm',
  title: 'Danh sách Sản phẩm',

  column: 3,
  brandShowNumber: 18,

  showCategory: () => {},
  showFilter: () => {},
  onSelectSort: (sort) => {},
  onSelectBrand: (brand) => {},

  listMenu: {},
  viewGroupTrackingList: {}
} as IProps;

export const INITIAL_STATE = {
  sortList: CATEGORY_FILTER.sort.value,

  brandSlugSelected: '',

  urlList: [],
  brandList: [],
  itemSelected: [],
  categoryList: [],
  categorySlideList: [],
  saveStepCategoryList: [],

  isShowSort: false,
  isShowFilter: false,
  isSubCategoryOnTop: false,
  isShowCategoryModal: false,
  isShowViewMoreBrand: false,

  heightSubCategoryToTop: 0
} as IState;
