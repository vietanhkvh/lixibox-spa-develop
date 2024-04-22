import { ProductBox } from 'types/api/shop';

export interface IProps {
  type?: string;
  title?: string;
  viewMore?: string;
  idCategory?: string;
  history?: any;

  column?: number;
  brandShowNumber?: number;

  location?: any;
  onSelectSort?: any;
  onSelectBrand?: any;
  productByCategory: any;

  listMenu?: any;
  viewGroupTrackingList?: any;

  likedIdList?: any;
  stockStatus?: string;
  fetchFilteredProductsByCategory?: any;
  openModalAction?: any;
  selectGiftAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
  categoryFilterHash?: any;

  hiddenToolBar?: boolean;
  onItemClick?: (box: ProductBox, index: number) => void;
}

export interface IState {
  urlList: Array<any>;
  sortList: Array<any>;
  brandList: Array<any>;
  categoryList: Array<any>;
  itemSelected: Array<any>;
  categorySlideList?: Array<any>;
  saveStepCategoryList: Array<any>;

  hoverSort?: boolean;
  isShowSort?: boolean;
  isShowFilter?: boolean;
  isSubCategoryOnTop?: boolean;
  isShowCategoryModal?: boolean;
  isShowViewMoreBrand?: boolean;

  heightSubCategoryToTop?: number;

  brandSlugSelected?: string;
}
