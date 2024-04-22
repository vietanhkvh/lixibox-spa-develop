import { IProductDiscountProps, IProductDiscountState } from './model';

export const DEFAULT_PROPS = {
  discountCodeList: [],
  price: 0,
  isAddedToCart: false
} as IProductDiscountProps;

export const INITIAL_STATE = {
  showDiscountCode: false
} as IProductDiscountState;
