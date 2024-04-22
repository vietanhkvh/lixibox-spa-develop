import {
  ROUTING_BRAND_DETAIL_PATH,
  ROUTING_LIXI_COIN,
  ROUTING_ORDERS_TRACKINGS_PATH,
  ROUTING_SHOP_INDEX,
  ROUTING_STORE_INDEX,
  ROUTING_USER_INVITE
} from 'routings/path';
import { IBreadCrumbState } from './model';
export const INITIAL_STATE = { list: [] } as IBreadCrumbState;
export const subNavigation: {
  id: any;
  hover: boolean;
  activeMenu: boolean;
  slug: string;
  name: string;
  vn_name: string;
  sub: Array<{ id: any; name: string; vn_name: string; slug: string }>;
} = {
  id: 'home',
  hover: false,
  activeMenu: false,
  slug: ROUTING_SHOP_INDEX,
  name: 'trang chủ',
  vn_name: 'trang chủ',
  sub: [
    // NOTE: Temporarily removed brand index from breadcrumb.
    // TODO: Restore after brand index is revamped.
    // { id: 'brand', name: 'thương hiệu', vn_name: 'thương hiệu', slug: ROUTING_BRAND_DETAIL_PATH },
    { id: 'store', name: 'cửa hàng', vn_name: 'cửa hàng', slug: ROUTING_STORE_INDEX },
    { id: 'delivery', name: 'chi tiết đơn hàng', vn_name: 'chi tiết đơn hàng', slug: ROUTING_ORDERS_TRACKINGS_PATH },
    { id: 'lixicoin', name: 'lixicoin', vn_name: 'lixicoin', slug: ROUTING_LIXI_COIN },
    { id: 'invite', name: 'giới thiệu bạn bè', vn_name: 'giới thiệu bạn bè', slug: ROUTING_USER_INVITE }
  ]
};

export const subNavigationShop: {
  id: any;
  hover: boolean;
  activeMenu: boolean;
  slug: string;
  name: string;
  vn_name: string;
  sub: Array<{ id: any; name: string; vn_name: string; slug: string }>;
} = {
  id: 'home',
  hover: false,
  activeMenu: false,
  slug: ROUTING_SHOP_INDEX,
  name: 'trang chủ',
  vn_name: 'trang chủ',
  sub: [
    { id: 'brand', name: 'thương hiệu', vn_name: 'thương hiệu', slug: ROUTING_BRAND_DETAIL_PATH },
    { id: 'invite', name: 'giới thiệu bạn bè', vn_name: 'giới thiệu bạn bè', slug: ROUTING_USER_INVITE }
  ]
};
