export interface IProps {
  style?: any;
  sliderStyle?: any;
  title?: string;
  description?: string;
  isShowHeader?: boolean;
  isCustomTitle?: boolean;
  column?: number;
  viewMoreText?: string;
  viewMoreLink?: string;
  isShowViewMore?: boolean;
  type?: string;
  data?: Array<any>;
  isShowQuickView?: boolean;
  isShowQuickBuy?: boolean;
  isShowLike?: boolean;
  displayCartSumaryOption?: boolean;
  lineTextNumber?: number;
  isShowPagination?: boolean;
  isShowCurrentPrice?: boolean;
  isShowRating?: boolean;
  titleStyle?: any;
  isShowHorizontal?: boolean;
  isShowImage?: boolean;
  purchaseType?: any;
  isShowCartSummary?: boolean;
  isSpecialAddOn?: boolean;

  cartStore?: any;
  likedIdList?: any;
  openAlertAction?: any;
  openModalAction?: any;
  closeModalAction?: any;
  selectGiftAction?: any;
  selectSpecialAddOnAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
  handleSelectProductId?: any;
  productIdSelected?: any;
  referrerTracking?: {
    referrerObjectType?: string;
    referrerObjectId?: number;
  };
}

export interface IState {
  productList: Array<any>;
  productSlide: Array<any>;
  productSlideSelected: any;
  countChangeSlide: number;
  firstInit: boolean;
  animating: boolean;
}
