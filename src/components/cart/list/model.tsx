import { ProductBox } from 'types/api/shop';

export type ConfirmationType = 'popup' | 'inline';
export interface IProps {
  userInfo?: any;
  isReadOnly?: boolean;
  isForceHideBuyLater?: boolean;
  history?: any;
  list: Array<any>;
  update?: any;
  type?: string;
  style?: any;
  cartItemStyle?: any;
  isCheckedDiscount?: boolean;
  isShowDiscountCodeMessage?: boolean;
  className: string;
  compactView: boolean; // Suitable for small width (e.g. mobile view, side in cart summary view)
  confirmationType: ConfirmationType;
  isPrivateMode: boolean;
  isLoading?: boolean;
  isReceivedBirthdayGift?: boolean;
  showHideCartSumaryLayoutAction?: any;
  onItemClick?: (box: ProductBox, index: number) => void;
}

export interface IState {}
