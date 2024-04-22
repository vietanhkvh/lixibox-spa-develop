import { IFilterPriceProps, IFilterPriceState } from './model';

export const DEFAULT_PROPS = {} as IFilterPriceProps;

export const INITIAL_STATE = {
  priceList: [],
  showRefreshIcon: false,
  showViewMore: false
} as IFilterPriceState;
