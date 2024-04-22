/** Model */
import { PURCHASE_TYPE } from '../../../constants/application/purchase';

import { IItemProductProps, IItemProductState } from './model';

export const DEFAULT_PROPS = {
  openModalAction: () => {},
  likeProductAction: () => {},
  unLikeProductAction: () => {},
  cartStore: {},
  data: {},
  likedIdList: [],
  type: 'full',
  lineTextNumber: 0,
  isShowQuickView: false,
  isShowQuickBuy: false,
  isShowLike: true,
  displayCartSumaryOption: true,
  isShowCurrentPrice: false,
  isShowRating: true,
  isShowImage: false,
  purchaseType: PURCHASE_TYPE.NORMAL,
  productIdSelected: '',
  isShowCartSummary: false,
  referrerTracking: {},
  isSpecialAddOn: false
} as IItemProductProps;

export const INITIAL_STATE = {
  isLoadingAddToCard: false,
  isAddedOnProduct: false,
  imgUrl: '',
  isHover: false,
  isLoadedImage: false
} as IItemProductState;
