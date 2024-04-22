export interface IProductPriceProps {
  currentPrice?: number;
  oldPrice?: number;
  coinsPrice?: number;
  currencyFormatType?: string;

  /** check version mobile / tablet / desktop */
  version: string;
  style?: any;
}

export interface IProductPriceState {}
