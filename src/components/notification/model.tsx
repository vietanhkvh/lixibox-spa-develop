export interface IProps {
  title?: string;
  list: Array<any>;
  style?: any;
  showHeader?: boolean;
  current?: any;
  per?: any;
  total?: any;
  urlList?: any;
  isFetchNotificationSuccess?: boolean;
  isNotShowLoading?: boolean;
}

export interface IState {
  isLoadingList?: boolean;
}
