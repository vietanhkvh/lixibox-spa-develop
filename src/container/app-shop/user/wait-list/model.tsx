import { Location } from 'react-router-dom-v5-compat';
import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  children: any;
  routes: any;
  location?: Location;
  perPage?: number;
}

export interface IState {
  urlList: Array<any>;
  page: any;
}
