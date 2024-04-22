/** Library */
export interface IDeliverCalculatorProps {
  style?: any;
  openModal?: any;
  addressStore?: any;
  provinceStore?: any;
  fetchProvinceListAction?: any;
  fetchShipFeeByDistrictIdAction?: any;
  boxId?: number;
}

export interface IDeliverCalculatorState {
  valueCalculated: any;
  isFetchTimeFeeShippingFinished?: boolean;
}
