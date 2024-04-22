import { ROUTING_MAGAZINE, ROUTING_LIXI_COIN } from '../../routings/path';

export const RIGHT_LINK_SHOP_NAVIGATION = [
  {
    id: 0,
    key: 'deliver',
    title: 'Kiểm tra Đơn hàng',
    icon: 'deliver',
    link: '/'
  },
  {
    id: 1,
    key: 'magazine',
    title: 'Magazine',
    icon: 'magazine',
    link: ROUTING_MAGAZINE
  },
  {
    id: 2,
    key: 'lixicoin',
    title: 'Đổi Lixicoin',
    icon: 'dollar',
    link: ROUTING_LIXI_COIN
  }
];
