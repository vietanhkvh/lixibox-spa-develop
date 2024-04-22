import * as VARIABLE from '../../../../style/variable';
import {
  ROUTING_INFO_ABOUT_US,
  ROUTING_INFO_TERM,
  ROUTING_INFO_PRIVACY,
  ROUTING_INFO_PRIVACY_EN,
  ROUTING_INFO_GIVE_GIFT_CARD,
  ROUTING_INFO_BUY_ON_APP,
  ROUTING_INFO_BUY_ON_WEB,
  ROUTING_INFO_SHIPPING_FEE,
  ROUTING_INFO_DELIVERY_AND_PAYMENT,
  ROUTING_INFO_RECEIVE_TIME,
  ROUTING_INFO_RECEIVE_AND_REDEEM,
  // ROUTING_INFO_GUARANTEE,
  ROUTING_INFO_MAKEOVER,
  ROUTING_INFO_MASK_BAR,
  ROUTING_INFO_SKIN_TEST,
  ROUTING_INFO_RECOMMEND,
  ROUTING_INFO_HALIO_DISTRIBUTOR
} from '../../../../routings/path';

import renderAboutUs from '../about/view-about-us';
import renderTerm from '../about/view-term';

export const listAboutNavigation = [
  {
    icon: 'angle-right',
    title: 'Giới thiệu',
    mobile: {
      title: 'Giới thiệu',
      description: 'Giới thiệu'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_ABOUT_US,
    iconStyle: { width: 8 },
    renderView: renderAboutUs()
  },
  {
    icon: 'angle-right',
    title: 'Điều khoản và Quy định',
    mobile: {
      title: 'Điều khoản và Quy định',
      description: 'Điều khoản và Quy định'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_TERM,
    iconStyle: { width: 8 },
    renderView: renderTerm()
  },
  {
    icon: 'angle-right',
    title: 'Chính sách Bảo mật',
    mobile: {
      title: 'Chính sách Bảo mật',
      description: 'Chính sách Bảo mật'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_PRIVACY,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Privacy Info',
    mobile: {
      title: 'Privacy Info',
      description: 'Privacy Info'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_PRIVACY_EN,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Tuyển dụng',
    mobile: {
      title: 'Tuyển dụng',
      description: 'Tuyển dụng'
    },
    color: VARIABLE.colorGreen,
    link: 'https://careers.lixibox.com/jobs',
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Nhà phân phối Halio',
    mobile: {
      title: 'Nhà phân phối Halio',
      description: 'Nhà phân phối Halio'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_HALIO_DISTRIBUTOR,
    iconStyle: { width: 8 },
    renderView: ''
  }
];

export const listBuyNavigation = [
  {
    icon: 'angle-right',
    title: 'Tặng Gift Card',
    mobile: {
      title: 'Tặng Gift Card',
      description: 'Tặng Gift Card'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_GIVE_GIFT_CARD,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Mua hàng trên App',
    mobile: {
      title: 'Mua hàng trên App',
      description: 'Mua hàng trên App'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_BUY_ON_APP,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Mua hàng trên Website',
    mobile: {
      title: 'Mua hàng trên Website',
      description: 'Mua hàng trên Website'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_BUY_ON_WEB,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Phí giao hàng',
    mobile: {
      title: 'Phí giao hàng',
      description: 'Phí giao hàng'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_SHIPPING_FEE,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Giao hàng và Thanh toán',
    mobile: {
      title: 'Giao hàng và Thanh toán',
      description: 'Giao hàng và Thanh toán'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_DELIVERY_AND_PAYMENT,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Thời gian nhận hàng',
    mobile: {
      title: 'Thời gian nhận hàng',
      description: 'Thời gian nhận hàng'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_RECEIVE_TIME,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Nhận hàng và Đổi trả',
    mobile: {
      title: 'Nhận hàng và Đổi trả',
      description: 'Nhận hàng và Đổi trả'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_RECEIVE_AND_REDEEM,
    iconStyle: { width: 8 },
    renderView: ''
  }
  // {
  //   icon: 'angle-right',
  //   title: 'Chế độ Bảo hành',
  //   mobile: {
  //     title: 'Chế độ Bảo hành',
  //     description: 'Chế độ Bảo hành'
  //   },
  //   color: VARIABLE.colorGreen,
  //   link: ROUTING_INFO_GUARANTEE,
  //   iconStyle: { width: 8 },
  //   renderView: ''
  // }
];

export const listStoreNavigation = [
  {
    icon: 'angle-right',
    title: 'Trang điểm trước sự kiện',
    mobile: {
      title: 'Trang điểm trước sự kiện',
      description: 'Trang điểm trước sự kiện'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_MAKEOVER,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Mặt nạ spa',
    mobile: {
      title: 'Mặt nạ spa',
      description: 'Mặt nạ spa'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_MASK_BAR,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Hiểu da chính bạn',
    mobile: {
      title: 'Hiểu da chính bạn',
      description: 'Hiểu da chính bạn'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_SKIN_TEST,
    iconStyle: { width: 8 },
    renderView: ''
  },
  {
    icon: 'angle-right',
    title: 'Tư vấn dịch vụ',
    mobile: {
      title: 'Tư vấn dịch vụ',
      description: 'Tư vấn dịch vụ'
    },
    color: VARIABLE.colorGreen,
    link: ROUTING_INFO_RECOMMEND,
    iconStyle: { width: 8 },
    renderView: ''
  }
];

export const mobileNavigationList = [...listAboutNavigation, ...listBuyNavigation];

const dataTransform = (item) => ({
  ...item,
  name: item.title,
  slug: item.link
});

export const mobileNavigationBrowseNode = [
  {
    id: 1,
    name: 'Thông tin về Lixibox',
    slug: ROUTING_INFO_ABOUT_US,
    sub_nodes: listAboutNavigation.map(dataTransform)
  },
  {
    id: 2,
    name: 'Hướng dẫn mua hàng',
    slug: ROUTING_INFO_BUY_ON_APP,
    sub_nodes: listBuyNavigation.map(dataTransform)
  }
];
