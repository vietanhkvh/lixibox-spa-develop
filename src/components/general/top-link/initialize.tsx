import { IProps, IState } from './model';
import { ROUTING_ORDERS_TRACKINGS_PATH, ROUTING_LIXI_COIN, ROUTING_STORE_INDEX } from '../../../routings/path';

export const DEFAULT_PROPS = {
  leftList: []
} as IProps;

export const INITIAL_STATE = {
  selected: {
    id: 0,
    name: '',
    order: null,
    link: '',
    cover_image: {
      large_url: ''
    }
  },
  countChangeSlide: -1,
  rightLink: [
    {
      title: 'Cửa hàng',
      href: ROUTING_STORE_INDEX,
      icon: 'store'
    },
    {
      title: 'Kiểm tra Đơn hàng',
      href: ROUTING_ORDERS_TRACKINGS_PATH,
      icon: 'deliver'
    },
    {
      title: 'Lixicoin',
      href: ROUTING_LIXI_COIN,
      icon: 'dollar'
    }
  ]
} as IState;
