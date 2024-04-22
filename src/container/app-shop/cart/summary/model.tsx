import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  history?: any;
}

export interface IState {
  position?: number;
}
