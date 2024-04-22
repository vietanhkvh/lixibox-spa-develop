export interface IProps {
  title?: string;
  list: Array<any>;
  style?: any;
  showHeader?: boolean;
  isShowCancelBtn?: boolean;
  current?: any;
  per?: any;
  total?: any;
  urlList?: any;
  openModalAction?: any;
  cancelOrderAction?: any;
  cancelOrderReasonList?: any;
  isFetchUserOrderList?: boolean;
  isNotShowLoading?: boolean;
  orderType?: string;
  history?: any;
}

export interface IState {
  isLoadingList?: boolean;
}
