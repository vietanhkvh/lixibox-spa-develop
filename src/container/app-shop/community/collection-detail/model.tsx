import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  match?: any;
}

export interface IState {
  feedActiveId: number;
}
