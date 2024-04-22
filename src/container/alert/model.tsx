import { CartState } from 'flows/cart/types';

export interface IAlertItem {
  id: number;
  icon: string;
  title: string;
  content: string;
  type: string;
  iconText?: string;
  isShowIconText?: boolean;
}

export interface IProps {
  alertStore: {
    list: Array<IAlertItem>;
  };
  cartStore: CartState;

  closeAlert?: any;
  history?: any;
}

export interface IState {
  waitingClose: Array<number>;
  waitingShow: Array<number>;
}
