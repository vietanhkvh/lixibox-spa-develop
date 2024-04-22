import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  children?: any;
  routes?: any;
  perPage?: number;
}

export interface IState {
  notificationList?: any;
  orderList?: any;
}
