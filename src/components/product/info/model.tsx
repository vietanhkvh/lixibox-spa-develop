import { ProductBox } from 'types/api/shop';

export interface IProductInfoProps {
  product?: any;
  bundledProducts?: any;
  openModal?: any;
  fetchBundledProductsAction?: any;
  onBundleItemClick?: (box: ProductBox, index: number) => void;
}

export interface IProductInfoState {
  canViewMore?: boolean;
  isOpenMobileInfoModal?: boolean;
}
