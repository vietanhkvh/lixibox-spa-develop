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
  // ROUTING_INFO_QUESTION_ABOUT_US,
  ROUTING_INFO_QUESTION_RECEIVE_GIFT,
  ROUTING_INFO_QUESTION_INVITE_FRIENDS_GET_REWARDS
  // ROUTING_INFO_QUESTION_GIFT_CARD_2019
} from '../../../routings/path';
import { IInfoMobileMenuProps, IInfoMobileMenuState } from './model';

export const DEFAULT_PROPS = {} as IInfoMobileMenuProps;

export const INITIAL_STATE = {
  openMenuProfile: false,
  menuFormated: [],
  listCategoryReject: [841, 992, 844],
  isOpenMenuSub: false
} as IInfoMobileMenuState;

export const aboutMenuList = [
  { id: 1, slug: ROUTING_INFO_ABOUT_US, icon: '', name: 'Giới thiệu' },
  { id: 2, slug: ROUTING_INFO_TERM, icon: '', name: 'Điều khoản và Quy định' },
  { id: 3, slug: ROUTING_INFO_PRIVACY, icon: '', name: 'Chính sách Bảo mật' },
  { id: 3, slug: ROUTING_INFO_PRIVACY_EN, icon: '', name: 'Privacy Policy' }
];

export const introBuyMenuList = [
  {
    id: 1,
    slug: ROUTING_INFO_GIVE_GIFT_CARD,
    icon: '',
    name: 'Tặng Gift Card'
  },
  { id: 2, slug: ROUTING_INFO_BUY_ON_APP, icon: '', name: 'Mua hàng trên App' },
  {
    id: 3,
    slug: ROUTING_INFO_BUY_ON_WEB,
    icon: '',
    name: 'Mua hàng trên Website'
  },
  { id: 4, slug: ROUTING_INFO_SHIPPING_FEE, icon: '', name: 'Phí giao hàng' },
  {
    id: 5,
    slug: ROUTING_INFO_DELIVERY_AND_PAYMENT,
    icon: '',
    name: 'Giao hàng và Thanh toán'
  },
  {
    id: 6,
    slug: ROUTING_INFO_RECEIVE_TIME,
    icon: '',
    name: 'Thời gian nhận hàng'
  },
  {
    id: 7,
    slug: ROUTING_INFO_RECEIVE_AND_REDEEM,
    icon: '',
    name: 'Nhận hàng và Đổi trả'
  }
  // { id: 8, slug: ROUTING_INFO_GUARANTEE, icon: '', name: 'Chế độ Bảo hành' }
];

export const questionMenuList = [
  // {
  //   id: 1,
  //   slug: ROUTING_INFO_QUESTION_ABOUT_US,
  //   icon: '',
  //   name: 'Về LixiCoin'
  // },
  {
    id: 2,
    slug: ROUTING_INFO_QUESTION_RECEIVE_GIFT,
    icon: '',
    name: 'Đập hộp và Nhận quà'
  },
  {
    id: 3,
    slug: ROUTING_INFO_QUESTION_INVITE_FRIENDS_GET_REWARDS,
    icon: '',
    name: 'Mời bạn bè và Nhận thưởng'
  }
  // {
  //   id: 4,
  //   slug: ROUTING_INFO_QUESTION_GIFT_CARD_2019,
  //   icon: '',
  //   name: 'Gift Card chào xuân 2019'
  // }
];
