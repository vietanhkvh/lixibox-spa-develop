import { CartState } from 'flows/cart/types';
import { ShopState } from 'flows/shop/types';
import { IBox } from 'types/api/shop';

export interface IVariantProps {
  box: Partial<IBox>;
  boxId: string | number;
  purchaseType: number;
  quantity: number;
}
export interface IUpdateCartProps {
  oldVariant: IVariantProps;
  newVariant: IVariantProps;
}
export interface IVariantsSelectorModalProps {
  variantProps: any;
  updatedVariantQuantity: number;
  updateVariantQuantityAction: (param: number) => void;
}
export interface IVariantsSelectorProps {
  shopStore?: ShopState;
  cartStore?: CartState;
  currentVariant?: any;
  getProductDetailAction?: any;
  addItemToCartAction?: any;
  removeItemFromCartAction?: any;
  updateVariantQuantityAction?: (param: number) => void;
}
