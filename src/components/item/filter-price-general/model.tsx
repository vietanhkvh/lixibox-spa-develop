export interface IFilterPriceProps {
  priceList?: any;
  handleSearch?: any;
  pl?: number;
  ph?: number;
  maxPrice?: number;
}

export interface IFilterPriceState {
  priceList?: any;
  showRefreshIcon?: boolean;
  showViewMore?: boolean;
}
