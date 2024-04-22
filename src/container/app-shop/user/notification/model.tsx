export interface IProps {
  children: any;
  routes: any;
  location?: any;

  notificationStore?: any;
  fetchNotificationListAction?: any;
  perPage?: number;
}

export interface IState {
  urlList: Array<any>;
  page: any;
}
