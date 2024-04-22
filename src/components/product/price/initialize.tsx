import { IProductPriceProps, IProductPriceState } from './model';
import { APP_VERSION } from '../../../constants/application/global';

export const DEFAULT_PROPS = {
  currentPrice: 0,
  oldPrice: 0,
  coinsPrice: 0,
  currencyFormatType: 'currency',

  /** Check application version mobile / tablet / desktop */
  version: APP_VERSION.MOBILE
} as IProductPriceProps;

export const INITIAL_STATE = {} as IProductPriceState;
