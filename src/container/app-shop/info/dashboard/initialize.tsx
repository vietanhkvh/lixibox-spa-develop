import { IState } from './model';
import {
  ROUTING_INFO_ABOUT_US,
  ROUTING_INFO_TERM,
  ROUTING_INFO_PRIVACY,
  ROUTING_INFO_PRIVACY_EN,
  // ROUTING_INFO_CAREERS,
  ROUTING_INFO_GIVE_GIFT_CARD,
  ROUTING_INFO_BUY_ON_APP,
  ROUTING_INFO_BUY_ON_WEB,
  ROUTING_INFO_SHIPPING_FEE,
  ROUTING_INFO_DELIVERY_AND_PAYMENT,
  ROUTING_INFO_RECEIVE_TIME,
  ROUTING_INFO_RECEIVE_AND_REDEEM
  // ROUTING_INFO_GUARANTEE
} from '../../../../routings/path';

export const infoList = [
  {
    iconName: 'store',
    txtTitle: 'Thông tin về Lixibox',
    txt: 'Giới thiệu, Điều khoản và Quy định, Tuyển dụng',
    searchVn: 'giới thiệu, điều khoản và quy định, chính sách bảo mật, tuyển dụng',
    search: 'gioi thieu, dieu khoan va quy dinh, chinh sach bao mat, tuyen dung',
    link: ROUTING_INFO_ABOUT_US
  },
  {
    iconName: 'cart',
    txtTitle: 'Hướng dẫn mua hàng',
    txt: 'Chương trình tặng Gift Card, Mua hàng Trên App Lixibox',
    searchVn:
      'chương trình tặng gift card, mua hàng trên app lixibox, mua hàng trên website, phí giao hàng, giao hàng và thanh toán, thời gian nhận hàng, nhận hàng và đổi trả, chế độ bảo hành',
    search:
      'chuong trinh tang gift card, mua hang tren app lixibox, mua hang tren website, phi giao hang, giao hang va thanh toan, thoi gian nhan hang, nhan hang va doi tra, che do bao hanh',
    link: ROUTING_INFO_BUY_ON_APP
  },
  {
    iconName: 'protection',
    txtTitle: 'Chính sách bảo mật',
    txt: 'Chính sách bảo vệ thông tin cá nhân & thanh toán',
    searchVn:
      'mục đích và phạm vi thu thập dữ liệu, phạm vi sử dụng thông tin, thời gian sử dụng thông tin, cam kết và bảo mật về thanh toán',
    search:
      'muc dich va pham vi thu thap du lieu, pham vi su dung thong tin, thoi gian su dung thong tin, cam ket va bao mat ve thanh toan',
    link: ROUTING_INFO_PRIVACY
  },
  {
    iconName: 'dollar',
    txtTitle: 'Chính sách bán hàng',
    txt: 'Chính sách giao hàng, Chính sách thanh toán',
    searchVn: 'hình thức và thời gian giao hàng, chính sách kiểm hàng, quy trình nhận hàng, chính sách thanh toán',
    search: 'hinh thuc va thoi gian giao hang, chinh sach kiem hang, quy trinh nhan hang, chinh sach thanh toan',
    link: ROUTING_INFO_DELIVERY_AND_PAYMENT
  }
];

export const suggestionSearchList = [
  {
    title: 'Giới thiệu',
    searchVn: 'giới thiệu',
    search: 'gioi thieu',
    link: ROUTING_INFO_ABOUT_US
  },
  {
    title: 'Điều khoản và Quy định',
    searchVn: 'điều khoản và quy định',
    search: 'dieu khoan va quy dinh',
    link: ROUTING_INFO_TERM
  },
  {
    title: 'Chính sách Bảo mật',
    searchVn: 'chính sách bảo mật',
    search: 'chinh sach bao mat',
    link: ROUTING_INFO_PRIVACY
  },
  {
    title: 'Privacy Info',
    searchVn: 'privacy info',
    search: 'privacy info',
    link: ROUTING_INFO_PRIVACY_EN
  },
  // {
  //   title: 'Tuyển dụng',
  //   searchVn: 'tuyển dụng',
  //   search: 'tuyen dung',
  //   link: ROUTING_INFO_CAREERS
  // },

  {
    title: 'Chương trình tặng Gift Card',
    searchVn: 'chương trình tặng gift card,',
    search: 'chuong trinh tang gift card',
    link: ROUTING_INFO_GIVE_GIFT_CARD
  },

  {
    title: 'Mua hàng Trên App Lixibox',
    searchVn: 'mua hàng trên app lixibox',
    search: 'mua hang tren app lixibox',
    link: ROUTING_INFO_BUY_ON_APP
  },

  {
    title: 'Mua hàng Trên Website Lixibox',
    searchVn: 'mua hàng trên website lixibox',
    search: 'mua hang tren website lixibox',
    link: ROUTING_INFO_BUY_ON_WEB
  },

  {
    title: 'Phí giao hàng',
    searchVn: 'phí giao hàng',
    search: 'phi giao hang',
    link: ROUTING_INFO_SHIPPING_FEE
  },

  {
    title: 'Giao hàng và Thanh toán',
    searchVn: 'giao hàng và thanh toán',
    search: 'giao hang va thanh toan',
    link: ROUTING_INFO_DELIVERY_AND_PAYMENT
  },

  {
    title: 'Thời gian nhận hàng',
    searchVn: 'thời gian nhận hàng',
    search: 'thoi gian nhan hang',
    link: ROUTING_INFO_RECEIVE_TIME
  },

  {
    title: 'Nhận hàng và Đổi trả',
    searchVn: 'nhận hàng và đổi trả',
    search: 'nhan hang va doi tra',
    link: ROUTING_INFO_RECEIVE_AND_REDEEM
  }

  // {
  //   title: 'Chế độ bảo hành',
  //   searchVn: 'chế độ bảo hành',
  //   search: 'che do bao hanh',
  //   link: ROUTING_INFO_GUARANTEE
  // }
];

export const INITIAL_STATE = {
  infoList: [],
  searchList: [],
  searchKeyWord: ''
} as IState;
