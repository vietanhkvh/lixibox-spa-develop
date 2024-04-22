import { PropsFromRedux } from './store';

export interface INewFeedProps extends PropsFromRedux {
  history?: any;
  limit?: number;
}
export interface INewFeedState {}
