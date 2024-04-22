import { IState, IProps } from './model';

import * as ROUTINGS from '../../../routings/path';

export const DEFAULT_PROPS = {
  referalCode: ''
} as IProps;

export const INITIAL_STATE = {
  categoryNavigation: {
    title: 'Danh mục',
    list: [
      {
        id: '1',
        link: '/category/shop-gifts',
        title: 'Quà tặng'
      },
      {
        id: '3',
        link: '/category/beauty-box',
        title: 'Hộp làm đẹp'
      },
      {
        id: '4',
        link: '/category/accessories',
        title: 'Phụ kiện'
      },
      {
        id: '5',
        link: '/category/skin-care',
        title: 'Chăm sóc da'
      },
      {
        id: '6',
        link: '/category/makeup',
        title: 'Trang điểm'
      },
      {
        id: '8',
        link: '/category/supplement',
        title: 'Thực phẩm chức năng'
      },
      {
        id: '9',
        link: '/category/personal-care',
        title: 'Chăm sóc cá nhân'
      },
      {
        id: '7',
        link: '/category/shop-by-ingredient',
        title: 'Tìm theo thành phần'
      }
    ]
  },
  infoLinkNavigation: {
    title: 'Thông tin',
    list: [
      {
        id: 'faq-1',
        link: ROUTINGS.ROUTING_INFO,
        title: 'Giới thiệu về Lixibox'
      },

      {
        id: 'faq-3',
        type: 'external',
        target: '_blank',
        link: 'https://careers.lixibox.com/jobs',
        title: 'Tuyển dụng'
      },
      {
        id: 'faq-4',
        link: '/lixicoin',
        title: 'Chương trình Lixicoin'
      },
      {
        id: 'faq-4',
        link: ROUTINGS.ROUTING_SUPPORT_CENTER_PATH,
        title: 'Hỗ trợ Đơn hàng'
      },
      {
        id: 'faq-5',
        link: ROUTINGS.ROUTING_STORE_INDEX,
        title: 'Hệ thống cửa hàng Lixibox'
      },
      {
        id: 'faq-2',
        link: ROUTINGS.ROUTING_USER_INVITE,
        title: 'Mời bạn bè - Nhận thưởng ngay'
      }
      //TODO: Temporary for active google merchant
    ]
  },
  guideLinkNavigation: {
    title: 'Hướng dẫn',
    list: [
      {
        id: 'faq-3',
        link: ROUTINGS.ROUTING_PRODUCT_MANUAL,
        title: 'HDSD & Bảo hành'
      },
      {
        id: 'faq-6',
        link: ROUTINGS.ROUTING_INFO_BUY_ON_WEB,
        title: 'Hướng dẫn đặt hàng'
      },
      {
        id: 'faq-7',
        link: ROUTINGS.ROUTING_INFO_DELIVERY_AND_PAYMENT,
        title: 'Phương thức giao hàng'
      },
      {
        id: 'faq-8',
        link: ROUTINGS.ROUTING_INFO_RECEIVE_AND_REDEEM,
        title: 'Chính sách đổi trả'
      },
      {
        id: 'faq-9',
        link: ROUTINGS.ROUTING_INFO_PRIVACY,
        title: 'Chính sách bảo mật'
      },
      {
        id: 'faq-9',
        link: ROUTINGS.ROUTING_INFO_PRIVACY_EN,
        title: 'Privacy Info'
      },
      {
        id: 'faq-10',
        link: ROUTINGS.ROUTING_INFO_TERM,
        title: 'Điều khoản sử dụng'
      }
    ]
  }
} as IState;
