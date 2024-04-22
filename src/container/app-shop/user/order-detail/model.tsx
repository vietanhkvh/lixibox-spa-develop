import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  match: {
    params: {
      orderNumber: string;
    };
  };
  location?: any;
  history?: any;
}

export interface IState {
  isLoading?: any;
}
