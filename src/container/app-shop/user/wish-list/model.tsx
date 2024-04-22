import { CartState } from 'flows/cart/types';

export interface IProps {
  children: any;
  routes: any;
  location?: any;
  cartStore?: CartState;

  likeStore?: any;
  fetchListLikedBoxesAction?: any;
  perPage?: number;

  openAlertAction?: any;
}

export interface IState {
  urlList: Array<any>;
  page: any;
}
