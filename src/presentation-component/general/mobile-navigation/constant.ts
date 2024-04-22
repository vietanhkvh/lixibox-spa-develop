import {
  ROUTING_USER_NOTIFICATION,
  ROUTING_USER_ORDER,
  ROUTING_USER_WISHLIST,
  ROUTING_USER,
  ROUTING_SUPPORT_CENTER_PATH,
  ROUTING_SHOP_INDEX
} from '../../../routings/path';

export const DROPDOWN_MENU = [
  { id: 0, icon: 'cart', title: 'Mua sắm', link: ROUTING_SHOP_INDEX },
  { id: 1, icon: 'bell', title: 'Thông báo', link: ROUTING_USER_NOTIFICATION },
  { id: 2, icon: 'history', title: 'Lịch sử mua hàng', link: ROUTING_USER_ORDER },
  { id: 3, icon: 'heart-line', title: 'Sản phẩm yêu thích', link: ROUTING_USER_WISHLIST },
  { id: 4, icon: 'user', title: 'Tài khoản', link: ROUTING_USER, requireLogin: true },
  { id: 5, icon: 'share', title: 'Chia sẻ ngay', actionType: 'sharing' },
  {
    id: 6,
    icon: 'warning',
    title: 'Gửi yêu cầu hỗ trợ',
    link: ROUTING_SUPPORT_CENTER_PATH,
    linkTarget: '_blank',
    actionType: 'support'
  }
];
