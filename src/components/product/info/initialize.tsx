import { IProductInfoProps, IProductInfoState } from './model';

export const DEFAULT_PROPS = {
  product: {}
} as IProductInfoProps;

export const INITIAL_STATE = {
  canViewMore: false,
  isOpenMobileInfoModal: false
} as IProductInfoState;
