import { MouseEvent } from 'react';
import { ProductBox } from 'types/api/shop';

/** Library */
export interface IItemProductProps {
  authStore?: any;

  data?: any;
  type?: string;
  isShowQuickView?: boolean;
  isShowQuickBuy?: boolean;
  isSpecialAddOn?: boolean;
  isShowLike?: boolean;
  openModal?: any;
  openAlert?: any;
  lineTextNumber?: number;

  displayCartSumaryOption?: boolean;
  isShowCurrentPrice?: boolean;
  isShowRating?: boolean;
  isShowImage?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>, box: ProductBox) => void;

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
  showHideCartSumaryLayoutAction?: any;
  purchaseType?: any;
  handleSelectProductId?: any;
  productIdSelected?: any;
  isShowCartSummary?: boolean;
  referrerTracking?: {
    referrerObjectType?: string;
    referrerObjectId?: number;
  };
}

export interface IItemProductState {
  isLoadingAddToCard?: any;
  isAddedOnProduct?: boolean;
  imgUrl?: any;
  isHover?: boolean;
  isLoadedImage?: boolean;
}
