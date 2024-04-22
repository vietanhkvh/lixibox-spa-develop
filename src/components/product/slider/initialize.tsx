import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: [],
  title: 'Danh sách Sản phẩm',
  viewMoreText: 'Xem thêm',
  type: 'full',
  style: {},
  sliderStyle: {},
  description: '',
  viewMoreLink: '',
  column: 3,
  lineTextNumber: 0,
  isShowHeader: true,
  isCustomTitle: false,
  isShowViewMore: true,
  isShowQuickView: true,
  isShowQuickBuy: false,
  isShowLike: true,
  displayCartSumaryOption: true,
  isShowPagination: false,
  isShowCurrentPrice: false,
  isShowRating: true,
  isShowHorizontal: false,
  isShowImage: false,
  productIdSelected: '',
  isShowCartSummary: false,
  isSpecialAddOn: false,
  referrerTracking: {}
} as IProps;

export const INITIAL_STATE = (data: any) =>
  ({
    productSlideSelected: {},
    productList: data || [],
    productSlide: [],
    countChangeSlide: 0,
    firstInit: false,
    animating: false
  } as IState);
