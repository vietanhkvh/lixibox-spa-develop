import { ICartItemProps, ICartItemState } from './model';

export const DEFAULT_PROPS = {
  isReadOnly: false,
  data: null,
  isCheckedDiscount: false,
  isShowDiscountCodeMessage: true,
  compactView: false,
  isForceHideBuyLater: false,
  confirmationType: 'inline',
  isPrivateMode: false,
  isLoading: false
} as ICartItemProps;

export const INITIAL_STATE = {
  removeConfirmation: false,
  wishlistConfirmation: false,
  hidden: false,
  highlight: false,
  style: {}
} as ICartItemState;
