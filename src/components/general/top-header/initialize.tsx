import {
  ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT,
  ROUTING_LIXI_COIN,
  ROUTING_USER_DELIVERY,
  ROUTING_USER_FEEDBACK,
  ROUTING_USER_ORDER,
  ROUTING_USER_PROFILE_EDIT,
  ROUTING_USER_VERIFY,
  ROUTING_USER_WAITLIST,
  ROUTING_USER_WATCHED,
  ROUTING_USER_WISHLIST,
  ROUTING_MEMBERSHIP
} from 'routings/path';

export const listAccountNavigation = (profileLink) => [
  {
    icon: 'cancel-order',
    type: 'my-profile',
    title: 'Đơn hàng của tôi',
    link: ROUTING_USER_ORDER
  },
  {
    icon: 'message-heart',
    type: 'my-profile',
    title: 'Bài viết của tôi',
    link: profileLink
  },
  {
    icon: 'user',
    title: 'Chỉnh sửa thông tin cá nhân',
    link: ROUTING_USER_PROFILE_EDIT
  },
  {
    icon: 'change-password',
    title: 'Đổi mật khẩu',
    link: ROUTING_USER_VERIFY
  },
  {
    icon: 'delivery',
    title: 'Địa chỉ giao hàng',
    link: ROUTING_USER_DELIVERY
  }
];

export const listProductNavigation = [
  {
    icon: 'eye',
    title: 'Sản phẩm đã xem',
    link: ROUTING_USER_WATCHED
  },
  {
    icon: 'heart-line',
    title: 'Sản phẩm yêu thích',
    link: ROUTING_USER_WISHLIST
  },
  {
    icon: 'history',
    title: 'Sản phẩm chờ hàng về',
    link: ROUTING_USER_WAITLIST
  },
  {
    icon: 'message-star',
    title: 'Sản phẩm đã đánh giá',
    link: ROUTING_USER_FEEDBACK
  },
  {
    icon: 'star',
    title: 'Sản phẩm chờ đánh giá',
    link: ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT
  }
];

export const listPromotionNavigation = [
  {
    icon: 'dollar',
    title: 'Chương trình Lixicoin',
    link: ROUTING_LIXI_COIN
  },
  {
    icon: 'membership',
    title: 'Hạng thành viên',
    link: ROUTING_MEMBERSHIP
  }
];
