/** Model */
import { IProductSummaryProps, IProductSummaryState } from './model';

export const DEFAULT_PROPS = {
  rating: {
    count: 0,
    avg_rate: 0
  },
  love: null,
  stock: 0,
  boxId: 0,
  constants: null,
  lixicoinBonus: 0,
  preOrderReleaseDate: 0,
  preOrderStatus: '',
  currencyFormatType: 'currency'
} as IProductSummaryProps;

export const INITIAL_STATE = {} as IProductSummaryState;
