export interface IProps {
  history?: any;
  location?: any;
  match?: any;
  hotDeal?: any;
  fetchDataHotDealAction?: any;
  dispatch?: any;
  days: any;
  limit?: any;
  styleKeeperContext?: any;
}

export interface IState {
  isLoading?: boolean;
  hardData: any;
  urlList: Array<any>;
}
