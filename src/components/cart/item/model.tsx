import { CartState } from 'flows/cart/types';
import { ProductBox } from 'types/api/shop';

export interface ICartItemProps {
  isReadOnly?: boolean;
  data: any;
  style?: any;
  isCheckedDiscount?: boolean;
  isForceHideBuyLater?: boolean;
  isShowDiscountCodeMessage?: boolean;
  compactView: boolean; // Suitable for small width (e.g. mobile view, side in cart summary view)
  confirmationType: 'popup' | 'inline';
  update?: (
    boxId: number,
    oldValue: number,
    newValue: number,
    purchaseType: number,
    isWishList: boolean,
    box: { [key: string]: any }
  ) => void;
  isPrivateMode: boolean;
  isLoading?: boolean;
  cartStore?: CartState;
  appStore?: any;
  clearNewItemAction?: any;
  onImageLinkClick?: (box: ProductBox) => void;
}

export interface ICartItemState {
  removeConfirmation: boolean;
  wishlistConfirmation: boolean;
  hidden: boolean;
  highlight: boolean;
}
