export interface IProps {
  match?: any;
  userStore?: any;
  cartStore?: any;
  orderTrackingsStore?: any;
  fetchOrderTrackingByCode?: any;
  fetchUserOrderListAction?: any;
  getMomoPaymentAddressUrlAction?: any;
}

export interface IState {
  codeSearch?: any;
  isSearch?: boolean;
}
