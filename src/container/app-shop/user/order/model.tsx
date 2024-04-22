export interface IProps {
  children: any;
  routes: any;
  location?: any;
  history?: any;

  userStore?: any;
  orderStore?: any;
  fetchUserOrderListAction?: any;
  cancelOrderAction?: any;
  perPage?: number;
  openModalAction?: any;
  getCancelOrderReasonAction?: any;
}

export interface IState {
  urlList: any;
  page: number;
  mobileTabs: any;
  status: string;
}
