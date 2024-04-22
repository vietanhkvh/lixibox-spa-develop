import { ORDER_TYPE } from '../../../../constants/application/order';
import {
  ROUTING_USER_ORDER,
  ROUTING_USER_FEEDBACK,
  ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT,
  ROUTING_USER_WISHLIST,
  ROUTING_USER_WATCHED,
  ROUTING_USER_WAITLIST,
  ROUTING_USER_PROFILE_EDIT,
  ROUTING_USER_VERIFY,
  ROUTING_USER_DELIVERY,
  ROUTING_INFO,
  ROUTING_PRODUCT_MANUAL,
  ROUTING_SUPPORT_CENTER_PATH,
  ROUTING_USER_ORDER_STORE_PURCHASES,
  ROUTING_STORE_INDEX,
  ROUTING_BALANCE,
  ROUTING_USER_TRANSACTIONS
} from '../../../../routings/path';

import { SOCIAL_URL } from '../../../../constants/application/social';

export const listOrderNavigation = {
  firstRow: [
    {
      icon: 'wallet',
      title: 'Chưa thanh toán',
      type: [ORDER_TYPE.UNPAID, ORDER_TYPE.PAYMENT_PENDING],
      link: `${ROUTING_USER_ORDER}?status=${ORDER_TYPE.UNPAID},${ORDER_TYPE.PAYMENT_PENDING}`
    },
    {
      icon: 'gift',
      title: 'Đã xác nhận',
      type: [ORDER_TYPE.CONFIRMED, ORDER_TYPE.PAID],
      link: `${ROUTING_USER_ORDER}?status=${ORDER_TYPE.CONFIRMED},${ORDER_TYPE.PAID}`
    },
    {
      icon: 'delivery',
      title: 'Đang đợi giao hàng',
      type: [ORDER_TYPE.SHIPPED],
      link: `${ROUTING_USER_ORDER}?status=${ORDER_TYPE.SHIPPED}`
    },
    {
      icon: 'receiver',
      title: 'Đã nhận hàng',
      type: [ORDER_TYPE.FULFILLED],
      link: `${ROUTING_USER_ORDER}?status=${ORDER_TYPE.FULFILLED}`
    }
  ],

  secondRow: [
    {
      icon: 'store',
      title: 'Mua tại cửa hàng',
      type: [ORDER_TYPE.AT_STORE],
      link: ROUTING_USER_ORDER_STORE_PURCHASES
    },
    {
      icon: 'cancel-order',
      title: 'Đơn hàng đã hủy',
      type: [ORDER_TYPE.CANCELLED],
      link: `${ROUTING_USER_ORDER}?status=${ORDER_TYPE.CANCELLED}`
    }
  ]
};

export const listAccountNavigation = (profileLink) => [
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
  // {
  //   icon: 'discount-code',
  //   title: 'Mã giảm giá đã lưu',
  //   link: '#'
  // },
  {
    icon: 'dollar',
    title: 'Ưu đãi thành viên',
    link: ROUTING_BALANCE
  },
  {
    icon: 'dollar-time',
    title: 'Lịch sử giao dịch',
    link: ROUTING_USER_TRANSACTIONS
  }
];

export const listInfoNavigation = [
  // {
  //   icon: 'qr-code',
  //   title: 'Mã QR của tôi',
  //   link: '#'
  // },
  {
    icon: 'info',
    title: 'Thông tin về Lixibox',
    description: 'Chính sách bảo mật, chính sách bán hàng, giới thiệu về Lixibox, ...',
    link: ROUTING_INFO
  },
  {
    icon: 'message-question',
    title: 'Câu hỏi thường gặp',
    link: ROUTING_PRODUCT_MANUAL
  },
  {
    icon: 'tip',
    isExternalLink: true,
    title: 'Thông tin tuyển dụng',
    link: 'https://careers.lixibox.com/jobs'
  },
  {
    icon: 'store',
    title: 'Danh sách cửa hàng',
    link: ROUTING_STORE_INDEX
  },
  {
    icon: 'warning',
    title: 'Gửi yêu cầu hỗ trợ',
    link: ROUTING_SUPPORT_CENTER_PATH
  },
  {
    icon: 'call',
    isExternalLink: true,
    title: 'Hotline: ',
    link: 'tel:',
    isHotlineItem: true
  }
];

export const listSocialNavigation = [
  {
    isExternalLink: true,
    icon: 'social-fb',
    link: SOCIAL_URL.facebook
  },
  {
    isExternalLink: true,
    icon: 'social-insta',
    link: SOCIAL_URL.instagram
  },
  {
    isExternalLink: true,
    icon: 'social-messenger',
    link: SOCIAL_URL.messager
  },
  {
    isExternalLink: true,
    icon: 'social-pinterest',
    link: SOCIAL_URL.pinterest
  },
  {
    isExternalLink: true,
    icon: 'zalo',
    link: SOCIAL_URL.zalo
  }
];
