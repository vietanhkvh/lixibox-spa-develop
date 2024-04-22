import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  isShowDiscount: boolean;
  style?: any;
  pathname?: any;
}
