import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  history?: any;
  location?: any;
}

export interface IState {
  submitLoading?: any;

  inputPassword: {
    value?: string;
    valid?: boolean;
  };
}
