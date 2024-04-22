import { IProduct } from 'types/generic/product';

export interface IVariantsProps {
  product: IProduct;
  onSelected?: (params: string) => void;
}
