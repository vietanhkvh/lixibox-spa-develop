import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  history?: any;
  limit?: number;
}
export interface IState {
  showInfoQuestion?: boolean;
  showFocus?: boolean;
}
